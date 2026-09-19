# SQL Window Functions Explained Simply

**URL:** https://studytub.netlify.app/blog/sql-window-functions-explained.html
**Published:** 2026-09-08
**Tags:** SQL, DBMS

ROW_NUMBER, RANK, LAG and running totals, with examples you can follow. The part of SQL that separates a passing grade from an actually useful skill.

## GROUP BY throws away the rows

Every SQL course teaches `GROUP BY`. It has one limitation students hit immediately: it collapses rows.

<pre><code>SELECT student, AVG(marks) FROM results GROUP BY student;</code></pre>

You get one row per student. The individual subject marks are gone. If you want *both* the individual rows and an aggregate beside them, `GROUP BY` cannot help.

That is what window functions are for.

## The shape

<pre><code>SELECT student, subject, marks,
       AVG(marks) OVER (PARTITION BY student) AS student_avg
FROM results;</code></pre>

Every original row survives, and each carries its student's average alongside. `OVER` is what makes it a window function; `PARTITION BY` is the grouping without the collapsing.

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

`ROW_NUMBER` always increments. `RANK` ties then skips. `DENSE_RANK` ties without skipping. Exams love this distinction.

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

The `ROWS BETWEEN` clause defines the frame — which rows the function sees. Omitting it gives a default that is usually what you want but occasionally is not, so being explicit is worth the extra line.

## Where this is actually used

Sessionizing web analytics uses exactly this pattern: `LAG` to find the gap between consecutive events, then a running `SUM` over a flag to assign session numbers.

It is one of the few SQL topics where the exam question and the production use are genuinely the same thing.
