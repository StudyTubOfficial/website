import React from "react";
import Dark_button from "../Buttons/Dark_button/Dark_button";

export default function Header({ headerData }) {
  return (
    <section class="page_banner">
      <div class="container">
        <div
          class="content_wrapper"
          style={{
            backgroundImage: "url(assets/images/banner/page_banner_image.png)",
          }}
        >
          <div class="row align-items-center">
            <div class="col col-lg-6">
              <ul class="breadcrumb_nav unordered_list">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="#!">Pages</a>
                </li>
                <li>About Us</li>
              </ul>
              <h1 class="page_title">{headerData.page_title || ""}</h1>
              <p class="page_description">
                {headerData.page_description || ""}
              </p>
              <form action="#">
                <div class="form_item mb-0">
                  <Dark_button
                    text_1={headerData.text_1 || ""}
                    text_2={headerData.text_2 || ""}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
