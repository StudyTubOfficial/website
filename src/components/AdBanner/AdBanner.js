import React from "react";
import "./AdBanner.css";

export default function AdBanner({ 
  title = "Promote Your Food Stall & Restaurant", 
  description = "Reach hungry students with exclusive coupons and educational content partnerships.",
  type = "horizontal", // horizontal, square, vertical
  size = "medium" // small, medium, large
}) {
  const handleAdClick = () => {
    window.open('mailto:studytub1@gmail.com?subject=Food Stall & Restaurant Advertisement&body=Hi StudyTub Team,%0D%0A%0D%0AI am interested in promoting my food stall/restaurant to your student community.%0D%0A%0D%0APlease provide information about:%0D%0A- Coupon distribution programs%0D%0A- Student discount opportunities%0D%0A- Educational content partnerships%0D%0A- Advertising packages and rates%0D%0A%0D%0AThank you!', '_blank');
  };

  return (
    <div className={`ad_banner ${type} ${size}`} onClick={handleAdClick}>
      <div className="ad_content">
        <div className="ad_label">
          <span className="ad_tag">📢 AD</span>
        </div>
        <div className="ad_main">
          <h3 className="ad_title">{title}</h3>
          <p className="ad_description">{description}</p>
          <div className="ad_cta">
            <span className="cta_text">📧 Click to advertise with us!</span>
          </div>
        </div>
      </div>
      <div className="ad_overlay">
        <div className="overlay_content">
          <span className="email_icon">📧</span>
          <span className="contact_text">Contact for Ads</span>
        </div>
      </div>
    </div>
  );
}
