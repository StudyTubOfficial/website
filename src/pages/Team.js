import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import TeamD from "../components/Team/Team";
import Header from "../components/Multi_Header/Header";
import AdBanner from "../components/AdBanner/AdBanner";

const headerData = {
  page_title: "Our Team",
  page_description:
    "Meet our talented team, a diverse group dedicated to delivering excellence.",
  details: "Team",
};

export default function Team() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Header headerData={headerData} />
        <TeamD />
        <div className="container">
          <AdBanner
            title="🍕 Food Delivery & Campus Dining"
            description="Partner with StudyTub to reach students with special meal coupons."
            type="horizontal"
            size="small"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
