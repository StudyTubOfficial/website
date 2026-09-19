# SQL Joins: INNER, LEFT, RIGHT and FULL

**URL:** https://studytub.netlify.app/blog/sql-joins-visual-guide.html
**Published:** 2026-08-17
**Tags:** SQL, DBMS

Every join type with the same two tables and the actual output, plus the NULL trap that makes LEFT JOIN behave like INNER JOIN.

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

Amit's \`score\` is NULL, and \`NULL > 80\` is not true — so the WHERE clause removes the row the LEFT JOIN just preserved.

Filter in the join condition instead:

<pre><code>LEFT JOIN marks m ON s.roll_no = m.roll_no AND m.score > 80</code></pre>

This catches people constantly, including in production. Any condition on the right-hand table belongs in \`ON\`, not \`WHERE\`.
