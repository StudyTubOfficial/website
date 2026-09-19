# Rate Limiting: Token Bucket, Sliding Window and Why It Matters

**URL:** https://studytub.netlify.app/blog/api-rate-limiting.html
**Published:** 2026-08-05
**Tags:** Web, System Design

Algorithms compared, where to enforce the limit, and the headers that let a well-behaved client back off instead of hammering you.

## Why limit at all

Three reasons: preventing abuse, protecting against accidental loops in client code, and ensuring one heavy user does not degrade service for everyone else.

The second is more common than the first. Most rate limits are hit by bugs, not attacks.

## Fixed window — simple and flawed

Count requests per clock minute; reset at the boundary.

The flaw is the boundary itself. With a 100/minute limit, a client can send 100 at 10:00:59 and 100 more at 10:01:00 — 200 requests in one second, entirely within the rules.

## Sliding window

Count requests in the trailing 60 seconds rather than the current clock minute. No boundary to exploit.

More accurate, more expensive: it needs per-request timestamps rather than a counter.

## Token bucket

The most widely used. A bucket holds tokens, refilled at a fixed rate. Each request consumes one; an empty bucket means rejection.

<pre><code>const elapsed = (now - lastRefill) / 1000;
tokens = Math.min(capacity, tokens + elapsed * refillRate);

if (tokens >= 1) { tokens -= 1; allow(); }
else { reject(); }</code></pre>

Its useful property is **burst tolerance**: a client idle for a minute accumulates tokens and can send a short burst, while sustained rate stays bounded. That matches how real clients behave — bursty, not uniform.

## Choosing a key

- **Per IP** — simple, but shared NATs punish innocent users.
- **Per API key or user** — fairer, and the right choice for authenticated APIs.
- **Per endpoint** — an expensive report endpoint deserves a tighter limit than a health check.

Often combined: a generous per-user limit plus a tight per-endpoint one.

## Tell the client

<pre><code>HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1735689600</code></pre>

Without \`Retry-After\`, a client has no idea when to try again, so it retries immediately and makes the problem worse. These headers are what let well-written clients behave.

## Where to enforce it

At the edge — reverse proxy, API gateway or CDN — so rejected requests never reach your application. Enforcing in application code means you have already paid for connection handling and middleware before saying no.
