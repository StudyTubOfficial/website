import React from "react";
import "./courseCard.css";
/**
 * Renders a course card component.
 *
 * @param {Object} item - The course item to be displayed.
 * @param {string} item.href - The URL of the course.
 * @param {string} item.img - The image source of the course.
 * @param {string} item.title - The title of the course.
 * @param {string} item.description - The description of the course.
 * @returns {JSX.Element} - The course card component.
 */
const CourseCards = ({ item }) => (
  <a href={item.href} rel="noopener noreferrer" target="_blank">
    <div className="service_item" data-magnetic>
      <div className="item_icon">
        <img src={item.img} alt="Collab – Online Learning Platform" />
      </div>
      <div className="item_content">
        <h3 className="item_title">{item.title}</h3>
        <p className="mb-0" style={{ color: "black" }}>
          {item.description}
        </p>
      </div>
      <div className="pad-2">
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-course"
        >
          Click Here
        </a>
      </div>
    </div>
  </a>
);

export default CourseCards;
