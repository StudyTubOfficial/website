import React from "react";

export default function AboutUscards({ heading1, details, icon }) {
  return (
    <div className="card" style={{ height: "100%" }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-sm)",
          background: "var(--primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          marginBottom: 16,
        }}
      >
        <i className={icon}></i>
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{heading1}</h3>
      <p style={{ fontSize: "0.9rem", color: "var(--text-light)", margin: 0, lineHeight: 1.6 }}>
        {details}
      </p>
    </div>
  );
}
