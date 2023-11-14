import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const userThumb =
  "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png";
export default function Navbar() {
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    window.location.href = "/login";
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  return (
    <header className="site_header site_header_1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col col-lg-3 col-5">
            <div className="site_logo">
              <Link className="site_link" to="/">
                <img
                  src="assets/images/logo/logo.png"
                  alt="Collab - Online Learning Platform"
                  style={{ height: "70px" }}
                />
                <span className="logoo">StudyTub</span>
              </Link>
            </div>
          </div>
          <div className="col col-lg-6 col-2">
            <nav className="main_menu navbar navbar-expand-lg">
              <div
                className="main_menu_inner collapse navbar-collapse justify-content-center"
                id="main_menu_dropdown"
              >
                <ul className="main_menu_list unordered_list_center">
                  <li>
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li className="dropdown">
                    <a
                      className="nav-link"
                      id="pages_submenu"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Study Materials
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="pages_submenu"
                    >
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/First%20Year/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          First Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/First%20Year/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Second Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/3rd%20Sem/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Third Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/4th%20sem/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Fourth Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/5th%20sem/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Fifth Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/6th%20sem/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Sixth Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/7th%20Sem/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Seventh Semester
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://notes.studytub.workers.dev/0:/8th%20Sem/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Eighth Semester
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link className="nav-link" to="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col col-lg-3 col-5">
            <ul className="header_btns_group unordered_list_end">
              <li>
                <button
                  className="mobile_menu_btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main_menu_dropdown"
                  aria-controls="main_menu_dropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="far fa-bars"></i>
                </button>
              </li>
              <li></li>

              <li
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <div className="ml-auto">
                  <a
                    className=" dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={userThumb} // Make sure 'userThumb' is defined in your component
                      width="40"
                      height="40"
                      className="rounded-circle"
                      alt="User Thumbnail"
                    />
                    {userId && <span className="ml-2 username">{userId}</span>}
                  </a>

                  <div
                    className={`dropdown-menu dropdown-menu-right ${
                      isDropdownVisible ? "show" : ""
                    }`}
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a
                      onClick={handleLogout}
                      className="dropdown-item text-blackk"
                      href="#"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
