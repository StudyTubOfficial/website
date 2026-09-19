import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./header.css";

const semesterLinks = [
// Point at the on-site notes pages rather than straight at the drive. Those
// pages describe what each semester contains, are crawlable by Google (the drive
// index renders client-side and is not), and link on to the drive themselves.
  { label: "1st Semester", href: "/notes/first-year-engineering-notes.html" },
  { label: "2nd Semester", href: "/notes/first-year-engineering-notes.html" },
  { label: "3rd Semester", href: "/notes/3rd-semester-btech-notes.html" },
  { label: "4th Semester", href: "/notes/4th-semester-btech-notes.html" },
  { label: "5th Semester", href: "/notes/5th-semester-btech-notes.html" },
  { label: "6th Semester", href: "/notes/6th-semester-btech-notes.html" },
  { label: "7th Semester", href: "/notes/7th-semester-btech-notes.html" },
  { label: "8th Semester", href: "/notes/8th-semester-btech-notes.html" },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { label: "Study Materials", dropdown: true },
  { to: "/faq", label: "FAQ" },
  // Anchors to the Contribute section on the homepage — the ask for more notes
  // needs a route from the nav, not just a card halfway down the page.
  { to: "/#contribute", label: "Add Notes" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container">
        <nav className="nav__inner">
          <Link to="/" className="nav__logo">
            <img src="/assets/images/logo/logo.png" alt="StudyTub" className="nav__logo-img" />
            <span className="nav__logo-text">StudyTub</span>
          </Link>

          <ul className={`nav__links ${mobileOpen ? "nav__links--open" : ""}`}>
            {navLinks.map((link) =>
              link.dropdown ? (
                <li
                  key={link.label}
                  className="nav__item nav__item--dropdown"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className="nav__link nav__link--dropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                  >
                    {link.label} <FiChevronDown size={16} />
                  </button>
                  <ul className={`nav__dropdown ${dropdownOpen ? "nav__dropdown--open" : ""}`}>
                    {semesterLinks.map((sem) => (
                      <li key={sem.label}>
                        <a href={sem.href} className="nav__dropdown-link">
                          {sem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.to} className="nav__item">
                  {link.to.includes("#") ? (
                    // React Router does not scroll to a hash on the current
                    // route; a plain anchor does, and needs no router at all.
                    <a href={link.to} className="nav__link">{link.label}</a>
                  ) : (
                    <Link
                      to={link.to}
                      className={`nav__link ${location.pathname === link.to ? "nav__link--active" : ""}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            )}
          </ul>

          <div className="nav__actions">
            <ThemeToggle />
            {user ? (
              <div
                className="nav__user"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button className="nav__user-btn">
                  <FiUser size={18} />
                  <span className="nav__user-name">{user.id}</span>
                </button>
                {userMenuOpen && (
                  <div className="nav__user-menu">
                    <button onClick={handleLogout} className="nav__user-menu-item">
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn--primary btn--sm">
                Login
              </Link>
            )}
            <button
              className="nav__toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
