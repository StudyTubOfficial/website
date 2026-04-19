import React from "react";

export default function ProductHunt() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "0 0 48px" }}>
      <a
        href="https://www.producthunt.com/posts/studytub?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-studytub"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block" }}
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=350364&theme=light"
          alt="StudyTub on Product Hunt"
          style={{ width: 250, height: 54 }}
          width="250"
          height="54"
        />
      </a>
    </div>
  );
}
