import React, { useState } from "react";
import "./PromotionBanner.css";

export default function PromotionBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section className="promotion_banner_section">
      <div className="container">
        <div className="promotion_banner_wrapper">
          <button className="promotion_banner_close" onClick={handleClose}>
            ✕
          </button>

          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="promotion_banner_content">
                <div className="promotion_banner_header">
                  <span className="promotion_banner_icon">📢</span>
                  <h2 className="promotion_banner_title">Promote With StudyTub</h2>
                </div>

                <p className="promotion_banner_description">
                  StudyTub isn't just a Digital Library — it's a growing student community with
                  <strong> 4000+ active users</strong>. If you have a product or service that helps
                  students, educators, or universities, this is the right place to reach your audience.
                </p>

                <div className="promotion_banner_features">
                  <div className="feature_item">
                    <span className="feature_icon">🎓</span>
                    <span>4000+ students & learners</span>
                  </div>
                  <div className="feature_item">
                    <span className="feature_icon">🚀</span>
                    <span>Education & tech focused</span>
                  </div>
                  <div className="feature_item">
                    <span className="feature_icon">📈</span>
                    <span>Growing rapidly</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="promotion_banner_cta">
                <p className="cta_highlight">
                  💡 Let's collaborate and take your product to the right audience!
                </p>
                <div className="promotion_banner_contact">
                  <span className="contact_label">📩 Contact us today:</span>
                  <a href="mailto:studytub@nishikanta.in" className="contact_email">
                    studytub@nishikanta.in
                  </a>
                </div>
                <div className="promotion_banner_actions">
                  <button
                    className="btn btn_primary"
                    onClick={() => window.open('mailto:studytub@nishikanta.in', '_blank')}
                  >
                    <span>
                      <small>Get Started</small>
                      <small>Contact Us</small>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
