import React from "react";
import FaqD from "../components/Faq/Faq";
import Navbar from "../components/Header/Navbar";
import Header from "../components/Multi_Header/Header";
import Footer from "../components/Footer/Footer";
import AdBanner from "../components/AdBanner/AdBanner";
export default function Faq() {
  const conatctData = {
    page_title: "FAQ",
    page_description:
      "Answers to common questions about our services, policies, and how we can assist you. Find what you need quickly!",
    text_1: "Get Started",
    text_2: "Now",
    details: "FAQ",
  };
  return (
    <div className="page_wrapper">
      <Navbar />
      <main className="page_content">
        <Header headerData={conatctData} />
        <div style={{ padding: '0 15px', marginTop: '20px' }}>
          <AdBanner 
            title="🍽️ Campus Food Solutions"
            description="Got dining questions? Our food partners offer student meal plans, healthy choices, and educational resources about nutrition."
            type="horizontal"
            size="medium"
          />
        </div>
      </main>
      <FaqD /> 
      <div style={{ padding: '0 15px', marginBottom: '20px' }}>
        <AdBanner 
          title="🥗 Food for Thought & Body"
          description="Learn about proper study nutrition and find local restaurants offering student discounts and healthy meal options."
          type="horizontal"
          size="small"
        />
      </div> <Footer />
    </div>
  );
}
