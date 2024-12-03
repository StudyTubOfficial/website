import React from "react";
import FaqD from "../components/Faq/Faq";
import Navbar from "../components/Header/Navbar";
import Header from "../components/Multi_Header/Header";
import Footer from "../components/Footer/Footer";
import Snowfall from "react-snowfall";
export default function Faq() {
  const conatctData = {
    page_title: "FAQ",
    page_description:
      "Answers to common questions about our services, policies, and how we can assist you. Find what you need quickly!",
    text_1: "Get Started",
    text_2: "Now",
    details: "FAQ",
  };
  const snowflakeCount = 413;
  const minSpeed = 1.5;
  const maxSpeed = 3.0;
  const minWind = -0.5;
  const maxWind = 2;
  const minRadius = 2;
  const maxRadius = 4;
  return (
    <div className="page_wrapper">
      <Snowfall
        snowflakeCount={snowflakeCount}
        speed={[minSpeed, maxSpeed]}
        wind={[minWind, maxWind]}
        radius={[minRadius, maxRadius]}
      />
      <Navbar />
      <main className="page_content">
        <Header headerData={conatctData} />
      </main>
      <FaqD /> <Footer />
    </div>
  );
}
