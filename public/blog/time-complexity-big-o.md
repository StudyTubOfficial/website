# Big O Notation Without the Maths Anxiety

**URL:** https://studytub.netlify.app/blog/time-complexity-big-o.html
**Published:** 2026-08-13
**Tags:** DSA, Algorithms

What O(n) actually means, the complexities you meet in practice, and how to analyse a loop in ten seconds.

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

The third is the one people misread. \`i\` doubles, so it reaches n in log₂(n) steps, not n.

## Best, average, worst

Quick sort is O(n log n) average and O(n²) worst — when the pivot is always the smallest element. Interviewers ask for all three because the worst case is what wakes you at 3am.

## Space complexity too

Merge sort is O(n log n) time and **O(n) space** — it allocates. Heap sort is O(n log n) time and O(1) space. On memory-constrained systems that decides it.

## The practical version

You rarely compute complexity formally. You ask: *does this loop over the data once, or once per item?*

Once → linear, fine. Once per item → quadratic, check the expected size. That question catches most real performance bugs before they ship.
