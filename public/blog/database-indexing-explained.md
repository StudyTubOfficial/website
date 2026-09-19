# How Database Indexes Actually Work

**URL:** https://studytub.netlify.app/blog/database-indexing-explained.html
**Published:** 2026-09-04
**Tags:** Databases, DBMS

B-trees, why an index makes reads fast and writes slow, composite index column order, and when the query planner ignores your index entirely.

## The problem

<pre><code>SELECT * FROM students WHERE roll_no = 'CS21B045';</code></pre>

Without an index the database reads every row — a **full table scan**. On a million rows that is a million comparisons for one result.

## A B-tree, briefly

Most indexes are B-trees: a balanced tree where each node holds many sorted keys and pointers to child nodes.

Lookup walks from the root, comparing at each level. A tree of depth 3 with 100 keys per node addresses a million rows — so a lookup is about 3 reads instead of a million.

That is why index performance is described as O(log n): depth grows logarithmically with data.

## The cost nobody mentions in lectures

Every index must be updated on every \`INSERT\`, \`UPDATE\` and \`DELETE\`. Five indexes means five extra tree updates per write.

This is the real trade: **indexes make reads fast and writes slow**. A table with many indexes and heavy writes can be slower overall than one with none.

## Composite indexes and the leftmost rule

<pre><code>CREATE INDEX idx ON events (site_id, timestamp);</code></pre>

This index serves:
- \`WHERE site_id = ?\`
- \`WHERE site_id = ? AND timestamp > ?\`

But **not** \`WHERE timestamp > ?\` alone. A composite index is sorted by the first column, then the second — like a phone book sorted by surname then first name. You cannot use it to find everyone named "Priya" without a surname.

Column order is therefore a decision, not a formality. Put the column used in equality filters first.

## When the planner ignores your index

An index exists and is still not used, because:

- **The query returns most of the table.** A scan beats an index when you are reading 80% of rows anyway.
- **A function wraps the column.** \`WHERE YEAR(created_at) = 2026\` cannot use an index on \`created_at\`. Rewrite as a range: \`created_at >= '2026-01-01' AND created_at < '2027-01-01'\`.
- **Type mismatch.** Comparing a varchar column to a number forces a cast, and the index is skipped.

## Read the plan

<pre><code>EXPLAIN SELECT * FROM students WHERE roll_no = 'CS21B045';</code></pre>

\`EXPLAIN\` shows what the planner actually decided. "Seq Scan" where you expected "Index Scan" is the signal that something above applies. Guessing at index behaviour is how people add five indexes that help nothing.
