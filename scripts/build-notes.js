#!/usr/bin/env node
/**
 * Generate the static notes pages into build/.
 *
 * WHY THESE ARE HTML AND NOT REACT COMPONENTS
 * The app renders client-side, so Googlebot sees an empty <body> on every route
 * — measured at 10 words ("You need to enable JavaScript to run this app")
 * against 428 here. That is why the site ranks for nothing but its own name.
 * Until the app is prerendered these pages carry what search engines can read.
 *
 * They are NOT a second design system. The markup uses the app's own classes
 * (.nav, .container, .section, .card, .btn, .badge) and loads the app's
 * compiled stylesheet, so an edit to index.css reaches these pages too.
 *
 * Runs after react-scripts build, because CRA content-hashes the CSS filename
 * and it has to be read from the build output rather than guessed.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const SITE = "https://studytub.netlify.app";
const DRIVE = "https://notes.studytub.workers.dev/0:";
const data = require("./notes-data.json");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function appCss() {
  const dir = path.join(BUILD, "static", "css");
  const f = fs.readdirSync(dir).find((x) => /^main\..*\.css$/.test(x));
  if (!f) throw new Error("no compiled stylesheet in build/static/css");
  return `/static/css/${f}`;
}

const SEMS = [
  ["first-year-engineering-notes", "First Year", "First%20Year", "First Year", "1st.svg",
   "Sem 1 and 2 — Maths, Physics, Chemistry, C programming, Data Structures and BEE"],
  ["3rd-semester-btech-notes", "3rd Semester", "3rd%20Sem", "3rd Sem", "3rd.svg",
   "CSE, ECE, EEE and EIE — where branch subjects begin"],
  ["4th-semester-btech-notes", "4th Semester", "4th%20sem", "4th sem", "4th.svg",
   "Core papers by branch, with mid and end term question papers"],
  ["5th-semester-btech-notes", "5th Semester", "5th%20sem", "5th sem", "5th.svg",
   "Core and elective subjects, organised by branch"],
  ["6th-semester-btech-notes", "6th Semester", "6th%20sem", "6th sem", "6th.svg",
   "The last heavy core subjects before final year project work"],
  ["7th-semester-btech-notes", "7th Semester", "7th%20Sem", "7th Sem", "7th.svg",
   "Machine Learning, IOT, Compiler Design and Cryptography"],
  ["8th-semester-btech-notes", "8th Semester", "8th%20Sem", "8th Sem", "8th.svg",
   "Final semester subjects and project management"],
];

const SKIP = new Set(["pmm", "wsn", "module", "math"]);
const subjects = data.subjects.filter((s) => !SKIP.has(s.key) && s.display.length >= 4);
const totalFiles = subjects.reduce((n, s) => n + s.files.length, 0);

// ── chrome, mirroring Navbar.js / Footer.js markup ─────────────────────────

const navbar = (active) => {
  const li = (href, label) =>
    `<li class="nav__item"><a class="nav__link${active === href ? " nav__link--active" : ""}" href="${href}">${label}</a></li>`;
  return `<header class="nav">
  <div class="container">
    <nav class="nav__inner">
      <a class="nav__logo" href="/">
        <img src="/assets/images/logo/logo.png" alt="StudyTub" class="nav__logo-img"/>
        <span class="nav__logo-text">StudyTub</span>
      </a>
      <ul class="nav__links">
        ${li("/", "Home")}${li("/notes/", "Notes")}${li("/notes/subjects/", "Subjects")}${li("/faq", "FAQ")}
      </ul>
      <div class="nav__actions">
        <button class="theme-toggle" type="button" onclick="__toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode">
          <svg class="i-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
          <svg class="i-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>
        <a class="btn btn--primary btn--sm" href="/login">Login</a>
      </div>
    </nav>
  </div>
</header>`;
};

const FOOTER = `<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="footer__logo" href="/">
          <img src="/assets/images/logo/logo.png" alt="StudyTub" class="footer__logo-img"/>
          <span class="footer__logo-text">StudyTub</span>
        </a>
        <p class="footer__tagline">Free study notes and previous year question papers for BTECH students.</p>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Notes</h4>
        <ul class="footer__list">
          <li><a href="/notes/">By semester</a></li>
          <li><a href="/notes/subjects/">By subject</a></li>
          <li><a href="/notes/first-year-engineering-notes.html">First year</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Support</h4>
        <ul class="footer__list">
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom"><p>&copy; ${new Date().getFullYear()} StudyTub &mdash; free for students, always.</p></div>
  </div>
</footer>`;

const AUTHBAR = `<div class="notice" data-auth-banner>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
  <span><strong>Reading is open.</strong> Opening the files asks for a free account &mdash; <a href="/login">sign in</a>, and you will be returned here.</span>
</div>`;

const breadcrumb = (items) => `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
})}</script>`;

const faqLd = (pairs) => `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: pairs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
})}</script>`;

const faqHtml = (pairs) => pairs.map(([q, a]) =>
  `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n");

function page({ title, desc, url, md, ld, active, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<link rel="canonical" href="${url}"/>
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"/>
<meta property="og:site_name" content="StudyTub"/>
<meta property="og:title" content="${esc(title.split(" | ")[0])}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:type" content="article"/>
<meta property="og:locale" content="en_IN"/>
<meta property="og:image" content="${SITE}/assets/images/logo/logo.png"/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="${esc(title.split(" | ")[0])}"/>
<meta name="twitter:description" content="${esc(desc)}"/>
<link rel="icon" href="/assets/images/logo/logo.png"/>
<link rel="alternate" type="text/markdown" href="${md}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="${appCss()}"/>
<link rel="stylesheet" href="/notes/assets/notes.css"/>
<script src="/notes/assets/theme.js"></script>
<script src="https://traffic-production-bba7.up.railway.app/api/sites/site_9ad371c3/script"></script>
${ld}
</head>
<body>
${navbar(active)}
<main>
${body}
</main>
${FOOTER}
<script src="/notes/assets/notes-auth.js" defer></script>
</body>
</html>
`;
}

// ── hero, using the app's existing semester artwork ────────────────────────
const hero = ({ label, h1, lede, stats, img, actions }) => `
<section class="section section--hero">
  <div class="container">
    <div class="hero-split">
      <div>
        <span class="badge badge--primary">${esc(label)}</span>
        <h1 class="hero-title">${esc(h1)}</h1>
        <p class="hero-lede">${lede}</p>
        <div class="statrow">${stats.map(([v, l]) =>
          `<div class="stat"><b>${v}</b><span>${esc(l)}</span></div>`).join("")}</div>
        <div class="btnrow">${actions}</div>
      </div>
      ${img ? `<div class="hero-media"><img src="/assets/images/service/${img}" alt="" width="220" height="220" loading="eager"/></div>` : ""}
    </div>
  </div>
</section>`;

// ── write pages ────────────────────────────────────────────────────────────
const out = (rel, html) => {
  const p = path.join(BUILD, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
};

let written = 0;
const urls = [];

// Home
{
  const url = `${SITE}/home.html`;
  const faqs = [
    ["Is StudyTub free?", "Yes. Every note is free to read and download. There is no premium tier. Opening files asks for a free account — an email address, nothing more."],
    ["Which semesters are covered?", "First year through eighth semester, with notes organised by branch from third semester onward."],
    ["Can I contribute my own notes?", "Yes. StudyTub is built from notes students share. Use the contact page to add yours."],
  ];
  const cards = SEMS.map(([s, l, , , img, b]) =>
    `<a class="card card--link" href="/notes/${s}.html">
      <img class="card__icon" src="/assets/images/service/${img}" alt="" width="48" height="48" loading="lazy"/>
      <h3 class="card__title">${esc(l)}</h3>
      <p class="card__text">${esc(b)}</p>
    </a>`).join("\n");
  out("home.html", page({
    title: "StudyTub — Free BTECH Engineering Notes & Question Papers, All Semesters",
    desc: "Free engineering notes for BTECH students: every semester, every branch. Handwritten class notes, previous year question papers (2018-2023) and lab manuals for CSE, ECE, EEE and EIE. No payment, no premium tier.",
    url, md: "/index.md", active: "/",
    ld: breadcrumb([["StudyTub", SITE + "/"]]) + faqLd(faqs),
    body: hero({
      label: "Free for students", h1: "Free BTECH engineering notes, every semester",
      lede: "Handwritten class notes, previous year question papers and lab manuals for computer science, electronics, electrical and instrumentation &mdash; first year through final year.",
      stats: [[`${totalFiles}+`, "files"], [subjects.length, "subjects"], ["2018&ndash;23", "papers"], ["Free", "no payment"]],
      img: "icon_academic_cap.svg",
      actions: `<a class="btn btn--primary btn--lg" href="/notes/">Browse by semester</a><a class="btn btn--outline btn--lg" href="/notes/subjects/">Find a subject</a>`,
    }) + `
<section class="section section--alt">
  <div class="container">
    ${AUTHBAR}
    <div class="section__header"><span class="section__label">Semesters</span>
      <h2 class="section__title">Notes by semester</h2>
      <p class="section__desc">Every semester folder, with the subjects it actually contains.</p></div>
    <div class="grid grid--4">${cards}</div>
  </div>
</section>
<section class="section">
  <div class="container prose">
    <h2>What you get</h2>
    <ul>
      <li><strong>Handwritten class notes</strong> &mdash; unit-wise, shared by students who took the subject</li>
      <li><strong>Previous year question papers</strong> &mdash; mid-term and end-term, 2018 through 2023</li>
      <li><strong>Lab manuals and records</strong> &mdash; procedure, readings and sample results</li>
      <li><strong>Reference PDFs and presentations</strong> &mdash; for revising quickly before an exam</li>
    </ul>
    <h2>Why StudyTub exists</h2>
    <p>Good notes usually circulate in one WhatsApp group and then disappear. StudyTub collects
    them in one place so the next batch does not start from nothing. Everything here was shared
    by students who took the subject. If you have notes worth passing on, the
    <a href="/contact">contact page</a> is how to add them.</p>
    <h2>Frequently asked questions</h2>
    ${faqHtml(faqs)}
  </div>
</section>`,
  }));
  urls.push([url, "weekly", "0.9"]); written++;
}

// Notes index
{
  const url = `${SITE}/notes/`;
  const faqs = [
    ["Are the notes free?", "Yes. Every file is free to read and download. Opening files asks for a free account — an email address, nothing more."],
    ["Which branches are covered?", "Computer science, electronics and communication, electrical and electronics, and electronics and instrumentation, from third semester onward. First year is common to all branches."],
    ["Do these follow my university syllabus?", "The first year syllabus is broadly common across Indian engineering universities. From third semester the notes follow a standard BTECH curriculum, with minor differences in unit ordering."],
  ];
  const cards = SEMS.map(([s, l, , raw, img, b]) => {
    const n = data.semFiles[raw] || 0;
    const folders = (data.semFolders[raw] || []).length;
    return `<a class="card card--link" href="/notes/${s}.html">
      <img class="card__icon" src="/assets/images/service/${img}" alt="" width="48" height="48" loading="lazy"/>
      <h3 class="card__title">${esc(l)}</h3>
      <p class="card__text">${esc(b)}</p>
      <span class="card__meta">${n ? `${n} files · ` : ""}${folders} folders</span>
    </a>`;
  }).join("\n");
  out("notes/index.html", page({
    title: "BTECH Notes by Semester — Free Engineering PDFs & Question Papers | StudyTub",
    desc: "Free BTECH engineering notes for every semester, first year through eighth. Handwritten notes, previous year question papers and lab manuals for CSE, ECE, EEE and EIE.",
    url, md: "/notes/index.md", active: "/notes/",
    ld: breadcrumb([["StudyTub", SITE + "/"], ["Notes", url]]) + faqLd(faqs),
    body: hero({
      label: "All semesters", h1: "BTECH notes by semester",
      lede: "Free engineering notes for every semester &mdash; handwritten class notes, previous year question papers and lab manuals, for CSE, ECE, EEE and EIE.",
      stats: [[SEMS.length, "semesters"], [subjects.length, "subjects"], [`${totalFiles}+`, "files"]],
      img: "icon_diploma.svg",
      actions: `<a class="btn btn--primary btn--lg" href="/notes/subjects/">Find a subject</a>`,
    }) + `
<section class="section section--alt">
  <div class="container">
    ${AUTHBAR}
    <div class="section__header"><span class="section__label">Pick one</span>
      <h2 class="section__title">Choose your semester</h2></div>
    <div class="grid grid--4">${cards}</div>
  </div>
</section>
<section class="section">
  <div class="container prose">
    <h2>Or find a subject directly</h2>
    <p>If you know the subject or its code, <a href="/notes/subjects/">browse by subject</a> &mdash;
    ${subjects.length} subjects with previous year papers listed by file, subject code and year.</p>
    <h2>What you get</h2>
    <ul>
      <li><strong>Handwritten class notes</strong> &mdash; unit-wise, shared by students who took the subject</li>
      <li><strong>Previous year question papers</strong> &mdash; mid-term and end-term, for every semester</li>
      <li><strong>Lab manuals and records</strong> &mdash; procedure, readings and sample results</li>
      <li><strong>Reference PDFs and presentations</strong> &mdash; for revising quickly before an exam</li>
    </ul>
    <h2>Frequently asked questions</h2>
    ${faqHtml(faqs)}
  </div>
</section>`,
  }));
  urls.push([url, "weekly", "0.9"]); written++;
}

// Semester pages
for (const [s, label, enc, raw, img, blurb] of SEMS) {
  const url = `${SITE}/notes/${s}.html`;
  const folders = (data.semFolders[raw] || []).sort();
  const count = data.semFiles[raw] || 0;
  const drive = `${DRIVE}/${enc}/`;
  const vol = count ? `${count} files including mid-term and end-term question papers`
                    : `${folders.length} subject folders with notes and question papers`;
  const faqs = [
    [`Are ${label.toLowerCase()} notes free on StudyTub?`, "Yes. Every file is free to read and download. Opening them asks for a free account — an email address, nothing more."],
    [`What is included in the ${label.toLowerCase()} notes?`, `${vol}, across ${folders.length} folders: handwritten class notes, question papers and lab manuals.`],
    ["Which university syllabus do these follow?", "The notes follow a standard BTECH curriculum used across Indian engineering universities, with minor differences in unit ordering."],
  ];
  const cards = folders.map((f) =>
    `<div class="card"><h3 class="card__title">${esc(f)}</h3><p class="card__text">Notes, question papers and lab material</p></div>`).join("\n");
  const related = subjects.filter((x) => x.paths.some((p) => p.startsWith(`/0:/${enc}/`))).slice(0, 12);
  const relHtml = related.length
    ? `<h2>Subjects in ${esc(label)}</h2><p class="chiprow">${related.map((x) =>
        `<a class="chip" href="/notes/subjects/${slug(x.display)}.html">${esc(x.display)}</a>`).join("")}</p>`
    : "";

  out(`notes/${s}.html`, page({
    title: `${label} BTECH Notes — ${count ? count + " Free PDFs & " : ""}Question Papers | StudyTub`,
    desc: `Free ${label.toLowerCase()} BTECH notes: ${vol}. ${folders.slice(0, 5).join(", ")}. Free to download, no payment.`,
    url, md: `/notes/${s}.md`, active: "/notes/",
    ld: breadcrumb([["StudyTub", SITE + "/"], ["Notes", SITE + "/notes/"], [label, url]]) + faqLd(faqs),
    body: hero({
      label, h1: `${label} BTECH notes`,
      lede: `${esc(blurb)}. Handwritten class notes, previous year question papers and lab manuals &mdash; free to read and download.`,
      stats: [...(count ? [[count, "files"]] : []), [folders.length, count ? "folders" : "subject folders"], ["Free", "no payment"]],
      img,
      actions: `<a class="btn btn--primary btn--lg" href="${drive}">Open ${esc(label)} files</a><a class="btn btn--outline btn--lg" href="/notes/subjects/">By subject</a>`,
    }) + `
<section class="section section--alt">
  <div class="container">
    ${AUTHBAR}
    <div class="section__header"><span class="section__label">Contents</span>
      <h2 class="section__title">What is in this folder</h2>
      <p class="section__desc">The actual folders in ${esc(label)}, as they appear in the drive.</p></div>
    <div class="grid grid--4">${cards}</div>
  </div>
</section>
<section class="section">
  <div class="container prose">
    ${relHtml}
    <h2>How to revise with these</h2>
    <p>Start with the previous year papers rather than the notes. University papers repeat their
    question patterns closely from year to year, so an hour with two past papers usually shows
    which units the exam actually weights &mdash; then read the notes for those units first.</p>
    <h2>Frequently asked questions</h2>
    ${faqHtml(faqs)}
    <p class="btnrow"><a class="btn btn--primary btn--lg" href="${drive}">Open ${esc(label)} files</a></p>
    <p class="muted"><strong>Other semesters:</strong> ${SEMS.filter(([x]) => x !== s)
      .map(([x, l]) => `<a href="/notes/${x}.html">${esc(l)}</a>`).join(" &middot; ")}</p>
  </div>
</section>`,
  }));
  urls.push([url, "monthly", "0.8"]); written++;
}

// Subject index
{
  const url = `${SITE}/notes/subjects/`;
  const faqs = [
    ["Can I search by subject code?", "Yes. Each subject page lists its code, such as 18EC1T12 for Digital Communication, so searching either the code or the subject name finds the same notes."],
    ["What years do the question papers cover?", "Papers range from 2018-2019 through 2022-2023, depending on the subject."],
    ["Are the files free?", "Yes. Reading the pages needs no account; opening the files asks for a free one."],
  ];
  const rows = subjects.slice().sort((a, b) => b.files.length - a.files.length).map((s) => {
    const yr = s.years.length > 1 ? `${s.years[0]} to ${s.years[s.years.length - 1]}` : (s.years[0] || "");
    return `<tr><td><a href="/notes/subjects/${slug(s.display)}.html">${esc(s.display)}</a></td>
      <td>${s.codes.length ? s.codes.map((c) => `<code class="code">${esc(c)}</code>`).join(" ") : "&mdash;"}</td>
      <td>${s.files.length}</td><td>${esc(yr) || "&mdash;"}</td></tr>`;
  }).join("\n");
  out("notes/subjects/index.html", page({
    title: `BTECH Subject Notes — ${subjects.length} Subjects with Question Papers | StudyTub`,
    desc: `Free BTECH notes and previous year question papers for ${subjects.length} subjects, searchable by subject code: Digital Communication (18EC1T12), Analog Electronic Circuits (18EI1T01), Circuit Theory (18EE1T01) and more.`,
    url, md: "/notes/subjects/index.md", active: "/notes/subjects/",
    ld: breadcrumb([["StudyTub", SITE + "/"], ["Notes", SITE + "/notes/"], ["Subjects", url]]) + faqLd(faqs),
    body: hero({
      label: "By subject", h1: "Notes by subject",
      lede: "Every subject lists the actual files available, its subject code, and the years its question papers cover.",
      stats: [[subjects.length, "subjects"], [totalFiles, "files"], ["2018&ndash;23", "papers"]],
      img: "icon_communication.svg",
      actions: `<a class="btn btn--outline btn--lg" href="/notes/">By semester</a>`,
    }) + `
<section class="section section--alt">
  <div class="container">
    ${AUTHBAR}
    <div class="section__header"><span class="section__label">All subjects</span>
      <h2 class="section__title">${subjects.length} subjects, ${totalFiles} files</h2></div>
    <div class="tablewrap"><table class="table">
      <thead><tr><th>Subject</th><th>Code</th><th>Files</th><th>Years</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </div>
</section>
<section class="section">
  <div class="container prose">
    <h2>Searching by subject code</h2>
    <p>University timetables and syllabus documents usually name a subject by its code rather
    than its title &mdash; <code class="code">18EC1T12</code> instead of Digital Communication.
    Both work here: every subject page carries its code, so either search reaches the same notes.</p>
    <h2>Frequently asked questions</h2>
    ${faqHtml(faqs)}
  </div>
</section>`,
  }));
  urls.push([url, "weekly", "0.9"]); written++;
}

// Subject pages
const SEM_LABEL = Object.fromEntries(SEMS.map(([s, l, , raw]) => [raw, [l, `/notes/${s}.html`]]));
const kind = (n) => {
  const l = n.toLowerCase();
  if (/end.?term/.test(l)) return "End-term paper";
  if (/mid.?term/.test(l)) return "Mid-term paper";
  if (l.includes("lab")) return "Lab material";
  return "Notes / PDF";
};
for (const s of subjects) {
  const name = s.display, sl = slug(name), url = `${SITE}/notes/subjects/${sl}.html`;
  const codeText = s.codes.join(", ");
  const yr = s.years.length > 1 ? `${s.years[0]} to ${s.years[s.years.length - 1]}` : (s.years[0] || "");
  const drive = "https://notes.studytub.workers.dev" + s.paths[0];
  const sems = s.sem.map((x) => SEM_LABEL[x]).filter(Boolean);
  const faqs = [
    [`What is the subject code for ${name}?`, s.codes.length ? `${name} is coded ${codeText}.` : `${name} does not carry a single code across branches.`],
    [`Are ${name} question papers available?`, `Yes — ${s.files.length} files${yr ? ` covering ${yr}` : ""}, including mid-term and end-term papers.`],
    ["Is it free?", "Yes. Reading is open; opening the files asks for a free account."],
  ];
  const order = ["End-term paper", "Mid-term paper", "Lab material", "Notes / PDF"];
  const rows = order.flatMap((t) => s.files.filter((f) => kind(f) === t).sort()
    .map((f) => `<tr><td>${esc(f)}</td><td><span class="badge">${esc(t)}</span></td></tr>`)).join("\n");

  out(`notes/subjects/${sl}.html`, page({
    title: `${name} Notes${s.codes.length ? ` (${codeText})` : ""} — Free BTECH PDFs & Papers | StudyTub`,
    desc: `Free ${name} notes and previous year question papers for BTECH${s.codes.length ? `, subject code ${codeText}` : ""}. ${s.files.length} files${yr ? ` covering ${yr}` : ""}. Mid-term and end-term papers, free to download.`,
    url, md: `/notes/subjects/${sl}.md`, active: "/notes/subjects/",
    ld: breadcrumb([["StudyTub", SITE + "/"], ["Notes", SITE + "/notes/"], ["Subjects", SITE + "/notes/subjects/"], [name, url]])
      + faqLd(faqs)
      + `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org", "@type": "Course", name,
          description: `Free ${name} notes and previous year question papers for BTECH students.`,
          url, provider: { "@type": "Organization", name: "StudyTub", url: SITE + "/" },
          isAccessibleForFree: true, ...(s.codes.length ? { courseCode: s.codes[0] } : {}),
        })}</script>`,
    body: hero({
      label: "Subject", h1: `${name} notes`,
      lede: `Free ${esc(name)} notes and previous year question papers for BTECH students.`
        + (s.codes.length ? ` Subject code ${s.codes.map((c) => `<code class="code">${esc(c)}</code>`).join(" ")}.` : ""),
      stats: [[s.files.length, "files"], ...(yr ? [[`${s.years[0].slice(0, 4)}&ndash;${s.years[s.years.length - 1].slice(-2)}`, "papers"]] : []), ["Free", "no payment"]],
      img: "icon_physics.svg",
      actions: `<a class="btn btn--primary btn--lg" href="${drive}">Open ${esc(name)} files</a><a class="btn btn--outline btn--lg" href="/notes/subjects/">All subjects</a>`,
    }) + `
<section class="section section--alt">
  <div class="container">
    ${AUTHBAR}
    <div class="section__header"><span class="section__label">Files</span>
      <h2 class="section__title">${s.files.length} files available</h2>
      <p class="section__desc">The actual files in the ${esc(name)} folder.</p></div>
    <div class="tablewrap"><table class="table">
      <thead><tr><th>File</th><th>Type</th></tr></thead><tbody>${rows}</tbody>
    </table></div>
  </div>
</section>
<section class="section">
  <div class="container prose">
    <h2>Where this subject appears</h2>
    <p>${esc(name)} is taught in ${sems.length ? sems.map(([l, h]) => `<a href="${h}">${esc(l)}</a>`).join(" &middot; ") : '<a href="/notes/">all semesters</a>'}.</p>
    <h2>Frequently asked questions</h2>
    ${faqHtml(faqs)}
    <p class="btnrow"><a class="btn btn--primary btn--lg" href="${drive}">Open ${esc(name)} files</a></p>
  </div>
</section>`,
  }));
  urls.push([url, "monthly", "0.7"]); written++;
}

// Sitemap
urls.unshift([`${SITE}/`, "weekly", "1.0"]);
for (const [p, pr] of [["about", "0.5"], ["faq", "0.5"], ["team", "0.4"], ["contact", "0.4"]])
  urls.push([`${SITE}/${p}`, "monthly", pr]);
fs.writeFileSync(path.join(BUILD, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + urls.map(([u, c, p]) => `  <url><loc>${u}</loc><changefreq>${c}</changefreq><priority>${p}</priority></url>`).join("\n")
  + `\n</urlset>\n`);

console.log(`  ✓ ${written} notes pages generated into build/ (sitemap: ${urls.length} urls)`);
