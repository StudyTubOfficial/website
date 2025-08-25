import React from "react";
import Navbar from "../components/Header/Navbar";
import Jumbotron from "../components/Header/Jumbotron";
import Analytics from "../components/Analytics/Analytics";
import Course from "../components/course/Course";
import Team from "../components/Team/Team";
import Footer from "../components/Footer/Footer";
import ProductHunt from "../components/Buttons/ProductHunt/ProductHunt";
import Heading from "../components/Heading/Heading";
import Promotion from "../components/Promotion/Promotion";
import ImageBanner from "../components/ImageBanner/ImageBanner";
import AdBanner from "../components/AdBanner/AdBanner";
import StickyAd from "../components/StickyAd/StickyAd";
export default function Home() {
  return (
    <div className="page_wrapper">
      <Navbar />
      <Jumbotron />
      <Analytics />
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
        type="square"
        size="small"
      />
      <Team />

      <Heading
        text={"Discover Us on Product Hunt!"}
        clss={"text-center"}
        clss2={12}
      />
      <ProductHunt />
      <Footer />
      <Promotion />
      <StickyAd />
    </div>
  );
}
