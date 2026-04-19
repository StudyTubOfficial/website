import React from "react";
import { FiExternalLink } from "react-icons/fi";
import "./courseCard.css";

const CourseCards = ({ item }) => (
  <a href={item.href} target="_blank" rel="noopener noreferrer" className="course-card">
    <div className="course-card__icon">
      <img src={item.img} alt={item.title} />
    </div>
    <div className="course-card__body">
      <h3 className="course-card__title">{item.title}</h3>
      <p className="course-card__desc">{item.description}</p>
    </div>
    <div className="course-card__footer">
      <span className="course-card__link">
        View Notes <FiExternalLink size={14} />
      </span>
    </div>
  </a>
);

export default CourseCards;
