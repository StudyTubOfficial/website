import React from "react";

export default function ({ item }) {
  return (
    <a href={item.href}>
      <div class="service_item" data-magnetic>
        <div class="item_icon">
          <img src={item.img} alt="Collab – Online Learning Platform" />
        </div>
        <div class="item_content">
          <h3 class="item_title">{item.title}</h3>
          <p class="mb-0" style={{ color: "black" }}>
            {item.description}
          </p>
        </div>
      </div>
    </a>
  );
}
