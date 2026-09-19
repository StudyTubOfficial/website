import React from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import "./courseCard.css";
import { gatedHref, handleDriveClick, isDriveLink, isLoggedIn } from "../../../utils/driveLink";

/**
 * A semester card on the homepage.
 *
 * Cards normally link to an on-site notes page, which lists what the semester
 * contains before sending the visitor on to the files. Those are internal, so
 * they open in the same tab and need no drive gate.
 *
 * A card pointing straight at the drive still works and is gated: signed-out
 * visitors go to /login first, and it opens in a new tab like any outbound link.
 */
const CourseCards = ({ item }) => {
  const external = isDriveLink(item.href);

  return (
    <a
      href={external ? gatedHref(item.href) : item.href}
      onClick={external ? handleDriveClick(item.href) : undefined}
      // Internal pages stay in the tab; only outbound drive links open a new one
      // (and not when the click is being diverted to the login page).
      target={external && isLoggedIn() ? "_blank" : undefined}
      // Set unconditionally: harmless on internal links, and eslint cannot
      // tell that it is already conditional on the same flag as target.
      rel="noopener noreferrer"
      className="course-card"
    >
      <div className="course-card__icon">
        <img src={item.img} alt={item.title} />
      </div>
      <div className="course-card__body">
        <h3 className="course-card__title">{item.title}</h3>
        <p className="course-card__desc">{item.description}</p>
      </div>
      <div className="course-card__footer">
        <span className="course-card__link">
          View Notes {external ? <FiExternalLink size={14} /> : <FiArrowRight size={14} />}
        </span>
      </div>
    </a>
  );
};

export default CourseCards;
