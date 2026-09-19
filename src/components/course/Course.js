import React from "react";
import CourseCards from "../Cards/CourseCards/CourseCards";
import { FiArrowRight } from "react-icons/fi";

// Each card links to its on-site notes page rather than straight to the drive.
// That page lists the subjects the semester actually contains and is crawlable
// by Google, which the client-rendered drive index is not. The page then links
// on to the files, so the drive is one click further rather than unreachable.
const allCourses = [
  {
    href: "/notes/first-year-engineering-notes.html",
    img: "/assets/images/service/1st.svg",
    title: "1st Semester",
    description: "Where the BTECH journey begins! Dive into the fun world of fundamentals.",
  },
  {
    href: "/notes/first-year-engineering-notes.html",
    img: "/assets/images/service/2nd.svg",
    title: "2nd Semester",
    description: "Level up your knowledge and discover the secrets of your second semester.",
  },
  {
    href: "/notes/3rd-semester-btech-notes.html",
    img: "/assets/images/service/3rd.svg",
    title: "3rd Semester",
    description: "Things are heating up! Explore advanced topics and conquer the third semester.",
  },
  {
    href: "/notes/4th-semester-btech-notes.html",
    img: "/assets/images/service/4th.svg",
    title: "4th Semester",
    description: "Halfway there! Uncover the excitement of your fourth semester adventures.",
  },
  {
    href: "/notes/5th-semester-btech-notes.html",
    img: "/assets/images/service/5th.svg",
    title: "5th Semester",
    description: "Ready to rock the fifth semester? Let's unravel the mysteries together!",
  },
  {
    href: "/notes/6th-semester-btech-notes.html",
    img: "/assets/images/service/6th.svg",
    title: "6th Semester",
    description: "Gear up for the sixth semester thrill ride and ace your engineering journey.",
  },
  {
    href: "/notes/7th-semester-btech-notes.html",
    img: "/assets/images/service/7th.svg",
    title: "7th Semester",
    description: "It's the 'Lucky Number Seven' — where dreams take flight!",
  },
  {
    href: "/notes/8th-semester-btech-notes.html",
    img: "/assets/images/service/8th.svg",
    title: "8th Semester",
    description: "The final frontier! Prepare to graduate with flying colors.",
  },
];

export default function Course() {
  return (
    <section className="section">
      <div className="container">
        <div
          className="section__header"
        >
          <span className="section__label">Study Materials</span>
          <h2 className="section__title">What's in Store at StudyTub?</h2>
          <p className="section__desc">
            Access comprehensive notes for every semester of your BTECH journey.
          </p>
        </div>
        <div className="grid grid--4">
          {allCourses.map((item, i) => (
            <div
              key={i}
            >
              <CourseCards item={item} />
            </div>
          ))}
        </div>
        <div
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <a href="/notes/" className="btn btn--outline">
            Browse All Notes <FiArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
