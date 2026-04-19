import React, { useState } from "react";
import { FiX, FiMail } from "react-icons/fi";

export default function StickyAd() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky-ad">
      <button className="sticky-ad__close" onClick={() => setIsVisible(false)} aria-label="Close">
        <FiX size={14} />
      </button>
      <div
        className="sticky-ad__content"
        onClick={() =>
          window.open(
            "mailto:studytub@nishikanta.in?subject=Advertising Inquiry",
            "_blank"
          )
        }
      >
        <FiMail size={16} />
        <span className="sticky-ad__text">
          <strong>Advertise Here</strong> — Reach 4000+ students
        </span>
      </div>

      <style>{`
        .sticky-ad {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1500;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: fadeInUp 0.4s ease;
          max-width: 320px;
        }
        .sticky-ad__close {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          transition: all var(--transition);
        }
        .sticky-ad__close:hover {
          background: var(--bg-alt);
        }
        .sticky-ad__content {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: var(--text);
        }
        .sticky-ad__text {
          font-size: 0.85rem;
          line-height: 1.4;
        }
        .sticky-ad__text strong {
          font-weight: 700;
        }
        @media (max-width: 480px) {
          .sticky-ad {
            bottom: 16px;
            right: 16px;
            left: 16px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}
