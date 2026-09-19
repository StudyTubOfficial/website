import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiSearch, FiFolder, FiUploadCloud } from "react-icons/fi";
import "./imageBanner.css";

/**
 * Nexodrive pitch.
 *
 * Replaces a large promotional JPEG that carried its message as pixels: it was
 * unreadable to search engines and screen readers, did not scale down well, and
 * cost bandwidth on every homepage load. Same offer, as real text and markup.
 *
 * Copy follows the product's own description: a library management system built
 * on top of Google Drive — structured like a real library, instantly
 * searchable, clean to browse.
 */
const POINTS = [
  { icon: <FiFolder />, text: "Structured like a real library, not a folder tree" },
  { icon: <FiSearch />, text: "Instantly searchable across every file" },
  { icon: <FiUploadCloud />, text: "Built on the Google Drive you already have" },
];

export default function ImageBanner() {
  return (
    <section className="section section--alt">
      <div className="container">
        <motion.div
          className="pitch"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="pitch__body">
            <span className="pitch__label">Nexodrive · for colleges &amp; universities</span>
            <h2 className="pitch__title">
              A digital library for <span>your college</span>
            </h2>
            <p className="pitch__desc">
              Nexodrive turns the Google Drive you already use into a proper library:
              structured, instantly searchable and clean to browse — so students stop digging
              through folders the night before an exam. It is the engine behind StudyTub, and
              we will build it around your courses.
            </p>

            <ul className="pitch__points">
              {POINTS.map((p, i) => (
                <li key={i}>
                  <span className="pitch__point-icon">{p.icon}</span>
                  {p.text}
                </li>
              ))}
            </ul>

            <div className="pitch__actions">
              <a className="btn btn--primary btn--lg" href="mailto:studytub1@gmail.com?subject=Nexodrive%20for%20our%20college">
                <FiMail size={17} /> Talk to us
              </a>
              <a className="btn btn--outline btn--lg" href="/contact">
                Contact page <FiArrowRight size={16} />
              </a>
            </div>

            <p className="pitch__note">
              Or email <a href="mailto:studytub1@gmail.com">studytub1@gmail.com</a> directly.
            </p>
          </div>

          <div className="pitch__aside" aria-hidden="true">
            <div className="pitch__stat"><b>564</b><span>files served here</span></div>
            <div className="pitch__stat"><b>25</b><span>subjects indexed</span></div>
            <div className="pitch__stat"><b>6,000+</b><span>students using it</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
