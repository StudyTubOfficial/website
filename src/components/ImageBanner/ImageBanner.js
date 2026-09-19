import React from "react";
import { FiMail, FiArrowRight, FiSearch, FiFolder, FiUploadCloud } from "react-icons/fi";
import "./imageBanner.css";

/**
 * Nexodrive pitch.
 *
 * Replaces a large promotional JPEG that carried its message as pixels:
 * unreadable to search engines and screen readers, poor on small screens, and
 * 90 KB on every homepage load. Same offer as real text and markup.
 *
 * Built from the app's own components — .section--alt, .section__header, .card,
 * .badge, .grid, .btn — rather than a bespoke dark panel, so it matches the
 * rest of the site and follows any change to index.css.
 *
 * Copy follows the product's own description: a library management system on
 * top of Google Drive, structured like a real library and instantly searchable.
 */
const POINTS = [
  { icon: <FiFolder />, title: "Structured like a real library", text: "Courses, semesters and subjects — not a folder tree students have to guess their way through." },
  { icon: <FiSearch />, title: "Instantly searchable", text: "Every file findable by subject, subject code or name, in one field." },
  { icon: <FiUploadCloud />, title: "Built on your existing Drive", text: "No migration. Nexodrive sits on the Google Drive your college already uses." },
];

const STATS = [
  ["564", "files served here"],
  ["25", "subjects indexed"],
  ["6,000+", "students using it"],
];

const MAIL = "studytub1@gmail.com";

export default function ImageBanner() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Nexodrive</span>
          <h2 className="section__title">A digital library for your college</h2>
          <p className="section__desc">
            Nexodrive turns the Google Drive you already use into a proper library, so students
            stop digging through folders the night before an exam. It is the engine behind
            StudyTub, and we will build it around your courses.
          </p>
        </div>

        <div className="grid grid--3">
          {POINTS.map((p, i) => (
            <div
              className="card reveal"
              key={p.title}
            >
              <span className="pitch__icon">{p.icon}</span>
              <h3 className="pitch__card-title">{p.title}</h3>
              <p className="pitch__card-text">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="pitch__cta">
          <div className="pitch__stats">
            {STATS.map(([v, l]) => (
              <div className="pitch__stat" key={l}>
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>

          <div className="pitch__actions">
            <a
              className="btn btn--primary btn--lg"
              href={`mailto:${MAIL}?subject=${encodeURIComponent("Nexodrive for our college")}`}
            >
              <FiMail size={17} /> Talk to us
            </a>
            <a className="btn btn--outline btn--lg" href="/contact">
              Contact page <FiArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
