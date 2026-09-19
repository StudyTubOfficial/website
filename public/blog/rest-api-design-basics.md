# REST API Design: The Conventions That Matter

**URL:** https://studytub.netlify.app/blog/rest-api-design-basics.html
**Published:** 2026-08-29
**Tags:** Web, Software Engineering

Resource naming, the right status codes, idempotency, and why a consistent response envelope saves every client from special-casing your endpoints.

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

Returning 200 with \`{"error": "..."}\` defeats the point — every client then has to parse the body to know whether the call worked.

## Idempotency

An idempotent request can be repeated safely. \`GET\`, \`PUT\` and \`DELETE\` should be; \`POST\` is not.

This is not academic. Networks fail after the server processed the request but before the response arrived. The client retries. If \`POST /payments\` is not protected by an idempotency key, the customer is charged twice.

## One response envelope

<pre><code>{ "success": true,  "data": { } }
{ "success": false, "error": "Student not found" }</code></pre>

Consistency here is worth more than elegance. Every client writes one handler instead of branching per endpoint.

## Paginate from the start

An endpoint returning every row works until the table grows. Adding pagination later breaks every existing caller.

    GET /students?limit=50&cursor=eyJpZCI6MTAwfQ

Cursor pagination beats offset pagination on large tables: \`OFFSET 100000\` makes the database count through 100,000 rows to skip them.

## Never leak internals in errors

Return enough for a developer to fix a 4xx. Return a generic message for a 5xx and log the detail server-side. A stack trace in a response is an information disclosure.
