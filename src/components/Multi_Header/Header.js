import React from "react";

export default function Header() {
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
              <h1 class="page_title">About Collab</h1>
              <p class="page_description">
                Egestas sed tempus urna et pharetra. Leo integer malesuada nunc
                vel. Libero id faucibus nisl tincidunt eget nullam non nisi.
                Faucibus turpis in eu mi bibendum neque egestas
              </p>
              <form action="#">
                <div class="form_item mb-0">
                  <input
                    type="search"
                    name="search"
                    placeholder="What do you want to learn ?"
                  />{" "}
                  <button type="submit" class="btn btn_dark">
                    <span>
                      <small>Search</small>
                      <small>Search</small>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
