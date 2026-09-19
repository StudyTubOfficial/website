# Transactions and Deadlocks: What Goes Wrong Under Load

**URL:** https://studytub.netlify.app/blog/database-transactions-deadlocks.html
**Published:** 2026-08-07
**Tags:** Databases, DBMS

Why two correct transactions can block each other forever, how databases detect it, and the lock ordering rule that prevents most deadlocks.

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
