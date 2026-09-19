# Choosing a Database: SQL, NoSQL and When It Matters

**URL:** https://studytub.netlify.app/blog/choosing-a-database.html
**Published:** 2026-08-03
**Tags:** Databases, System Design

Relational, document, key-value and columnar stores — what each is genuinely good at, and why 'it does not scale' is usually the wrong reason to reject SQL.

## Start with relational

PostgreSQL or MySQL should be the default, and the burden of proof is on moving away.

Relational databases give you ACID transactions, joins, constraints that enforce correctness in the database rather than hoping every code path remembers, and SQL — which everyone already knows.

"SQL does not scale" is the usual objection and it is mostly wrong. PostgreSQL handles hundreds of gigabytes and tens of thousands of transactions per second on ordinary hardware. Very few student or startup projects reach that.

## Document stores

MongoDB and similar store JSON documents with no fixed schema.

Genuinely good for deeply nested data read as a whole — a product catalogue where every item has different attributes, a CMS with varied content types.

The trade is that schema flexibility becomes schema chaos. Without enforcement, six versions of the same document shape accumulate and every consumer must handle all six. "Schemaless" means the schema moved into your application code, not that it stopped existing.

## Key-value stores

Redis, Memcached. One operation: get by key. Extremely fast, usually in memory.

For caching, sessions, rate limiting and queues it is the right tool. It is not a primary database — most configurations trade durability for speed, and that is the correct trade for a cache and the wrong one for your orders table.

## Columnar stores

ClickHouse, DuckDB, BigQuery. Store columns together rather than rows.

Purpose-built for analytics: aggregating one column across millions of rows reads only that column, and compresses it heavily. Ten to a hundred times faster than a row store for that shape of query, and correspondingly worse at fetching single records or frequent updates.

## The common production answer: two databases

Most real systems use more than one, chosen by access pattern:

- **PostgreSQL** for transactional writes — orders, users, correctness.
- **A columnar store** for analytics reads, synced in the background.
- **Redis** for caching and sessions.

That is not indecision. Transactional and analytical workloads want opposite storage layouts, and no single engine is excellent at both.

## Questions that actually decide it

1. Do you need transactions across multiple records? → relational.
2. Is the workload aggregating columns or fetching rows? → columnar or relational.
3. Is the data genuinely schemaless, or just not designed yet? → be honest.
4. How much data in two years? → usually less than you think.

Choosing for imagined scale is the most common and most expensive mistake.
