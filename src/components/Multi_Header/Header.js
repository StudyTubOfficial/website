import React from "react";
import { Link } from "react-router-dom";

export default function Header({ headerData }) {
  return (
    <section className="page-header">
      <div className="container">
        <nav className="page-header__breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{headerData.details}</span>
        </nav>
        <h1 className="page-header__title">{headerData.page_title}</h1>
        <p className="page-header__desc">{headerData.page_description}</p>
      </div>
    </section>
  );
}
