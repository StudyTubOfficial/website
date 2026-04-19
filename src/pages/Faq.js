import React from "react";
import FaqD from "../components/Faq/Faq";
import Navbar from "../components/Header/Navbar";
import Header from "../components/Multi_Header/Header";
import Footer from "../components/Footer/Footer";
import AdBanner from "../components/AdBanner/AdBanner";

const headerData = {
  page_title: "FAQ",
  page_description:
    "Answers to common questions about our services, policies, and how we can assist you.",
  details: "FAQ",
};

export default function Faq() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Header headerData={headerData} />
        <FaqD />
        <div className="container">
          <AdBanner
            title="🥗 Food for Thought & Body"
            description="Learn about proper study nutrition and find local restaurants offering student discounts."
            type="horizontal"
            size="small"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
