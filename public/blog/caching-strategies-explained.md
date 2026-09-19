# Caching Strategies Every Developer Should Know

**URL:** https://studytub.netlify.app/blog/caching-strategies-explained.html
**Published:** 2026-08-27
**Tags:** Software Engineering, Performance

Cache-aside, write-through, TTLs and invalidation — plus the thundering herd problem and the fifteen lines that fix it.

## Why cache at all

A database query taking 200 ms is fine once. Called on every page load by a thousand users, it is the bottleneck. Caching stores the result so the expensive work happens rarely.

## Cache-aside — the common one

The application manages the cache:

<pre><code>let data = cache.get(key);
if (!data) {
  data = await db.query(...);
  cache.set(key, data, ttl);
}
return data;</code></pre>

Simple, and the default choice. On a miss the caller pays full cost.

## Write-through and write-behind

**Write-through** — every write updates the cache and the database together. The cache is never stale; writes are slower.

**Write-behind** — write to cache, flush to the database asynchronously. Fast writes, but a crash before the flush loses data.

Most systems use cache-aside because the failure modes are easiest to reason about.

## TTL: the honest answer to invalidation

Phil Karlton's line — "there are only two hard things in computer science: cache invalidation and naming things" — is about this.

A TTL sidesteps it. Rather than tracking when data changes, accept a bounded staleness: 60 seconds for a dashboard, 10 for a live counter, an hour for something historical that cannot change.

Choose the TTL from how stale the answer may be before someone is misled, not from how fast you want the cache to be.

## The thundering herd

A subtle failure. A key expires. Twenty concurrent requests all miss at the same instant, and all twenty run the same expensive query.

The cache did not fail — it has no concept of *in flight*. The fix is to track promises, not just values:

<pre><code>if (inFlight.has(key)) return inFlight.get(key);

const promise = fetchFn()
  .then(data => { cache.set(key, data, ttl); inFlight.delete(key); return data; })
  .catch(err => { inFlight.delete(key); throw err; });

inFlight.set(key, promise);
return promise;</code></pre>

One request does the work; the rest await the same promise. Deleting the key on failure is essential — otherwise a single error is cached as a rejected promise forever.

## What not to cache

Anything user-specific in a shared cache, unless the key includes the user. Getting that wrong shows one user another user's data, which is the worst kind of caching bug because it looks like it works.
