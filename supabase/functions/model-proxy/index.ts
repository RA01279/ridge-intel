// RIDGE model-proxy — Supabase Edge Function (Deno)
// -----------------------------------------------------------------------------
// Server-side proxy for the Anthropic Messages API and Voyage embeddings.
// The provider API keys live ONLY here (as Supabase function secrets) and are
// never shipped to the browser. The RIDGE client calls this function instead of
// api.anthropic.com / api.voyageai.com.
//
// Routes (path suffix):
//   POST /model-proxy/messages    -> Anthropic  POST /v1/messages   (streams through)
//   POST /model-proxy/embeddings  -> Voyage     POST /v1/embeddings (JSON)
//
// Auth: this function is intended to be deployed with JWT verification ON
// (the default). Supabase validates the caller's Authorization: Bearer <jwt>
// (anon key or a signed-in user token) at the platform edge before this code
// runs. We additionally require the header to be present.
//
// Secrets (set with `supabase secrets set`):
//   ANTHROPIC_API_KEY   required for /messages
//   VOYAGE_API_KEY      required for /embeddings
//   ALLOWED_ORIGIN      optional; CORS allow-origin (default "*")
//   EXTRA_MODELS        optional; comma-separated model ids to add to allowlist
// -----------------------------------------------------------------------------

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const VOYAGE_URL = "https://api.voyageai.com/v1/embeddings";
const ANTHROPIC_VERSION = "2023-06-01";

// Models the app is allowed to call. Extend via EXTRA_MODELS secret.
const BASE_MODELS = [
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001",
  "claude-opus-4-8",
  "claude-sonnet-5",
  "claude-fable-5",
];

function allowedModels(): Set<string> {
  const extra = (Deno.env.get("EXTRA_MODELS") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set([...BASE_MODELS, ...extra]);
}

// Read the `role` claim from a Supabase JWT without re-verifying it (the
// platform's verify_jwt has already checked the signature). Anon keys carry
// role "anon"; a signed-in user carries role "authenticated".
function jwtRole(authHeader: string): string {
  try {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const payload = token.split(".")[1];
    if (!payload) return "";
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return (JSON.parse(decoded).role as string) || "";
  } catch {
    return "";
  }
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  const cors = corsHeaders();

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  // Require an Authorization header. (Platform JWT verification does the real
  // signature validation; this is a defensive check for local runs.)
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader) return json(401, { error: "missing_authorization" });

  // Require a signed-in user — reject the public anon key so the proxy is not
  // an open relay anyone can use to spend your model credits. Set ALLOW_ANON=true
  // temporarily to smoke-test before the login UI is wired up.
  if (Deno.env.get("ALLOW_ANON") !== "true" && jwtRole(authHeader) !== "authenticated") {
    return json(401, { error: "auth_required", detail: "sign in to use the RIDGE proxy" });
  }

  const url = new URL(req.url);
  const route = url.pathname.split("/").pop() || "";

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "invalid_json_body" });
  }

  // ── Anthropic Messages ────────────────────────────────────────────────────
  if (route === "messages") {
    const key = Deno.env.get("ANTHROPIC_API_KEY");
    if (!key) return json(500, { error: "server_missing_anthropic_key" });

    const model = String(payload.model || "");
    if (!allowedModels().has(model)) {
      return json(400, { error: "model_not_allowed", model });
    }

    const upstream = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify(payload),
    });

    // Stream the response body straight back (works for stream:true and normal
    // JSON responses alike — the client's SSE reader keeps functioning).
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...cors,
        "Content-Type": upstream.headers.get("Content-Type") || "application/json",
      },
    });
  }

  // ── Voyage embeddings ─────────────────────────────────────────────────────
  if (route === "embeddings") {
    const key = Deno.env.get("VOYAGE_API_KEY");
    if (!key) return json(500, { error: "server_missing_voyage_key" });

    const upstream = await fetch(VOYAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key,
      },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return json(404, { error: "unknown_route", route });
});
