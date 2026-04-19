import React, { useState, useEffect } from "react";
import { FiX, FiMail, FiChevronRight } from "react-icons/fi";

export default function Promotion() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="promo-overlay">
      <div className="promo-modal">
        <button className="promo-modal__close" onClick={() => setIsVisible(false)} aria-label="Close">
          <FiX size={20} />
        </button>

        <div className="promo-modal__icon">📢</div>
        <h2 className="promo-modal__title">Promote With StudyTub</h2>
        <p className="promo-modal__desc">
          Reach <strong>4,000+ active students</strong> with your product or service.
          StudyTub is a growing educational community — the perfect place for your brand.
        </p>

        <div className="promo-modal__features">
          <div className="promo-feature">🎓 Direct access to students</div>
          <div className="promo-feature">🚀 Education-focused audience</div>
          <div className="promo-feature">📈 Growing rapidly</div>
        </div>

        <div className="promo-modal__actions">
          <button
            className="btn btn--primary"
            onClick={() => window.open("mailto:studytub@nishikanta.in", "_blank")}
          >
            <FiMail size={16} /> Get Started
          </button>
          <button className="btn btn--ghost" onClick={() => setIsVisible(false)}>
            Maybe Later <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .promo-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        .promo-modal {
          background: var(--bg);
          border-radius: var(--radius-lg);
          padding: 40px;
          max-width: 480px;
          width: 100%;
          position: relative;
          text-align: center;
          animation: fadeInUp 0.3s ease;
        }
        .promo-modal__close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg-alt);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          transition: all var(--transition);
        }
        .promo-modal__close:hover {
          background: var(--border);
          color: var(--text);
        }
        .promo-modal__icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }
        .promo-modal__title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .promo-modal__desc {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .promo-modal__features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 28px;
        }
        .promo-feature {
          padding: 6px 14px;
          background: var(--bg-alt);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .promo-modal__actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
