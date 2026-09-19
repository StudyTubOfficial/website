# ACID Properties Explained with Real Examples

**URL:** https://studytub.netlify.app/blog/acid-properties-explained.html
**Published:** 2026-09-06
**Tags:** Databases, DBMS

Atomicity, Consistency, Isolation, Durability — what each actually guarantees, what breaks without it, and the isolation levels that show up in every DBMS exam.

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

If a column says \`balance >= 0\`, no transaction can leave it negative — the transaction fails instead.

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

Once \`COMMIT\` returns, the data survives a power failure. Achieved through write-ahead logging: the change is written to a durable log before it is applied, so a crashed database can replay the log on restart.

## Where ACID is deliberately relaxed

Analytics databases often loosen these. Reading slightly stale data to answer "how many visitors yesterday" is fine; blocking a write for it is not.

That is why an analytics system commonly writes to an ACID store like PostgreSQL and reads from a separate store that trades some guarantees for speed. Knowing *which* guarantee is being traded, and why it does not matter for that query, is the actual engineering judgement.
