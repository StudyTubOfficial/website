import React from "react";
import NotesSearch from "../Search/NotesSearch";
import ProductHunt from "../Buttons/ProductHunt/ProductHunt";
import "./header.css";

/**
 * Homepage hero.
 *
 * Search-first, single column. The previous layout gave half the viewport to a
 * stock photograph of a woman holding books, which told a visitor nothing about
 * what is here and pushed the actual entry point below the fold. People arrive
 * looking for one subject or one paper, so the search field is the hero.
 *
 * The avatar row stays: "4,100+ students" is a real trust signal and costs a
 * single small row rather than half the screen.
 */
// s=96 asks GitHub for a resized copy: these render at 34px, so the originals
// were 193 KiB of pixels nobody sees. 96 still covers a 2.8x display.
const avatars = [
  "https://avatars.githubusercontent.com/u/62615392?v=4&s=96",
  "https://avatars.githubusercontent.com/u/25149022?v=4&s=96",
  "https://avatars.githubusercontent.com/u/66218496?v=4&s=96",
  "https://avatars.githubusercontent.com/u/63730038?v=4&s=96",
  "https://avatars.githubusercontent.com/u/88227246?v=4&s=96",
];

/**
 * The hero used Framer Motion with initial="hidden" — opacity 0 until the
 * animation library loaded and ran. Lighthouse measured that as 2,860 ms of
 * LCP "element render delay" against 0 ms of network time: the text was there
 * the whole time, just invisible, waiting on JavaScript.
 *
 * It is a CSS animation now. The markup paints with the HTML and the fade is
 * decoration on top, so LCP no longer waits for a bundle to download.
 */
const step = (i) => ({ animationDelay: `${i * 80}ms` });

const QUICK = [
  ["First year", "/notes/first-year-engineering-notes.html"],
  ["Machine Learning", "/notes/7th-semester-btech-notes.html"],
  ["Circuit Theory", "/notes/subjects/circuit-theory.html"],
  ["Question papers", "/notes/subjects/"],
];

export default function Jumbotron() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container">
        <div className="hero__inner">
          <div className="hero__label fade-up" style={step(0)}>
            🎓 6,000+ students · 564 free notes &amp; papers
          </div>

          <h1 className="hero__title fade-up" style={step(1)}>
            Find your BTECH notes <span>in seconds</span>
          </h1>

          <p className="hero__desc fade-up" style={step(2)}>
            Handwritten class notes, previous year question papers and lab manuals for every
            semester and branch. Search by subject or subject code.
          </p>

          <div className="hero__search fade-up" style={step(3)}>
            <NotesSearch />
          </div>

          <div className="hero__quick fade-up" style={step(4)}>
            <span className="hero__quick-label">Popular</span>
            {QUICK.map(([label, href]) => (
              <a key={href} href={href} className="hero__chip">{label}</a>
            ))}
          </div>

          <div className="hero__social fade-up" style={step(5)}>
            <div className="hero__avatars">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="" width="34" height="34" loading="lazy" />
              ))}
            </div>
            <p><strong>6,000+</strong> students already studying here</p>
          </div>

          <div className="hero__ph fade-up" style={step(6)}>
            <ProductHunt />
          </div>
        </div>
      </div>
    </section>
  );
}
