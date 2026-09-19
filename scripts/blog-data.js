/**
 * StudyTub blog posts.
 *
 * Audience: engineering students, mostly BTECH, who arrive from a search about
 * a subject and may stay for something adjacent. So the topics are real
 * computer-science and software-engineering material that overlaps with their
 * syllabus — databases, SQL, web performance, privacy, system design — written
 * at the level of someone who has taken the course but not built the thing.
 *
 * Generated into static HTML by scripts/build-notes.js for the same reason the
 * notes pages are: the React app renders client-side and Googlebot sees an
 * empty body, so anything meant to be found has to exist without JavaScript.
 */
module.exports = [
{
  slug: "what-is-a-columnar-database",
  title: "What Is a Columnar Database? (And Why Analytics Uses One)",
  desc: "Row stores and column stores explained with the same query — why a database that stores columns together reads a hundredth of the data for an analytics question. Useful for DBMS courses and interviews.",
  date: "2026-09-10", mins: 7, tags: ["Databases", "DBMS"],
  body: `
## The question DBMS courses skip

Your DBMS course teaches tables, indexes, joins and normalisation. It rarely explains why the same table can be stored two completely different ways, and why that choice decides whether a query takes 2 milliseconds or 2 seconds.

## A row store

MySQL and PostgreSQL store rows together on disk. One record's fields sit side by side:

    [1, /home, 2026-01-01, Chrome] [2, /pricing, 2026-01-01, Firefox] ...

That is ideal for "fetch the order with id 4821" — one read gets the whole record.

## A column store

A columnar database stores each column together instead:

    ids:      [1, 2, 3, 4, ...]
    paths:    [/home, /pricing, /home, ...]
    dates:    [2026-01-01, 2026-01-01, ...]
    browsers: [Chrome, Firefox, Chrome, ...]

Now consider a typical analytics query:

<pre><code>SELECT path, COUNT(*) FROM events GROUP BY path;</code></pre>

A row store reads every field of every row — including dates and browsers it does not need — because they are physically interleaved. A column store reads one column and skips the rest entirely.

On a table with twenty columns, that is roughly 5% of the I/O.

## Compression, which is the bigger win

Values in a column are the same type and often repeat. That compresses far better than mixed row data.

A browser column with five distinct values across a million rows stores as a dictionary plus small integers — often 50× smaller. Less data on disk means less data read, which compounds the first advantage.

## The trade-off

Column stores are bad at what row stores are good at. Updating one record means touching every column's storage. Fetching a single full row means reading from twenty separate places.

That is why the two are not competitors:

| | Row store | Column store |
|---|---|---|
| Fetch one record | Fast | Slow |
| Aggregate one column | Slow | Fast |
| Frequent updates | Fast | Slow |
| Compression | Poor | Excellent |

## Why this matters beyond an exam

Real systems use both. Transactions go to a row store — PostgreSQL, MySQL — where writes are cheap and correctness is guaranteed. Analytics reads go to a column store, kept in sync in the background.

If you are asked in an interview why a company runs two databases, this is the answer: the access patterns are opposite, and no single storage layout is good at both.
`
},
{
  slug: "sql-window-functions-explained",
  title: "SQL Window Functions Explained Simply",
  desc: "ROW_NUMBER, RANK, LAG and running totals, with examples you can follow. The part of SQL that separates a passing grade from an actually useful skill.",
  date: "2026-09-08", mins: 8, tags: ["SQL", "DBMS"],
  body: `
## GROUP BY throws away the rows

Every SQL course teaches \`GROUP BY\`. It has one limitation students hit immediately: it collapses rows.

<pre><code>SELECT student, AVG(marks) FROM results GROUP BY student;</code></pre>

You get one row per student. The individual subject marks are gone. If you want *both* the individual rows and an aggregate beside them, \`GROUP BY\` cannot help.

That is what window functions are for.

## The shape

<pre><code>SELECT student, subject, marks,
       AVG(marks) OVER (PARTITION BY student) AS student_avg
FROM results;</code></pre>

Every original row survives, and each carries its student's average alongside. \`OVER\` is what makes it a window function; \`PARTITION BY\` is the grouping without the collapsing.

## Ranking

Three functions that look similar and are not:

<pre><code>SELECT student, marks,
       ROW_NUMBER() OVER (ORDER BY marks DESC) AS row_num,
       RANK()       OVER (ORDER BY marks DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY marks DESC) AS dense
FROM results;</code></pre>

With marks 95, 90, 90, 85:

| marks | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|
| 95 | 1 | 1 | 1 |
| 90 | 2 | 2 | 2 |
| 90 | 3 | 2 | 2 |
| 85 | 4 | 4 | 3 |

\`ROW_NUMBER\` always increments. \`RANK\` ties then skips. \`DENSE_RANK\` ties without skipping. Exams love this distinction.

## LAG and LEAD

Compare a row to the one before it — the basis of every "change since last period" calculation:

<pre><code>SELECT month, revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_month,
       revenue - LAG(revenue) OVER (ORDER BY month) AS change
FROM monthly;</code></pre>

Before window functions this needed a self-join. Now it is one line.

## Running totals

<pre><code>SELECT date, amount,
       SUM(amount) OVER (ORDER BY date
                         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
       AS running_total
FROM transactions;</code></pre>

The \`ROWS BETWEEN\` clause defines the frame — which rows the function sees. Omitting it gives a default that is usually what you want but occasionally is not, so being explicit is worth the extra line.

## Where this is actually used

Sessionizing web analytics uses exactly this pattern: \`LAG\` to find the gap between consecutive events, then a running \`SUM\` over a flag to assign session numbers.

It is one of the few SQL topics where the exam question and the production use are genuinely the same thing.
`
},
{
  slug: "acid-properties-explained",
  title: "ACID Properties Explained with Real Examples",
  desc: "Atomicity, Consistency, Isolation, Durability \u2014 what each actually guarantees, what breaks without it, and the isolation levels that show up in every DBMS exam.",
  date: "2026-09-06", mins: 7, tags: ["Databases", "DBMS"],
  body: `
## Why ACID exists

A bank transfer moves money from one account to another. It is two operations, and if the system crashes between them the money vanishes. ACID is the set of guarantees that stops that.

## Atomicity — all or nothing

Either every part of a transaction happens, or none does.

<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;</code></pre>

A crash after the first statement rolls back the whole thing. There is no state where the money has left one account without arriving at the other.

## Consistency — rules are never violated

The database moves from one valid state to another. Constraints, foreign keys and checks hold before and after.

If a column says \\\`balance >= 0\\\`, no transaction can leave it negative — the transaction fails instead.

## Isolation — concurrent transactions do not corrupt each other

The subtlest one, and the most examined. Four standard levels, each preventing more:

| Level | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| Read Uncommitted | possible | possible | possible |
| Read Committed | prevented | possible | possible |
| Repeatable Read | prevented | prevented | possible |
| Serializable | prevented | prevented | prevented |

**Dirty read** — you see another transaction's uncommitted change, which may be rolled back.
**Non-repeatable read** — you read the same row twice and get different values.
**Phantom read** — you run the same query twice and get different *rows*.

Higher isolation costs concurrency. Most systems default to Read Committed because Serializable is too slow for general use.

## Durability — committed means committed

Once \\\`COMMIT\\\` returns, the data survives a power failure. Achieved through write-ahead logging: the change is written to a durable log before it is applied, so a crashed database can replay the log on restart.

## Where ACID is deliberately relaxed

Analytics databases often loosen these. Reading slightly stale data to answer "how many visitors yesterday" is fine; blocking a write for it is not.

That is why an analytics system commonly writes to an ACID store like PostgreSQL and reads from a separate store that trades some guarantees for speed. Knowing *which* guarantee is being traded, and why it does not matter for that query, is the actual engineering judgement.
`
},
{
  slug: "database-indexing-explained",
  title: "How Database Indexes Actually Work",
  desc: "B-trees, why an index makes reads fast and writes slow, composite index column order, and when the query planner ignores your index entirely.",
  date: "2026-09-04", mins: 8, tags: ["Databases", "DBMS"],
  body: `
## The problem

<pre><code>SELECT * FROM students WHERE roll_no = 'CS21B045';</code></pre>

Without an index the database reads every row — a **full table scan**. On a million rows that is a million comparisons for one result.

## A B-tree, briefly

Most indexes are B-trees: a balanced tree where each node holds many sorted keys and pointers to child nodes.

Lookup walks from the root, comparing at each level. A tree of depth 3 with 100 keys per node addresses a million rows — so a lookup is about 3 reads instead of a million.

That is why index performance is described as O(log n): depth grows logarithmically with data.

## The cost nobody mentions in lectures

Every index must be updated on every \\\`INSERT\\\`, \\\`UPDATE\\\` and \\\`DELETE\\\`. Five indexes means five extra tree updates per write.

This is the real trade: **indexes make reads fast and writes slow**. A table with many indexes and heavy writes can be slower overall than one with none.

## Composite indexes and the leftmost rule

<pre><code>CREATE INDEX idx ON events (site_id, timestamp);</code></pre>

This index serves:
- \\\`WHERE site_id = ?\\\`
- \\\`WHERE site_id = ? AND timestamp > ?\\\`

But **not** \\\`WHERE timestamp > ?\\\` alone. A composite index is sorted by the first column, then the second — like a phone book sorted by surname then first name. You cannot use it to find everyone named "Priya" without a surname.

Column order is therefore a decision, not a formality. Put the column used in equality filters first.

## When the planner ignores your index

An index exists and is still not used, because:

- **The query returns most of the table.** A scan beats an index when you are reading 80% of rows anyway.
- **A function wraps the column.** \\\`WHERE YEAR(created_at) = 2026\\\` cannot use an index on \\\`created_at\\\`. Rewrite as a range: \\\`created_at >= '2026-01-01' AND created_at < '2027-01-01'\\\`.
- **Type mismatch.** Comparing a varchar column to a number forces a cast, and the index is skipped.

## Read the plan

<pre><code>EXPLAIN SELECT * FROM students WHERE roll_no = 'CS21B045';</code></pre>

\\\`EXPLAIN\\\` shows what the planner actually decided. "Seq Scan" where you expected "Index Scan" is the signal that something above applies. Guessing at index behaviour is how people add five indexes that help nothing.
`
},
{
  slug: "normalization-1nf-2nf-3nf",
  title: "Database Normalization: 1NF, 2NF and 3NF Made Clear",
  desc: "Each normal form as a problem it solves, with one table normalised step by step \u2014 plus when experienced engineers denormalise on purpose.",
  date: "2026-09-02", mins: 8, tags: ["Databases", "DBMS"],
  body: `
## Start with a bad table

| roll_no | name | branch | branch_hod | subject | marks |
|---|---|---|---|---|---|
| CS001 | Ravi | CSE | Dr. Sharma | Maths | 85 |
| CS001 | Ravi | CSE | Dr. Sharma | Physics | 78 |
| EC002 | Priya | ECE | Dr. Gupta | Maths | 92 |

Three problems live here:

- **Update anomaly** — the CSE HOD changes and you must update every CSE row.
- **Insertion anomaly** — you cannot add a new branch until a student enrols in it.
- **Deletion anomaly** — deleting the last ECE student erases the fact that ECE exists.

Normalization removes these in steps.

## 1NF — atomic values, no repeating groups

Every cell holds a single value. A \\\`subjects\\\` column containing "Maths, Physics" violates 1NF.

The table above is already 1NF: each row has one subject.

## 2NF — no partial dependency

*Requires 1NF.* No non-key column may depend on only part of a composite key.

The key here is (roll_no, subject). But \\\`name\\\` and \\\`branch\\\` depend on \\\`roll_no\\\` alone — a partial dependency. Split:

**students** (roll_no, name, branch, branch_hod)
**results** (roll_no, subject, marks)

## 3NF — no transitive dependency

*Requires 2NF.* No non-key column may depend on another non-key column.

In \\\`students\\\`, \\\`branch_hod\\\` depends on \\\`branch\\\`, which depends on \\\`roll_no\\\`. That is transitive. Split again:

**students** (roll_no, name, branch)
**branches** (branch, branch_hod)
**results** (roll_no, subject, marks)

All three anomalies are now gone. The HOD is stored once; a branch can exist without students; deleting a student does not delete a branch.

## The part exams leave out

Normalization costs joins. Fully normalised data needs three joins to answer "show me every student with their HOD and marks", and joins are expensive at scale.

Production systems **denormalise deliberately** — duplicating data to avoid joins on hot paths. Analytics databases go furthest, often using a star schema that is barely 2NF, because a read-mostly workload does not suffer update anomalies.

Normalize by default. Denormalize when you measure a problem, and know which anomaly you are accepting when you do.
`
},
{
  slug: "http-request-lifecycle",
  title: "What Happens When You Type a URL and Press Enter",
  desc: "DNS, TCP, TLS, HTTP, rendering \u2014 the whole chain, at the depth a networks course expects and an interview asks for.",
  date: "2026-08-31", mins: 9, tags: ["Networks", "Web"],
  body: `
## The classic interview question

It is asked because a complete answer touches DNS, transport, cryptography, HTTP and browser internals. Here is the chain.

## 1. URL parsing

The browser splits \\\`https://studytub.netlify.app/notes/\\\` into scheme, host and path, and checks HSTS — a list of domains that must be HTTPS. If listed, an http:// link is upgraded before any request leaves.

## 2. DNS resolution

The hostname becomes an IP address, through a cache hierarchy:

1. Browser cache
2. OS cache
3. Router / ISP resolver
4. Root → TLD (.app) → authoritative nameserver

Each level caches for the record's TTL, which is why a DNS change takes time to propagate.

## 3. TCP handshake

Three packets before any data moves:

    Client → SYN
    Server → SYN-ACK
    Client → ACK

One full round trip. On a 100 ms connection that is 100 ms spent before a single byte of your page.

## 4. TLS handshake

For HTTPS, another negotiation: cipher agreement, the server's certificate, and key exchange. TLS 1.3 needs one round trip, TLS 1.2 needed two.

The certificate is verified against a chain of trust ending at a root CA your OS already trusts. This is what makes the padlock meaningful.

## 5. The HTTP request

    GET /notes/ HTTP/1.1
    Host: studytub.netlify.app
    Accept: text/html

The server responds with a status line, headers and a body.

## 6. Rendering

The browser parses HTML into the DOM, and CSS into the CSSOM. The two combine into a render tree, which is laid out (positions and sizes) and then painted.

The critical detail: **a stylesheet in \\\`<head>\\\` blocks rendering**, because the browser cannot paint without knowing styles. A synchronous \\\`<script>\\\` blocks parsing too, which is why \\\`defer\\\` and \\\`async\\\` exist.

## Why this is worth knowing

Every one of these steps is somewhere a page gets slow. A slow first byte is DNS, TCP or server time. A slow first paint is usually a render-blocking resource. Knowing the chain is how you know which one to measure.
`
},
{
  slug: "rest-api-design-basics",
  title: "REST API Design: The Conventions That Matter",
  desc: "Resource naming, the right status codes, idempotency, and why a consistent response envelope saves every client from special-casing your endpoints.",
  date: "2026-08-29", mins: 7, tags: ["Web", "Software Engineering"],
  body: `
## Nouns, not verbs

The most common beginner mistake:

    POST /getStudent
    POST /createStudent
    POST /deleteStudent

REST models **resources**, with the HTTP method as the verb:

    GET    /students          list
    GET    /students/CS001    one
    POST   /students          create
    PUT    /students/CS001    replace
    PATCH  /students/CS001    partial update
    DELETE /students/CS001    remove

One path, five behaviours, no invented verbs.

## Status codes that mean something

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created (after POST) |
| 204 | Success, no body (after DELETE) |
| 400 | Malformed request |
| 401 | Not authenticated |
| 403 | Authenticated, not allowed |
| 404 | Not found |
| 409 | Conflict — duplicate, version mismatch |
| 500 | Server error |

The 401/403 distinction matters: 401 means "log in", 403 means "logging in will not help".

Returning 200 with \\\`{"error": "..."}\\\` defeats the point — every client then has to parse the body to know whether the call worked.

## Idempotency

An idempotent request can be repeated safely. \\\`GET\\\`, \\\`PUT\\\` and \\\`DELETE\\\` should be; \\\`POST\\\` is not.

This is not academic. Networks fail after the server processed the request but before the response arrived. The client retries. If \\\`POST /payments\\\` is not protected by an idempotency key, the customer is charged twice.

## One response envelope

<pre><code>{ "success": true,  "data": { } }
{ "success": false, "error": "Student not found" }</code></pre>

Consistency here is worth more than elegance. Every client writes one handler instead of branching per endpoint.

## Paginate from the start

An endpoint returning every row works until the table grows. Adding pagination later breaks every existing caller.

    GET /students?limit=50&cursor=eyJpZCI6MTAwfQ

Cursor pagination beats offset pagination on large tables: \\\`OFFSET 100000\\\` makes the database count through 100,000 rows to skip them.

## Never leak internals in errors

Return enough for a developer to fix a 4xx. Return a generic message for a 5xx and log the detail server-side. A stack trace in a response is an information disclosure.
`
},
{
  slug: "caching-strategies-explained",
  title: "Caching Strategies Every Developer Should Know",
  desc: "Cache-aside, write-through, TTLs and invalidation \u2014 plus the thundering herd problem and the fifteen lines that fix it.",
  date: "2026-08-27", mins: 7, tags: ["Software Engineering", "Performance"],
  body: `
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
`
},
{
  slug: "gdpr-for-developers",
  title: "GDPR for Developers: What Actually Changes in Your Code",
  desc: "Personal data, lawful basis, and the specific technical decisions \u2014 IP handling, retention, consent \u2014 that follow from the regulation.",
  date: "2026-08-25", mins: 8, tags: ["Privacy", "Web"],
  body: `
## Why a developer should care

GDPR is usually treated as a legal document. But most of what it requires is decided in code, by developers, often before anyone in legal sees the system.

## What counts as personal data

Broader than most people assume. Any information relating to an identifiable person, including:

- Name, email, phone
- **IP address** — the one that surprises people
- Cookie identifiers and device fingerprints
- Location data

An IP address is personal data because it can identify someone when combined with other information. That single fact drives most analytics design decisions.

## Lawful basis

You need one of six to process personal data. Two matter for most applications:

**Consent** — freely given, specific, informed, and as easy to withdraw as to give. A pre-ticked box is not consent. Neither is a banner with no reject button.

**Legitimate interest** — processing a reasonable person would expect, balanced against their rights. Some privacy-first analytics rely on this, though the analysis depends on jurisdiction.

## Data minimisation, in practice

Collect only what you need. For analytics this has a clean technical expression:

<pre><code>const geo = geoip.lookup(req.ip);
await insert({ country: geo.country, city: geo.city });
// the IP is never written</code></pre>

Resolve at ingest, store the result, discard the input. You get geographic reporting without ever persisting an identifier.

The strongest version is structural: **no IP column in the schema**. A field that does not exist cannot be filled in by a future change.

## Storage limitation

Do not keep data longer than necessary. Aggregate before deleting:

<pre><code>INSERT INTO daily_stats (date, visitors, pageviews)
SELECT date, COUNT(DISTINCT user_id), COUNT(*)
FROM events WHERE timestamp < ? GROUP BY date;
-- then delete the raw rows</code></pre>

The counts survive for years; the identifiers do not. That is exactly the shape the regulation wants.

## The rights you must implement

- **Access** — export everything you hold about a person
- **Erasure** — delete it on request
- **Portability** — provide it in a machine-readable format

The design consequence: if you cannot find all of one person's data, you cannot satisfy any of these. Scattering user identifiers across tables with no foreign keys makes compliance nearly impossible later.

## The pragmatic summary

Collect less, keep it for less time, and be able to find it. Systems designed that way are mostly compliant by construction, and are simpler as a side effect.
`
},
{
  slug: "core-web-vitals-explained",
  title: "Core Web Vitals Explained: LCP, CLS and INP",
  desc: "Three metrics Google uses as a ranking signal, what each measures in terms a user would recognise, and the usual causes of a bad score.",
  date: "2026-08-23", mins: 7, tags: ["Web", "Performance"],
  body: `
## Why these three

Google needed metrics that correlate with how a page *feels*, not how fast a file downloads. Core Web Vitals are the result: loading, stability and responsiveness.

They are a ranking factor, which is why they appear in SEO discussions as well as engineering ones.

## LCP — Largest Contentful Paint

**When the main content appears.** Measured to the render of the largest visible element — usually a hero image, a heading or a block of text.

Good is under 2.5 seconds.

LCP has two halves worth separating: time spent *loading* the resource, and time spent *waiting*. A diagnostic showing 0 ms of network time and 3 seconds of "render delay" means the element was ready and something prevented it painting — almost always JavaScript.

A common cause: an animation library that starts elements at \\\`opacity: 0\\\` and reveals them after it loads. The text was there the whole time, invisible, waiting on a bundle.

## CLS — Cumulative Layout Shift

**How much the page jumps around.** You start reading, an image loads above, and the text moves.

Good is under 0.1.

The dominant cause is images without dimensions:

<pre><code>&lt;img src="photo.jpg"&gt;                        <!-- browser cannot reserve space -->
&lt;img src="photo.jpg" width="800" height="600"&gt; <!-- space reserved before load -->
</code></pre>

Ads and late-injected banners are the other frequent culprit.

## INP — Interaction to Next Paint

**How quickly the page responds to a click or tap.** Replaced FID in 2024, and measures the whole interaction rather than only the first.

Good is under 200 ms.

Bad INP usually means long tasks blocking the main thread. JavaScript is single-threaded, so a 300 ms task means 300 ms where nothing can respond. Breaking work into smaller chunks, or moving it off the main thread, is the fix.

## Lab versus field

Lighthouse runs one simulated load on one machine — useful for debugging, not representative.

Field data comes from real visitors on real devices and networks. It is the data Google actually uses, and it is usually worse than your lab score, because your laptop is faster than your median visitor's phone.

Collecting it yourself, from your own analytics, is the only way to see what people actually experience.
`
},
{
  slug: "git-branching-for-students",
  title: "Git Branching That Will Not Ruin Your Project",
  desc: "Branches, merges, conflicts and the commands to recover when something goes wrong \u2014 written for team projects where one mistake blocks everyone.",
  date: "2026-08-21", mins: 7, tags: ["Software Engineering", "Git"],
  body: `
## Why branches

Four people editing \\\`main\\\` at once produces conflicts on every push. A branch is a private line of work that can be merged when it is ready.

<pre><code>git checkout -b feature/login
# work, commit
git push -u origin feature/login</code></pre>

## A workflow that survives a team project

- **main** — always works. Never commit here directly.
- **feature/*** — one branch per task, merged via pull request.

The rule that matters: *if main is broken, everyone is blocked.* Protecting it costs a little friction and saves an evening.

## Conflicts are not errors

A conflict means two people changed the same lines and Git will not guess:

<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
const PORT = 3000;
=======
const PORT = 8080;
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/config</code></pre>

Delete the markers, keep the correct result, \\\`git add\\\` and continue. There is no automatic resolution because the right answer requires knowing the intent.

## Merge or rebase

**Merge** keeps true history including the branch shape. **Rebase** replays your commits on top of the target, producing a straight line.

The rule: rebase your *own* unpushed work to tidy it; never rebase a branch others have pulled, because it rewrites commits they already have.

## Recovering

<pre><code># undo the last commit, keep the changes
git reset --soft HEAD~1

# discard local changes to one file
git checkout -- file.js

# find a commit you think you lost
git reflog</code></pre>

\\\`git reflog\\\` is the one worth remembering. It records where HEAD has been, including commits no branch points at any more — so an accidental reset is usually recoverable.

## .gitignore from the first commit

<pre><code>node_modules/
.env
dist/</code></pre>

Commit \\\`node_modules\\\` once and it stays in history forever; \\\`.gitignore\\\` only affects untracked files. Committing \\\`.env\\\` leaks credentials into a place that outlives deleting the file.

Both are common, and both are much harder to undo than to prevent.
`
},
{
  slug: "docker-for-beginners",
  title: "Docker for Students: Containers Without the Jargon",
  desc: "Images, containers, Dockerfiles and compose \u2014 what each is, why 'works on my machine' stops being a problem, and the commands you will actually use.",
  date: "2026-08-19", mins: 8, tags: ["Software Engineering", "DevOps"],
  body: `
## The problem it solves

Your project runs. A teammate clones it and nothing works — different Node version, missing Postgres, a library that needs a system package.

A container packages the application *and* its environment, so it runs identically anywhere.

## Image versus container

An **image** is a template: your code plus its dependencies plus the OS layer. A **container** is a running instance of an image.

The relationship is class and object. One image, many containers.

## A Dockerfile

<pre><code>FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]</code></pre>

The ordering matters more than it looks. Docker caches each layer. Copying \\\`package.json\\\` and installing *before* copying the source means a code change does not reinstall dependencies — the difference between a 3-second and a 3-minute rebuild.

\\\`alpine\\\` images are around 50 MB against 900 MB for the default. Smaller images pull faster and have less to patch.

## Compose for several services

A real application is rarely one container. Compose describes them together:

<pre><code>services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: \\\${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: ./api
    ports: ["3000:3000"]
    depends_on:
      db:
        condition: service_healthy

volumes:
  pgdata:</code></pre>

\\\`docker compose up\\\` starts everything. That is the "clone and run" experience.

## Volumes, or your data disappears

Containers are ephemeral. Delete one and its filesystem goes with it.

A named volume (\\\`pgdata\\\` above) lives outside the container lifecycle. Without it, \\\`docker compose down\\\` destroys your database — which is exactly what \\\`-v\\\` does deliberately, and why that flag deserves caution.

## Commands worth memorising

<pre><code>docker compose up --build   # build and start
docker compose logs -f api  # follow one service's logs
docker compose exec api sh  # shell inside a running container
docker compose down         # stop (add -v to delete volumes too)</code></pre>

## Never bake secrets into an image

Anyone who can pull the image can read every layer. Pass secrets as environment variables at runtime, and keep \\\`.env\\\` out of the image with \\\`.dockerignore\\\`.
`
},
{
  slug: "sql-joins-visual-guide",
  title: "SQL Joins: INNER, LEFT, RIGHT and FULL",
  desc: "Every join type with the same two tables and the actual output, plus the NULL trap that makes LEFT JOIN behave like INNER JOIN.",
  date: "2026-08-17", mins: 6, tags: ["SQL", "DBMS"],
  body: `
## Two tables

**students**

| roll_no | name |
|---|---|
| CS001 | Ravi |
| CS002 | Priya |
| CS003 | Amit |

**marks**

| roll_no | subject | score |
|---|---|---|
| CS001 | Maths | 85 |
| CS002 | Maths | 92 |
| CS004 | Maths | 70 |

Note CS003 has no marks, and CS004 has marks but no student record. Those two are where join types differ.

## INNER JOIN — only matches

<pre><code>SELECT s.name, m.score
FROM students s
INNER JOIN marks m ON s.roll_no = m.roll_no;</code></pre>

| name | score |
|---|---|
| Ravi | 85 |
| Priya | 92 |

CS003 and CS004 both disappear. Only rows present in both survive.

## LEFT JOIN — keep everything on the left

<pre><code>SELECT s.name, m.score
FROM students s
LEFT JOIN marks m ON s.roll_no = m.roll_no;</code></pre>

| name | score |
|---|---|
| Ravi | 85 |
| Priya | 92 |
| Amit | NULL |

Amit appears with NULL. This is the join for "all students, with marks if they have any" — the most common real requirement.

## RIGHT JOIN

The mirror: every row from the right table. Rarely used, because swapping the table order and using LEFT is clearer.

## FULL OUTER JOIN

Everything from both sides, NULLs where there is no match. Useful for reconciliation — finding records that exist in one system but not the other.

## The trap

This looks like a LEFT JOIN and behaves like an INNER JOIN:

<pre><code>SELECT s.name, m.score
FROM students s
LEFT JOIN marks m ON s.roll_no = m.roll_no
WHERE m.score > 80;   -- silently drops Amit</code></pre>

Amit's \\\`score\\\` is NULL, and \\\`NULL > 80\\\` is not true — so the WHERE clause removes the row the LEFT JOIN just preserved.

Filter in the join condition instead:

<pre><code>LEFT JOIN marks m ON s.roll_no = m.roll_no AND m.score > 80</code></pre>

This catches people constantly, including in production. Any condition on the right-hand table belongs in \\\`ON\\\`, not \\\`WHERE\\\`.
`
},
{
  slug: "system-design-url-shortener",
  title: "System Design: Build a URL Shortener",
  desc: "The standard interview question, worked through \u2014 ID generation, storage, redirects and the scale estimates interviewers expect.",
  date: "2026-08-15", mins: 9, tags: ["System Design", "Software Engineering"],
  body: `
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

\\\`short_code\\\` is the primary key because every read looks up by it.

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
`
},
{
  slug: "time-complexity-big-o",
  title: "Big O Notation Without the Maths Anxiety",
  desc: "What O(n) actually means, the complexities you meet in practice, and how to analyse a loop in ten seconds.",
  date: "2026-08-13", mins: 7, tags: ["DSA", "Algorithms"],
  body: `
## What it measures

Big O describes how runtime grows as input grows. Not seconds — *growth*.

An O(n) algorithm on 1,000 items takes roughly ten times what it takes on 100. That ratio is the whole point, and it is why constants are dropped: O(2n) and O(n) grow the same way.

## The ones you meet

**O(1) — constant.** Array index, hash map lookup. Same cost regardless of size.

**O(log n) — logarithmic.** Binary search, balanced tree lookup. Doubling the input adds *one* step. A million items is about 20 steps.

**O(n) — linear.** One pass. A loop over an array.

**O(n log n)** — merge sort, heap sort, quick sort on average. The best possible for comparison-based sorting.

**O(n²) — quadratic.** Nested loops over the same data. Fine at 100 items, unusable at 100,000.

**O(2ⁿ) — exponential.** Naive recursive Fibonacci. Unusable almost immediately.

## Reading code

<pre><code>for (let i = 0; i < n; i++) { ... }              // O(n)

for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) { ... }            // O(n²)

for (let i = 1; i < n; i *= 2) { ... }           // O(log n)</code></pre>

The third is the one people misread. \\\`i\\\` doubles, so it reaches n in log₂(n) steps, not n.

## Best, average, worst

Quick sort is O(n log n) average and O(n²) worst — when the pivot is always the smallest element. Interviewers ask for all three because the worst case is what wakes you at 3am.

## Space complexity too

Merge sort is O(n log n) time and **O(n) space** — it allocates. Heap sort is O(n log n) time and O(1) space. On memory-constrained systems that decides it.

## The practical version

You rarely compute complexity formally. You ask: *does this loop over the data once, or once per item?*

Once → linear, fine. Once per item → quadratic, check the expected size. That question catches most real performance bugs before they ship.
`
},
{
  slug: "authentication-jwt-vs-sessions",
  title: "JWT vs Sessions: Which Should You Use?",
  desc: "How each works, where the token actually lives, and the revocation problem that makes JWT the wrong default for most applications.",
  date: "2026-08-11", mins: 8, tags: ["Web", "Security"],
  body: `
## The problem both solve

HTTP is stateless. The server has no memory of the previous request, so every request must carry proof of who you are.

## Session-based

1. User logs in; server creates a session and stores it.
2. Server sends a session ID in a cookie.
3. Each request sends the cookie; the server looks the session up.

State lives on the server. The cookie is just a key.

## Token-based (JWT)

1. User logs in; server signs a token containing the claims.
2. Client stores and sends it, usually as \\\`Authorization: Bearer ...\\\`.
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

\`localStorage\` is readable by any JavaScript on the page, so an XSS vulnerability exfiltrates the token.

An \`httpOnly\` cookie cannot be read by JavaScript, which removes that path — at the cost of needing CSRF protection.

Neither is free. Choose based on which attack you are more exposed to.
`
},
{
  slug: "why-your-website-is-slow",
  title: "Why Your Website Is Slow (And How to Find Out)",
  desc: "Render-blocking resources, oversized images, third-party scripts and unused JavaScript \u2014 the four causes behind most slow pages, and how to measure rather than guess.",
  date: "2026-08-09", mins: 8, tags: ["Web", "Performance"],
  body: `
## Measure first

Every performance discussion should start with a measurement, because intuition is wrong more often than not. Lighthouse in Chrome DevTools takes thirty seconds and tells you which of the following applies.

## 1. Render-blocking resources

A stylesheet or synchronous script in \\\`<head>\\\` stops the browser painting until it loads.

<pre><code>&lt;!-- blocks: parser waits for a network round trip --&gt;
&lt;script src="https://analytics.example.com/script.js"&gt;&lt;/script&gt;

&lt;!-- does not block --&gt;
&lt;script defer src="https://analytics.example.com/script.js"&gt;&lt;/script&gt;</code></pre>

Analytics, chat widgets and ad scripts have no reason to block first paint. \\\`defer\\\` costs one word.

Your own CSS *should* block — the alternative is a flash of unstyled content.

## 2. Images

Usually the largest single cause.

- **Wrong size.** A 2000px image displayed at 200px downloads 100× the pixels needed.
- **Wrong format.** WebP is typically 30% smaller than JPEG at the same quality.
- **No dimensions.** Causes layout shift, which is a separate metric and a separate penalty.

<pre><code>&lt;img src="photo.webp" width="800" height="600" loading="lazy" alt="…"&gt;</code></pre>

\\\`loading="lazy"\\\` on below-the-fold images defers them until needed.

## 3. Third-party scripts

The ones you did not write and cannot optimise. An ad script can exceed 200 KB and block the main thread for over 100 ms.

The question worth asking is whether each one earns its cost. A script loading on every page and producing nothing measurable is pure overhead — and that situation is more common than it sounds, particularly with ad scripts left in place after the ad units were removed.

## 4. Unused JavaScript

Shipping code nobody runs. Two common sources:

**No code splitting.** Every route in one bundle means a visitor to the homepage downloads the settings page too. Lazy-load routes.

**Heavy libraries for light tasks.** An animation library for one fade-in, a date library for one format call. Check the size before adding a dependency.

## Lab versus field

Lighthouse simulates one load on your machine. Real users are on slower devices and worse networks, so field data is usually worse than your lab score.

Both are useful: lab to debug, field to know. Only field data tells you what people actually experienced.

## The order to work in

1. Remove what you do not need — unused scripts, dead assets.
2. Stop what remains from blocking — \\\`defer\\\`, \\\`async\\\`, lazy loading.
3. Shrink what is left — image formats, code splitting.

Deleting is always the biggest win, and it is the step people skip.
`
},
{
  slug: "database-transactions-deadlocks",
  title: "Transactions and Deadlocks: What Goes Wrong Under Load",
  desc: "Why two correct transactions can block each other forever, how databases detect it, and the lock ordering rule that prevents most deadlocks.",
  date: "2026-08-07", mins: 7, tags: ["Databases", "DBMS"],
  body: `
## A deadlock, concretely

Two transactions, both correct in isolation:

    T1: lock row A  →  wants row B
    T2: lock row B  →  wants row A

Neither can proceed. Neither will release. Without intervention they wait forever.

## Detection

Databases maintain a wait-for graph and look for cycles. On finding one they pick a victim, roll it back, and return an error:

    ERROR: deadlock detected
    DETAIL: Process 123 waits for ShareLock on transaction 456…

The important implication for application code: **a deadlock is a retryable error**, not a bug. The victim transaction did nothing wrong — it lost a coin toss.

<pre><code>for (let attempt = 0; attempt < 3; attempt++) {
  try { return await runTransaction(); }
  catch (e) {
    if (e.code !== '40P01' || attempt === 2) throw e;
    await sleep(50 * 2 ** attempt);   // back off, then retry
  }
}</code></pre>

## Prevention: consistent lock ordering

Most deadlocks come from two code paths acquiring the same locks in different orders.

<pre><code>-- transfer(from, to): always lock the lower id first
UPDATE accounts SET balance = balance - 500
WHERE id = LEAST(:from, :to);</code></pre>

If every transaction acquires locks in the same order, a cycle is impossible. This single rule removes most deadlocks in practice.

## Keep transactions short

A transaction holds its locks until commit. Anything slow inside it extends the window in which a conflict can occur.

The classic mistake:

<pre><code>BEGIN;
UPDATE orders SET status = 'paid' WHERE id = ?;
-- calling a payment API here holds the lock for 2 seconds
COMMIT;</code></pre>

Do the external call outside the transaction. Locks should be held for microseconds, not network round trips.

## Isolation level affects this

Higher isolation takes more locks and produces more conflicts. Serializable is correct but contends heavily; Read Committed is the usual default because it is enough for most workloads.

Raising the isolation level to fix a race condition is valid — but expect more retries, and make sure the retry loop exists first.
`
},
{
  slug: "api-rate-limiting",
  title: "Rate Limiting: Token Bucket, Sliding Window and Why It Matters",
  desc: "Algorithms compared, where to enforce the limit, and the headers that let a well-behaved client back off instead of hammering you.",
  date: "2026-08-05", mins: 7, tags: ["Web", "System Design"],
  body: `
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

Without \\\`Retry-After\\\`, a client has no idea when to try again, so it retries immediately and makes the problem worse. These headers are what let well-written clients behave.

## Where to enforce it

At the edge — reverse proxy, API gateway or CDN — so rejected requests never reach your application. Enforcing in application code means you have already paid for connection handling and middleware before saying no.
`
},
{
  slug: "choosing-a-database",
  title: "Choosing a Database: SQL, NoSQL and When It Matters",
  desc: "Relational, document, key-value and columnar stores \u2014 what each is genuinely good at, and why 'it does not scale' is usually the wrong reason to reject SQL.",
  date: "2026-08-03", mins: 8, tags: ["Databases", "System Design"],
  body: `
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
`
},
];
