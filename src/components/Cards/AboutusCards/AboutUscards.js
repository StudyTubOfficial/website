import React from "react";

export default function AboutUscards({ heading1, sub, details, icon }) {
  return (
    <div class="col col-lg-3 col-md-6">
      <div class="iconbox_item">
        <div class="title_wrap">
          <div class="item_icon bg_dark">
            <i class={icon}></i>
          </div>
          <h3 class="item_title mb-0">
            <span class="d-block">{heading1} </span>
            {sub}
          </h3>
        </div>
        <p class="mb-0">{details}</p>
      </div>
    </div>
  );
}
