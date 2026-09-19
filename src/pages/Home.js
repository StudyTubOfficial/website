import React from "react";
import Navbar from "../components/Header/Navbar";
import Jumbotron from "../components/Header/Jumbotron";
import Course from "../components/course/Course";
import Team from "../components/Team/Team";
import Footer from "../components/Footer/Footer";
import ProductHunt from "../components/Buttons/ProductHunt/ProductHunt";
import Heading from "../components/Heading/Heading";
import Promotion from "../components/Promotion/Promotion";
import Contribute from "../components/Contribute/Contribute";
import ImageBanner from "../components/ImageBanner/ImageBanner";
import AdBanner from "../components/AdBanner/AdBanner";
import StickyAd from "../components/StickyAd/StickyAd";
import Seo, { faqLd } from "../components/Seo/Seo";

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="StudyTub — Free BTECH Engineering Notes & Question Papers"
        description="Free engineering notes for BTECH students: every semester, every branch. Handwritten class notes, previous year question papers (2018-2023) and lab manuals for CSE, ECE, EEE and EIE. No payment, no premium tier."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "StudyTub",
          url: "https://studytub.netlify.app/",
          description: "Free study notes and previous year question papers for BTECH engineering students.",
          sameAs: ["https://github.com/StudyTubOfficial", "https://www.linkedin.com/company/study-tub/"],
        }}
      />
<div className="page-wrapper">
      <Navbar />
      <main>
        <Jumbotron />
        <Contribute />
        <ImageBanner />
        <AdBanner
          title="🍕 Hungry Students? Feed Them!"
          description="Promote your food stall or restaurant with exclusive student coupons and discounts."
          type="horizontal"
          size="medium"
        />
        <Course />
        <AdBanner
          title="📚 Food + Education Partnership"
          description="Combine delicious meals with educational content for the perfect student experience."
          type="horizontal"
          size="small"
        />
        <Team />
        <Heading text="Discover Us on Product Hunt!" />
        <ProductHunt />
      </main>
      <Footer />
      <Promotion />
      <StickyAd />
    </div>
    </>
  );
}
