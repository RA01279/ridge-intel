# RIDGE Backend Setup — plain-English, no coding

This is the one-time setup that turns on RIDGE's real backend: your model API
keys move to a private server, you sign in to use the app, and your data can
sync. It's mostly clicking in the Supabase website. Budget ~20 minutes.

You only need to do **Parts 1–5**. Everything in the code is already done.
When you finish, send Claude the two values from Part 1 and it wires up the rest.

---

## What you'll end up with
- A free Supabase project (your database + a place to run the secure key proxy)
- One login account (just you)
- The `model-proxy` function running, holding your Anthropic/Voyage keys
- The RIDGE site pointed at your project

---

## Part 1 — Create the Supabase project (~5 min)

1. Go to **https://supabase.com** → **Start your project** → sign in with GitHub or email.
2. Click **New project**. Give it a name (e.g. `ridge`), set a database password
   (save it somewhere), pick a region near Texas (e.g. *East US*). Click **Create**.
3. Wait ~2 minutes for it to finish setting up.
4. Go to **Settings** (gear icon) → **API**. Copy these two values and paste them
   somewhere for now:
   - **Project URL** — looks like `https://abcdxyz.supabase.co`
   - **`anon` `public` key** — a long string starting with `eyJ…`

> These two are safe to share and safe to put in the website — that's what
> they're designed for.

---

## Part 2 — Create your login account (~2 min)

1. In the left sidebar: **Authentication** → **Users** → **Add user** →
   **Create new user**.
2. Enter your email + a password. Check **Auto Confirm User** so you can log in
   immediately. Click **Create user**.
3. (Recommended) **Authentication → Providers → Email** → turn **OFF**
   "Allow new users to sign up." This keeps RIDGE to just your account.

---

## Part 3 — Add the model-proxy function (~5 min)

1. Left sidebar: **Edge Functions** → **Deploy a new function** →
   **Via Editor** (create it in the browser).
2. Name it exactly **`model-proxy`**.
3. Delete the sample code, then open this repo's file
   **`supabase/functions/model-proxy/index.ts`**, copy ALL of it, and paste it in.
4. Click **Deploy**.

---

## Part 4 — Set the secret keys (~3 min)

These are your PRIVATE keys — they live only on the server, never in the website.

1. Get fresh keys (and revoke any old ones that were ever in the app):
   - **Anthropic:** https://console.anthropic.com → **API keys** → create a key (`sk-ant-…`)
   - **Voyage** (optional, only for semantic search): https://dashboard.voyageai.com → new key (`pa-…`)
2. In Supabase: **Edge Functions** → **Secrets** (or **Settings → Edge Functions → Secrets**).
   Add:
   - `ANTHROPIC_API_KEY` = your `sk-ant-…`
   - `VOYAGE_API_KEY` = your `pa-…` (optional)
   - `ALLOWED_ORIGIN` = `https://ra01279.github.io`
   - *(optional, temporary)* `ALLOW_ANON` = `true` — lets you smoke-test the
     proxy before login is wired. **Delete this secret once sign-in works.**

---

## Part 5 — Hand it off to Claude

Send Claude:
1. Your **Project URL** and **anon key** (from Part 1)
2. "Function deployed" and "login account created" (Parts 2–3)

Claude will then:
- Point the RIDGE site at your project (one edit — the `RIDGE_SB` block)
- Export and commit your real database schema as the source of truth
- Merge everything to `main` so the live site uses the secure backend

*(If you'd rather do the site edit yourself: open `index.html`, find the
`RIDGE_SB = {` block near the top of the script, and replace `url` and `anon`
with your two values. That's the only edit.)*

---

## Part 6 — Test (your eyes — Claude can't reach your project)

1. Open the RIDGE site, click **Sign In** (top right), enter your email/password.
2. Run any skill. It should work.
3. Open your browser's **Network** tab (F12) and confirm requests go to
   `…/functions/v1/model-proxy/…` and **not** to `api.anthropic.com`.
   That proves your key is off the browser. ✅

If a skill says "Sign in to run RIDGE skills," click **Sign In** first.

---

## Safety notes
- Any Anthropic/Voyage key that was ever in the app before today is
  **compromised — revoke it** and use the fresh keys from Part 4.
- The `anon` key is *meant* to be public; your real model keys are the secrets
  in Part 4 and never leave the server.
