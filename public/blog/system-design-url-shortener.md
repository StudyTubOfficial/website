# System Design: Build a URL Shortener

**URL:** https://studytub.netlify.app/blog/system-design-url-shortener.html
**Published:** 2026-08-15
**Tags:** System Design, Software Engineering

The standard interview question, worked through — ID generation, storage, redirects and the scale estimates interviewers expect.

## Requirements first

Always start here. Interviewers score this step.

**Functional** — shorten a long URL; redirect a short URL to the original; optionally expire links and count clicks.

**Non-functional** — high availability, low-latency redirects, read-heavy.

## Estimate the scale

100 million new URLs per month:

    Writes: 100M / 30 / 86400 ≈ 40 per second
    Reads at 100:1  ≈ 4,000 per second
    Storage: 100M × 500 bytes ≈ 50 GB/month

That read:write ratio is the important output. It tells you the system is a read problem, and that caching will dominate the design.

## Generating the short code

**Counter plus base62.** An auto-incrementing ID encoded in [0-9a-zA-Z] gives 62^7 ≈ 3.5 trillion codes at 7 characters. Short and collision-free, but sequential codes are guessable and enumerable.

**Random plus collision check.** Generate 7 random characters, check for a collision, retry. Not enumerable; costs a read per write.

**Hash and truncate.** MD5 the URL, take the first 7 characters. Deterministic, so the same URL always maps to the same code — but collisions must still be handled.

A common answer: counter-based with the value shuffled, so codes are unique without being sequential.

## Schema

<pre><code>CREATE TABLE urls (
  short_code  VARCHAR(7) PRIMARY KEY,
  long_url    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now(),
  expires_at  TIMESTAMPTZ,
  click_count BIGINT DEFAULT 0
);</code></pre>

\`short_code\` is the primary key because every read looks up by it.

## The redirect path

1. Look up the code in cache.
2. On a miss, read the database and populate the cache.
3. Return **301** (permanent) or **302** (temporary).

301 lets the browser cache the redirect — fastest, but you stop seeing repeat clicks. 302 keeps analytics accurate at the cost of a request every time. Say which you chose and why; that is the judgement being tested.

## Where it scales

Cache is the whole answer for reads. A small percentage of links take most traffic, so an LRU cache with a high hit rate absorbs nearly all of the 4,000/s.

Writes at 40/s need no sharding. Say so — over-engineering is a mark against you. If asked to scale further, shard by the short code's hash.

## Counting clicks

Do not increment a row on every redirect; that makes a write path out of a read path. Push click events to a queue and aggregate asynchronously. Slightly stale counts, no contention.
