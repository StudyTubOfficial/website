import React from "react";

export default function ImageBanner() {
  const handleClick = () => {
    window.open("mailto:studytub@nishikanta.in", "_blank");
  };

  return (
    <section className="section section--alt">
      <div className="container">
        <div className="image-banner" onClick={handleClick}>
          <img
            src="/banner studytub.png"
            alt="StudyTub Advertisement"
            className="image-banner__img"
          />
          <div className="image-banner__overlay">
            <span className="btn btn--primary btn--sm">Contact for Ads</span>
          </div>
        </div>
      </div>

      <style>{`
        .image-banner {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: all var(--transition);
        }
        .image-banner:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .image-banner__img {
          width: 100%;
          display: block;
        }
        .image-banner__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.5);
          opacity: 0;
          transition: opacity var(--transition);
        }
        .image-banner:hover .image-banner__overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
