import React from "react";

const CourseCards = ({ item }) => (
  <a href={item.href}>
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
    </div>
  </a>
);

export default CourseCards;
