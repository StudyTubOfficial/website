import React from "react";
import Navbar from "../components/Header/Navbar";
import Jumbotron from "../components/Header/Jumbotron";
import Analytics from "../components/Analytics/Analytics";
import Course from "../components/course/Course";
import Team from "../components/Team/Team";
import Footer from "../components/Footer/Footer";
import ProductHunt from "../components/Buttons/ProductHunt/ProductHunt";
import Snowfall from "react-snowfall";
import Heading from "../components/Heading/Heading";
export default function Home() {
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
      <Jumbotron />
      <Analytics />
      <Course />
      <Team />

      <Heading
        text={"Discover Us on Product Hunt!"}
        clss={"text-center"}
        clss2={12}
      />
      <ProductHunt />
      <Footer />
    </div>
  );
}
