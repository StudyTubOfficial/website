import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./header.css";

const semesterLinks = [
  { label: "1st Semester", href: "https://notes.studytub.workers.dev/0:/First%20Year/" },
  { label: "2nd Semester", href: "https://notes.studytub.workers.dev/0:/First%20Year/" },
  { label: "3rd Semester", href: "https://notes.studytub.workers.dev/0:/3rd%20Sem/" },
  { label: "4th Semester", href: "https://notes.studytub.workers.dev/0:/4th%20sem/" },
  { label: "5th Semester", href: "https://notes.studytub.workers.dev/0:/5th%20sem/" },
  { label: "6th Semester", href: "https://notes.studytub.workers.dev/0:/6th%20sem/" },
  { label: "7th Semester", href: "https://notes.studytub.workers.dev/0:/7th%20Sem/" },
  { label: "8th Semester", href: "https://notes.studytub.workers.dev/0:/8th%20Sem/" },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { label: "Study Materials", dropdown: true },
  { to: "/faq", label: "FAQ" },
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
            <img src="assets/images/logo/logo.png" alt="StudyTub" className="nav__logo-img" />
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
                        <a href={sem.href} target="_blank" rel="noopener noreferrer" className="nav__dropdown-link">
                          {sem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.to} className="nav__item">
                  <Link
                    to={link.to}
                    className={`nav__link ${location.pathname === link.to ? "nav__link--active" : ""}`}
                  >
                    {link.label}
                  </Link>
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
