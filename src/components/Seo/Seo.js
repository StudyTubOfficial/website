import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Per-page SEO tags.
 *
 * Every route rendered the same <title>StudyTub</title> and no description, so
 * search results and link previews were identical for the homepage, About, FAQ
 * and Contact alike. One component so a page declares what it is and gets the
 * full set — title, description, canonical, OpenGraph, Twitter and JSON-LD —
 * rather than each page remembering nine tags.
 *
 * IMPORTANT: these tags are injected by JavaScript, so Googlebot only sees them
 * after rendering the page. For crawlers that do not execute JS, and for the
 * content itself, the static pages under /notes/ remain the reliable route —
 * see scripts/build-notes.js. Helmet improves the app routes; it does not
 * replace prerendering.
 */
const SITE = "https://studytub.netlify.app";
const DEFAULT_IMAGE = `${SITE}/assets/images/logo/logo.png`;

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd = null,
}) {
  // Keep the brand suffix off a title that already carries it.
  const fullTitle = title
    ? (title.includes("StudyTub") ? title : `${title} | StudyTub`)
    : "StudyTub — Free BTECH Engineering Notes & Question Papers";
  const url = `${SITE}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex
        ? <meta name="robots" content="noindex,nofollow" />
        : <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />}

      <meta property="og:site_name" content="StudyTub" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

/** Breadcrumb JSON-LD. Pass [["StudyTub","/"],["About","/about"]]. */
export function breadcrumb(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, p], i) => ({
      "@type": "ListItem", position: i + 1, name, item: `${SITE}${p}`,
    })),
  };
}

/** FAQPage JSON-LD. Only use where the questions are actually on the page. */
export function faqLd(pairs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(([q, a]) => ({
      "@type": "Question", name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export { SITE };
