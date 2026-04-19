import React from "react";

export default function Heading({ text }) {
  return (
    <div className="section__header" style={{ marginTop: 48 }}>
      <h2 className="section__title">{text}</h2>
    </div>
  );
}
