import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header class="site_header site_header_1">
      <div class="container">
        <div class="row align-items-center">
          <div class="col col-lg-3 col-5">
            <div class="site_logo">
              <Link class="site_link" to="/">
                <img
                  src="assets/images/logo/logo.png"
                  alt="Collab - Online Learning Platform"
                  style={{ height: "70px" }}
                />
                <span>StudyTub</span>
              </Link>
            </div>
          </div>
          <div class="col col-lg-6 col-2">
            <nav class="main_menu navbar navbar-expand-lg">
              <div
                class="main_menu_inner collapse navbar-collapse justify-content-center"
                id="main_menu_dropdown"
              >
                <ul class="main_menu_list unordered_list_center">
                  <li>
                    <Link class="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link class="nav-link" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li class="dropdown">
                    <a
                      class="nav-link"
                      href="#"
                      id="pages_submenu"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="pages_submenu">
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li class="dropdown">
                        <a
                          class="nav-link"
                          href="#"
                          id="mentors_submenu"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Our Mentors
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="mentors_submenu"
                        >
                          <li>
                            <a href="mentor.html">Mentors</a>
                          </li>
                          <li>
                            <a href="mentor_details.html">Mentors Details</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="faq.html">F.A.Q.</a>
                      </li>
                      <li class="dropdown">
                        <a
                          class="nav-link"
                          href="#"
                          id="events_submenu"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Our Events
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="events_submenu"
                        >
                          <li>
                            <a href="event.html">Events</a>
                          </li>
                          <li>
                            <a href="event_details.html">Event Details</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="pricing.html">Pricing</a>
                      </li>
                      <li>
                        <a href="error.html">404 Error</a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a class="nav-link" href="contact.html">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="col col-lg-3 col-5">
            <ul class="header_btns_group unordered_list_end">
              <li>
                <button
                  class="mobile_menu_btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main_menu_dropdown"
                  aria-controls="main_menu_dropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i class="far fa-bars"></i>
                </button>
              </li>
              <li></li>
              <li>
                <a class="btn btn_dark" href="signup.html">
                  <span>
                    <small>Worker 🚀</small> <small>Lets go 🚀</small>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
