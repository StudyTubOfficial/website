import React from "react";
import { Link } from "react-router-dom";
export default function Anch_button({ clas, href, text1, text2 }) {
  return (
    <Link class={clas || ""} to={href || ""}>
      <span>
        <small>{text1 || ""}</small> <small>{text2 || ""}</small>
      </span>
    </Link>
  );
}
