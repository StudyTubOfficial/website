# Git Branching That Will Not Ruin Your Project

**URL:** https://studytub.netlify.app/blog/git-branching-for-students.html
**Published:** 2026-08-21
**Tags:** Software Engineering, Git

Branches, merges, conflicts and the commands to recover when something goes wrong — written for team projects where one mistake blocks everyone.

## Why branches

Four people editing \`main\` at once produces conflicts on every push. A branch is a private line of work that can be merged when it is ready.

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

Delete the markers, keep the correct result, \`git add\` and continue. There is no automatic resolution because the right answer requires knowing the intent.

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

\`git reflog\` is the one worth remembering. It records where HEAD has been, including commits no branch points at any more — so an accidental reset is usually recoverable.

## .gitignore from the first commit

<pre><code>node_modules/
.env
dist/</code></pre>

Commit \`node_modules\` once and it stays in history forever; \`.gitignore\` only affects untracked files. Committing \`.env\` leaks credentials into a place that outlives deleting the file.

Both are common, and both are much harder to undo than to prevent.
