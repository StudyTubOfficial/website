# GDPR for Developers: What Actually Changes in Your Code

**URL:** https://studytub.netlify.app/blog/gdpr-for-developers.html
**Published:** 2026-08-25
**Tags:** Privacy, Web

Personal data, lawful basis, and the specific technical decisions — IP handling, retention, consent — that follow from the regulation.

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
