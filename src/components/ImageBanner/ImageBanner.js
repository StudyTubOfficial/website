import React from "react";
import "./ImageBanner.css";

export default function ImageBanner() {
  const handleBannerClick = () => {
    window.open('mailto:studytub1@gmail.com', '_blank');
  };

  return (
    <section className="image_banner_section">
      <div className="container">
        <div className="image_banner_wrapper">
          <div className="banner_image" onClick={handleBannerClick}>
            <img 
              src="/banner studytub.png" 
              alt="StudyTub Banner Advertisement" 
              className="banner_img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
