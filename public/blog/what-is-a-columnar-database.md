# What Is a Columnar Database? (And Why Analytics Uses One)

**URL:** https://studytub.netlify.app/blog/what-is-a-columnar-database.html
**Published:** 2026-09-10
**Tags:** Databases, DBMS

Row stores and column stores explained with the same query — why a database that stores columns together reads a hundredth of the data for an analytics question. Useful for DBMS courses and interviews.

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
