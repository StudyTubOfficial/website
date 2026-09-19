import React from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiEdit3, FiUsers, FiMail, FiArrowRight } from "react-icons/fi";
import "./contribute.css";

/**
 * Contribute notes.
 *
 * StudyTub is built from notes students share, but until now there was no route
 * for anyone to offer more — the drive is read-only to visitors and the contact
 * page says nothing about contributing. This is the missing ask.
 *
 * Three paths because they are genuinely different people with different sized
 * offers: one student with a subject folder, a class rep with a semester, and a
 * college wanting its whole library carried.
 */
const WAYS = [
  {
    icon: <FiUploadCloud />,
    title: "Share your notes",
    text: "Handwritten notes, solved papers or lab records for any subject. Send a drive link or the files themselves.",
    cta: "Send notes",
    subject: "Adding notes to StudyTub",
    body: "Subject / semester:%0D%0AUniversity:%0D%0ALink or files:%0D%0A",
  },
  {
    icon: <FiEdit3 />,
    title: "Fix something",
    text: "Wrong file in a folder, a paper from the wrong year, or a subject we have mislabelled. Tell us and we will correct it.",
    cta: "Report a problem",
    subject: "Correction to StudyTub notes",
    body: "Page or folder:%0D%0AWhat is wrong:%0D%0A",
  },
  {
    icon: <FiUsers />,
    title: "Add your college",
    text: "Have a full set for a university we do not cover yet? We will organise it and set up the pages for your syllabus.",
    cta: "Talk to us",
    subject: "Adding our college to StudyTub",
    body: "College / university:%0D%0ABranches and semesters:%0D%0AWhat you have:%0D%0A",
  },
];

const MAIL = "studytub1@gmail.com";

export default function Contribute() {
  return (
    <section className="section" id="contribute">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Contribute</span>
          <h2 className="section__title">Got notes worth sharing?</h2>
          <p className="section__desc">
            Everything here was shared by students who took the subject. Any college can add
            theirs &mdash; we organise the files and build the pages.
          </p>
        </div>

        <div className="grid grid--3">
          {WAYS.map((w, i) => (
            <motion.div
              className="card contribute-card"
              key={w.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
            >
              <span className="pitch__icon">{w.icon}</span>
              <h3 className="pitch__card-title">{w.title}</h3>
              <p className="pitch__card-text">{w.text}</p>
              <a
                className="contribute-card__cta"
                href={`mailto:${MAIL}?subject=${encodeURIComponent(w.subject)}&body=${w.body}`}
              >
                {w.cta} <FiArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="contribute-foot">
          <FiMail size={17} aria-hidden="true" />
          <p>
            Prefer to just write? Email <a href={`mailto:${MAIL}`}>{MAIL}</a> or use the{" "}
            <a href="/contact">contact page</a>. Credit goes to whoever shared the notes.
          </p>
        </div>
      </div>
    </section>
  );
}
