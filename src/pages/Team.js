import React from "react";

import Header from "../components/Multi_Header/Header";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import TeamD from "../components/Team/Team";
import AdBanner from "../components/AdBanner/AdBanner";
export default function Team() {
  const conatctData = {
    page_title: "Team",
    page_description:
      "Meet our talented team, a diverse group dedicated to delivering excellence in every project we undertake.",
    text_1: "Get Started",
    text_2: "Now",
    details: "Team",
  };
  return (
    <div className="page_wrapper">
      <Navbar />
      <main className="page_content">
        <Header headerData={conatctData} />
        <AdBanner 
          title="🍕 Food Delivery & Campus Dining"
          description="Partner with StudyTub to reach students with special meal coupons, healthy eating tips, and study-friendly food options."
          type="horizontal"
          size="medium"
        />
      </main>
      <TeamD />
      <div style={{ padding: '0 15px' }}>
        <AdBanner 
          title="🥪 Quick Bites for Quick Minds"
          description="Advertise your food stall with student discounts and educational content about balanced nutrition during exams."
          type="horizontal"
          size="small"
        />
      </div>
      <Footer />
    </div>
  );
}
