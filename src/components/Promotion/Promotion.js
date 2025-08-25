import React, { useState, useEffect } from "react";
import "./Promotion.css";

export default function Promotion() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Show the promotion modal after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-navigate to page 2 after showing page 1 briefly
    if (isVisible && currentPage === 1) {
      const autoNavigateTimer = setTimeout(() => {
        setCurrentPage(2);
      }, 2000); // Switch to page 2 after 3 seconds

      return () => clearTimeout(autoNavigateTimer);
    }
  }, [isVisible, currentPage]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    setCurrentPage(1);
  };

  if (!isVisible) return null;

  return (
    <div className="promotion_overlay">
      <div className="promotion_modal">
        <button className="promotion_close" onClick={handleClose}>
          ✕
        </button>
        
        <div className="promotion_header">
          <div className="page_indicator">
            <span className={`dot ${currentPage === 1 ? 'active' : ''}`}></span>
            <span className={`dot ${currentPage === 2 ? 'active' : ''}`}></span>
          </div>
        </div>

        {currentPage === 1 ? (
          // Page 1: General Promotion
          <div className="promotion_content">
            <div className="promotion_header">
              <span className="promotion_icon">📢</span>
              <h2 className="promotion_title">Promote With StudyTub</h2>
            </div>
            
            <div className="promotion_description">
              <p>
                StudyTub isn't just a Digital Library — it's a growing student community with 
                <strong> 4000+ active users</strong>.
              </p>
              <p>
                If you have a product or service that helps students, educators, or universities, 
                this is the right place to reach your audience.
              </p>
            </div>

            <div className="promotion_features">
              <h3>✨ Why Choose StudyTub?</h3>
              <ul className="features_list">
                <li>
                  <span className="feature_icon">🎓</span>
                  Direct access to 4000+ students & learners
                </li>
                <li>
                  <span className="feature_icon">🚀</span>
                  Niche audience focused on education & technology
                </li>
                <li>
                  <span className="feature_icon">📚</span>
                  Trusted platform built for academic growth
                </li>
                <li>
                  <span className="feature_icon">📈</span>
                  Growing rapidly every month
                </li>
              </ul>
            </div>

            <div className="promotion_cta">
              <p className="cta_text">
                💡 Let's collaborate and take your product to the right audience!
              </p>
              <div className="promotion_contact">
                <span className="contact_icon">📩</span>
                <span>Contact us today: </span>
                <a href="mailto:studytub1@gmail.com" className="contact_email">
                  studytub1@gmail.com
                </a>
              </div>
            </div>

            <div className="promotion_actions">
              <button className="btn btn_primary promotion_btn" onClick={() => window.open('mailto:studytub1@gmail.com', '_blank')}>
                <span>
                  <small>Get Started</small>
                  <small>Contact Us</small>
                </span>
              </button>
              <button className="btn_secondary promotion_btn" onClick={handleNextPage}>
                <span>
                  <small>Learn More</small>
                  <small>Digital Library</small>
                </span>
              </button>
              <button className="btn_unfill" onClick={handleClose}>
                <span>Maybe Later</span>
                <div className="btn_icon">
                  <i className="fal fa-arrow-right"></i>
                  <i className="fal fa-arrow-right"></i>
                </div>
              </button>
            </div>
          </div>
        ) : (
          // Page 2: Digital Library Features
          <div className="promotion_content">
            <div className="promotion_header">
              <span className="promotion_icon">📚</span>
              <h2 className="promotion_title">Introducing Digital Library by StudyTub 🚀</h2>
              <p className="promotion_subtitle">Your university's knowledge hub — anytime, anywhere.</p>
            </div>
            
            <div className="promotion_features">
              <h3>✨ Key Features:</h3>
              <div className="features_grid">
                <div className="feature_item">
                  <span className="feature_icon">✅</span>
                  <div className="feature_content">
                    <h4>Customized for Your University's Courses & Needs</h4>
                    <p>Tailored specifically to match your syllabus, ensuring students get exactly what they need.</p>
                  </div>
                </div>
                <div className="feature_item">
                  <span className="feature_icon">✅</span>
                  <div className="feature_content">
                    <h4>Easy Access to Study Materials, E-Books, and Notes</h4>
                    <p>Everything is just a click away, neatly organized for stress-free learning.</p>
                  </div>
                </div>
                <div className="feature_item">
                  <span className="feature_icon">✅</span>
                  <div className="feature_content">
                    <h4>Secure, Fast, and User-Friendly Design</h4>
                    <p>A platform that's safe, lightning-quick, and simple enough for everyone to use.</p>
                  </div>
                </div>
                <div className="feature_item">
                  <span className="feature_icon">✅</span>
                  <div className="feature_content">
                    <h4>Built to Empower Students and Educators Alike</h4>
                    <p>Supporting collaborative learning by giving both students and teachers the tools they need.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="promotion_cta">
              <p className="cta_text">
                🌐 Transform learning into a seamless digital experience with StudyTub Digital Library.
              </p>
              <div className="promotion_contact">
                <span className="contact_icon">📩</span>
                <span>Contact us today to get started: </span>
                <a href="mailto:studytub1@gmail.com" className="contact_email">
                  studytub1@gmail.com
                </a>
              </div>
            </div>

            <div className="promotion_actions">
              <button className="btn btn_primary promotion_btn" onClick={() => window.open('mailto:studytub1@gmail.com', '_blank')}>
                <span>
                  <small>Get Started</small>
                  <small>Contact Us</small>
                </span>
              </button>
              <button className="btn_secondary promotion_btn" onClick={handlePrevPage}>
                <span>
                  <small>Back</small>
                  <small>Promotion</small>
                </span>
              </button>
              <button className="btn_unfill" onClick={handleClose}>
                <span>Maybe Later</span>
                <div className="btn_icon">
                  <i className="fal fa-arrow-right"></i>
                  <i className="fal fa-arrow-right"></i>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
