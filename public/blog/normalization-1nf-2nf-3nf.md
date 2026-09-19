# Database Normalization: 1NF, 2NF and 3NF Made Clear

**URL:** https://studytub.netlify.app/blog/normalization-1nf-2nf-3nf.html
**Published:** 2026-09-02
**Tags:** Databases, DBMS

Each normal form as a problem it solves, with one table normalised step by step — plus when experienced engineers denormalise on purpose.

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

Every cell holds a single value. A \`subjects\` column containing "Maths, Physics" violates 1NF.

The table above is already 1NF: each row has one subject.

## 2NF — no partial dependency

*Requires 1NF.* No non-key column may depend on only part of a composite key.

The key here is (roll_no, subject). But \`name\` and \`branch\` depend on \`roll_no\` alone — a partial dependency. Split:

**students** (roll_no, name, branch, branch_hod)
**results** (roll_no, subject, marks)

## 3NF — no transitive dependency

*Requires 2NF.* No non-key column may depend on another non-key column.

In \`students\`, \`branch_hod\` depends on \`branch\`, which depends on \`roll_no\`. That is transitive. Split again:

**students** (roll_no, name, branch)
**branches** (branch, branch_hod)
**results** (roll_no, subject, marks)

All three anomalies are now gone. The HOD is stored once; a branch can exist without students; deleting a student does not delete a branch.

## The part exams leave out

Normalization costs joins. Fully normalised data needs three joins to answer "show me every student with their HOD and marks", and joins are expensive at scale.

Production systems **denormalise deliberately** — duplicating data to avoid joins on hot paths. Analytics databases go furthest, often using a star schema that is barely 2NF, because a read-mostly workload does not suffer update anomalies.

Normalize by default. Denormalize when you measure a problem, and know which anomaly you are accepting when you do.
