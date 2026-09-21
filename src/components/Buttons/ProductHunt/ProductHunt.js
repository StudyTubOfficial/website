import React from "react";

/**
 * Product Hunt badge.
 *
 * Lives in the hero, under the social-proof row, rather than at the foot of the
 * homepage where almost nobody scrolled to see it. It carries no layout of its
 * own so the surrounding section owns the spacing.
 */
export default function ProductHunt() {
  return (
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
  );
}
