import React from "react";
import { motion } from "framer-motion";
import NotesSearch from "../Search/NotesSearch";
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
const avatars = [
  "https://avatars.githubusercontent.com/u/62615392?v=4",
  "https://avatars.githubusercontent.com/u/25149022?v=4",
  "https://avatars.githubusercontent.com/u/66218496?v=4",
  "https://avatars.githubusercontent.com/u/63730038?v=4",
  "https://avatars.githubusercontent.com/u/88227246?v=4",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

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
          <motion.div className="hero__label" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            🎓 6,000+ students · 564 free notes &amp; papers
          </motion.div>

          <motion.h1 className="hero__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Find your BTECH notes <span>in seconds</span>
          </motion.h1>

          <motion.p className="hero__desc" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Handwritten class notes, previous year question papers and lab manuals for every
            semester and branch. Search by subject or subject code.
          </motion.p>

          <motion.div className="hero__search" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <NotesSearch />
          </motion.div>

          <motion.div className="hero__quick" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <span className="hero__quick-label">Popular</span>
            {QUICK.map(([label, href]) => (
              <a key={href} href={href} className="hero__chip">{label}</a>
            ))}
          </motion.div>

          <motion.div className="hero__social" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            <div className="hero__avatars">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="" width="34" height="34" loading="lazy" />
              ))}
            </div>
            <p><strong>6,000+</strong> students already studying here</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
