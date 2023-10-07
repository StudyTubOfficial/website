import React from "react";

export default function Dark_button({ text_1, text_2 }) {
  return (
    <button type="submit" class="btn btn_dark">
      <span>
        <small>{text_1}</small>
        <small>{text_2}</small>
      </span>
    </button>
  );
}
