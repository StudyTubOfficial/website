import React from "react";
import { FiMail } from "react-icons/fi";

export default function AdBanner({
  title = "Promote With StudyTub",
  description = "Reach 4000+ students with your product or service.",
  type = "horizontal",
  size = "medium",
}) {
  const handleClick = () => {
    window.open(
      "mailto:studytub@nishikanta.in?subject=Advertisement Inquiry&body=Hi StudyTub Team,%0D%0A%0D%0AI am interested in advertising.%0D%0A%0D%0AThank you!",
      "_blank"
    );
  };

  return (
    <div className="container">
      <div className={`ad-banner ad-banner--${type} ad-banner--${size}`} onClick={handleClick}>
        <div className="ad-banner__inner">
          <span className="ad-banner__tag">AD</span>
          <div className="ad-banner__content">
            <h4 className="ad-banner__title">{title}</h4>
            <p className="ad-banner__desc">{description}</p>
          </div>
          <span className="ad-banner__cta">
            <FiMail size={16} /> Advertise with us
          </span>
        </div>
      </div>

      <style>{`
        .ad-banner {
          border: 1px dashed var(--border);
          border-radius: var(--radius-md);
          background: var(--bg-alt);
          margin: 24px 0;
          cursor: pointer;
          transition: all var(--transition);
          overflow: hidden;
        }
        .ad-banner:hover {
          border-color: var(--primary-light);
          background: var(--bg-alt);
        }
        .ad-banner__inner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
        }
        .ad-banner--horizontal .ad-banner__inner {
          flex-direction: row;
        }
        .ad-banner--square .ad-banner__inner,
        .ad-banner--vertical .ad-banner__inner {
          flex-direction: column;
          text-align: center;
        }
        .ad-banner__tag {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text);
          background: var(--bg-alt);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }
        .ad-banner__title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 4px;
        }
        .ad-banner__desc {
          font-size: 0.8rem;
          color: var(--text-light);
          margin: 0;
          line-height: 1.5;
        }
        .ad-banner__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          white-space: nowrap;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity var(--transition);
        }
        .ad-banner:hover .ad-banner__cta {
          opacity: 1;
        }
        .ad-banner--small { padding: 0; }
        .ad-banner--small .ad-banner__inner { padding: 12px 16px; }
        .ad-banner--small .ad-banner__title { font-size: 0.8rem; }
        .ad-banner--large .ad-banner__inner { padding: 24px; }
        .ad-banner--square {
          max-width: 280px;
          margin: 24px auto;
          aspect-ratio: 1;
        }
        .ad-banner--vertical {
          max-width: 200px;
          margin: 24px auto;
        }
        @media (max-width: 640px) {
          .ad-banner--horizontal .ad-banner__inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
