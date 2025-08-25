import React, { useState } from "react";
import "./StickyAd.css";

export default function StickyAd() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAdClick = () => {
    window.open('mailto:studytub1@gmail.com?subject=Sticky Ad Inquiry&body=Hi StudyTub Team,%0D%0A%0D%0AI am interested in your sticky advertisement placement.%0D%0A%0D%0APlease provide pricing and availability.%0D%0A%0D%0AThank you!', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="sticky_ad">
      <button className="sticky_ad_close" onClick={handleClose}>
        ✕
      </button>
      <div className="sticky_ad_content" onClick={handleAdClick}>
        <div className="sticky_ad_label">
          <span>📢 AD</span>
        </div>
        <div className="sticky_ad_text">
          <h4>Advertise Here</h4>
          <p>Reach 4000+ students</p>
          <span className="sticky_cta">Click to inquire</span>
        </div>
      </div>
    </div>
  );
}
