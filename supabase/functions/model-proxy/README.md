# model-proxy — RIDGE server-side model proxy

Phase 1 of the RIDGE backend (the "security fix"). This Supabase Edge Function
holds the **Anthropic** and **Voyage** API keys server-side and proxies the
browser's model/embedding calls, so provider keys are never shipped to clients.

- `POST /model-proxy/messages` → Anthropic `POST /v1/messages` (streams through)
- `POST /model-proxy/embeddings` → Voyage `POST /v1/embeddings` (JSON)

The RIDGE client (`index.html`) reaches these via a `fetch` shim
(`installModelProxyShim`) that redirects `api.anthropic.com` / `api.voyageai.com`
to this function and strips any client-side key. No per-call-site changes were
needed.

## ⚠️ Rotate the leaked keys first

Any Anthropic/Voyage keys that were previously stored in the `session_state`
table (`api_config` / `voyage_config`) or shipped in the client are **compromised
and must be rotated**. After deploying, also delete those rows:

```sql
delete from session_state where id in ('api_config', 'voyage_config');
```

## Deploy

Requires the Supabase CLI and a **live** Supabase project (the one referenced in
`config.js` / `index.html` is dead and must be replaced).

```bash
# 1. Link the CLI to your project
supabase link --project-ref <your-project-ref>

# 2. Set the provider keys as function secrets (NEVER commit these)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set VOYAGE_API_KEY=pa-...
# optional:
supabase secrets set ALLOWED_ORIGIN=https://ra01279.github.io
supabase secrets set EXTRA_MODELS=claude-sonnet-5,claude-opus-4-8

# 3. Deploy (JWT verification ON by default — callers must send a valid
#    Supabase JWT: the anon key today, or a signed-in user token once Auth lands)
supabase functions deploy model-proxy
```

## Point the client at your project

In `index.html`, update the two constants near the top of the model-proxy block
to your live project (and keep them in sync with `_sbInit` / `config.js`):

```js
var _MODEL_PROXY_URL  = 'https://<your-project-ref>.supabase.co/functions/v1/model-proxy';
var _MODEL_PROXY_ANON = '<your project anon key>';
```

## Model allowlist

`/messages` only forwards models in the allowlist (`BASE_MODELS` in `index.ts`
plus anything in the `EXTRA_MODELS` secret). Unlisted models get `400
model_not_allowed`. Keep this in sync with the model ids the client sends.

## Follow-ups (later phases)

- **Auth:** wire Supabase Auth so each user has a real token; set
  `_sbAccessToken` from the session and drop the anon-key fallback, making the
  proxy per-user gated (and enabling per-user rate limits / RLS).
- **Rate limiting / usage logging:** record calls per user in a table.
- **Deprecate the API-key modal** in the client once Auth is the sole gate.
