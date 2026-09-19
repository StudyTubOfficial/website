import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiYoutube, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { gatedHref, handleDriveClick, isDriveLink, isLoggedIn } from "../../utils/driveLink";

const footerLinks = [
  { label: "About", to: "/about" },
  { label: "Notes", href: "https://notes.studytub.workers.dev/0:/" },
  { label: "Team", to: "/team" },
  { label: "Community", href: "https://t.me/noteshare1" },
];

const supportLinks = [
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
];

const socials = [
  { icon: <FiGithub size={18} />, href: "https://github.com/StudyTubOfficial", label: "GitHub" },
  { icon: <FiYoutube size={18} />, href: "https://youtu.be/kzwfyEfJEW4?si=y11E80WV1KL2rwDC", label: "YouTube" },
  { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/company/study-tub/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="assets/images/logo/logo.png" alt="StudyTub" className="footer__logo-img" />
              <span>StudyTub</span>
            </Link>
            <p className="footer__tagline">
              Streamline BTECH studies. Quality notes, accessible anywhere.
              Elevate your academic journey today.
            </p>
            <div className="footer__socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__list">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <a
                  href={gatedHref(link.href)}
                  onClick={handleDriveClick(link.href)}
                  target={isDriveLink(link.href) && !isLoggedIn() ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__list">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Stay Updated</h4>
            <p className="footer__col-desc">
              Follow us on LinkedIn for the latest updates and resources.
            </p>
            <a
              href="https://www.linkedin.com/company/study-tub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--sm"
            >
              Follow Us <FiArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} StudyTub. All rights reserved.</p>
        </div>
      </motion.div>

      <style>{`
        .footer {
          background: var(--bg-dark);
          color: rgba(255, 255, 255, 0.7);
          padding: 64px 0 0;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 40px;
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
        }
        .footer__logo-img {
          height: 36px;
          width: auto;
        }
        .footer__tagline {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .footer__socials {
          display: flex;
          gap: 10px;
        }
        .footer__socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          transition: all var(--transition);
        }
        .footer__socials a:hover {
          background: var(--primary);
          color: white;
        }
        .footer__heading {
          color: white;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }
        .footer__list li {
          margin-bottom: 10px;
        }
        .footer__list a {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          transition: color var(--transition);
        }
        .footer__list a:hover {
          color: white;
        }
        .footer__col-desc {
          font-size: 0.875rem;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .footer__bottom {
          margin-top: 48px;
          padding: 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }
        .footer__bottom p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }
        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer__brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
