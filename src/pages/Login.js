import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiArrowRight } from "react-icons/fi";

/**
 * Where to send the user after a successful login.
 *
 * Only same-origin paths and the notes drive are accepted. An open redirect —
 * following any ?redirect= value — would let someone send a StudyTub login link
 * that lands on a site they control, which is a credible phishing vector.
 */
function safeRedirect() {
  const raw = new URLSearchParams(window.location.search).get("redirect");
  if (!raw) return "/";
  try {
    const url = new URL(raw, window.location.origin);
    const allowed =
      url.origin === window.location.origin ||
      url.hostname === "notes.studytub.workers.dev";
    return allowed ? url.href : "/";
  } catch {
    return "/";
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email", { position: "top-center" });
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/auth/login`,
        { email }
      );
      if (res.status === 200) {
        toast.success("Login successful!", { position: "top-center" });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // Return the user to wherever they were headed. The static notes pages
        // send visitors here with ?redirect=<drive url> when they click through
        // to the files while signed out.
        window.location.href = safeRedirect();
      }
    } catch (err) {
      toast.error("Invalid email or password", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-logo">
          <img src="assets/images/logo/logo.png" alt="StudyTub" />
          <span>StudyTub</span>
        </Link>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Unlock Learning, Discover, Thrive Together.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <div className="login-field__icon">
              <FiMail size={18} />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-field__input"
            />
          </div>
          <button type="submit" className="btn btn--primary btn--lg" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Logging in..." : "Login Now"} <FiArrowRight size={16} />
          </button>
        </form>

        <p className="login-footer">
          © {new Date().getFullYear()} StudyTub. All rights reserved.
        </p>
      </div>
      <ToastContainer />

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--bg-alt) 0%, var(--bg) 40%, var(--bg-alt) 100%);
          padding: 24px;
        }
        .login-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px;
          max-width: 440px;
          width: 100%;
          text-align: center;
          box-shadow: var(--shadow-lg);
        }
        .login-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--primary);
          margin-bottom: 32px;
        }
        .login-logo img {
          height: 32px;
          width: auto;
        }
        .login-title {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .login-subtitle {
          color: var(--text-light);
          font-size: 0.9rem;
          margin-bottom: 32px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .login-field {
          display: flex;
          align-items: center;
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          transition: border-color var(--transition);
          overflow: hidden;
        }
        .login-field:focus-within {
          border-color: var(--primary);
        }
        .login-field__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          color: var(--text-light);
        }
        .login-field__input {
          flex: 1;
          padding: 14px 14px 14px 0;
          font-size: 0.95rem;
          background: none;
          color: var(--text);
        }
        .login-field__input::placeholder {
          color: var(--text-light);
        }
        .login-footer {
          margin-top: 32px;
          font-size: 0.75rem;
          color: var(--text-light);
        }
        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </div>
  );
}
