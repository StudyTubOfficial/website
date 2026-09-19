# JWT vs Sessions: Which Should You Use?

**URL:** https://studytub.netlify.app/blog/authentication-jwt-vs-sessions.html
**Published:** 2026-08-11
**Tags:** Web, Security

How each works, where the token actually lives, and the revocation problem that makes JWT the wrong default for most applications.

## The problem both solve

HTTP is stateless. The server has no memory of the previous request, so every request must carry proof of who you are.

## Session-based

1. User logs in; server creates a session and stores it.
2. Server sends a session ID in a cookie.
3. Each request sends the cookie; the server looks the session up.

State lives on the server. The cookie is just a key.

## Token-based (JWT)

1. User logs in; server signs a token containing the claims.
2. Client stores and sends it, usually as \`Authorization: Bearer ...\`.
3. Server verifies the signature — no lookup needed.

State lives in the token. Three base64 parts: header, payload, signature.

## The critical misunderstanding

**A JWT payload is encoded, not encrypted.** Anyone can read it:

<pre><code>atob(token.split('.')[1])
// {"userId": 42, "role": "admin"}</code></pre>

The signature prevents *modification*, not *reading*. Never put anything secret in a JWT.

## Revocation — the real difference

Sessions: delete the row. The user is logged out instantly.

JWT: you cannot. A signed token is valid until it expires, by design. If a token leaks or a user is banned, that token keeps working.

Workarounds all reintroduce the state JWT was meant to avoid — a blocklist to check on every request is a session lookup wearing a different hat.

## Which to use

**Sessions** for most web applications. Revocation matters, and a lookup against Redis or Postgres is not the bottleneck people imagine.

**JWT** where statelessness genuinely pays: short-lived service-to-service tokens, or an API where the verifying service cannot reach a session store.

The common hybrid: a short-lived access token (15 minutes) plus a long-lived refresh token that *is* stored server-side and can be revoked. You get stateless verification with real revocation.

## Storage on the client

`localStorage` is readable by any JavaScript on the page, so an XSS vulnerability exfiltrates the token.

An `httpOnly` cookie cannot be read by JavaScript, which removes that path — at the cost of needing CSRF protection.

Neither is free. Choose based on which attack you are more exposed to.
