import React from "react";
import { motion } from "framer-motion";
import CourseCards from "../Cards/CourseCards/CourseCards";
import { FiArrowRight } from "react-icons/fi";

const allCourses = [
  {
    href: "https://notes.studytub.workers.dev/0:/First%20Year/",
    img: "assets/images/service/1st.svg",
    title: "1st Semester",
    description: "Where the BTECH journey begins! Dive into the fun world of fundamentals.",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/First%20Year/",
    img: "assets/images/service/2nd.svg",
    title: "2nd Semester",
    description: "Level up your knowledge and discover the secrets of your second semester.",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/3rd%20Sem/",
    img: "assets/images/service/3rd.svg",
    title: "3rd Semester",
    description: "Things are heating up! Explore advanced topics and conquer the third semester.",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/4th%20sem/",
    img: "assets/images/service/4th.svg",
    title: "4th Semester",
    description: "Halfway there! Uncover the excitement of your fourth semester adventures.",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/5th%20sem/",
    img: "assets/images/service/5th.svg",
    title: "5th Semester",
    description: "Ready to rock the fifth semester? Let's unravel the mysteries together!",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/6th%20sem/",
    img: "assets/images/service/6th.svg",
    title: "6th Semester",
    description: "Gear up for the sixth semester thrill ride and ace your engineering journey.",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/7th%20Sem/",
    img: "assets/images/service/7th.svg",
    title: "7th Semester",
    description: "It's the 'Lucky Number Seven' — where dreams take flight!",
  },
  {
    href: "https://notes.studytub.workers.dev/0:/8th%20Sem/",
    img: "assets/images/service/8th.svg",
    title: "8th Semester",
    description: "The final frontier! Prepare to graduate with flying colors.",
  },
];

export default function Course() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section__label">Study Materials</span>
          <h2 className="section__title">What's in Store at StudyTub?</h2>
          <p className="section__desc">
            Access comprehensive notes for every semester of your BTECH journey.
          </p>
        </motion.div>
        <div className="grid grid--4">
          {allCourses.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
            >
              <CourseCards item={item} />
            </motion.div>
          ))}
        </div>
        <motion.div
          style={{ textAlign: "center", marginTop: 40 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <a
            href="https://notes.studytub.workers.dev/0:/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
            Browse All Notes <FiArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
