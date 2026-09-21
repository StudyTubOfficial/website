import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Multi_Header/Header";
import AboutUscards from "../components/Cards/AboutusCards/AboutUscards";
import AdBanner from "../components/AdBanner/AdBanner";
import { FiArrowRight, FiCheck, FiTrendingUp } from "react-icons/fi";
import Seo, { breadcrumb } from "../components/Seo/Seo";

/**
 * Year-end student counts, with the current year running to date.
 *
 * The last bar is the same 6,000+ figure the homepage hero and the stats banner
 * quote. It was left at 4,500 when those were updated, so the About page was
 * quietly undercounting the site against itself.
 *
 * TOTAL drives both the "total" pill and the bar heights, so bumping the last
 * entry is enough to keep all three in step.
 */
const chartData = [
  { year: "2020", users: 50 },
  { year: "2021", users: 400 },
  { year: "2022", users: 1200 },
  { year: "2023", users: 2400 },
  { year: "2024", users: 3500 },
  { year: "2025", users: 4800 },
  { year: "2026", users: 6000 },
];

const TOTAL = chartData[chartData.length - 1].users;

const headerData = {
  page_title: "Our Story",
  page_description:
    "At StudyTub, we started in 2019 to empower BTECH students with high-quality study materials and make their education more accessible.",
  details: "About Us",
};

const features = [
  {
    icon: "fas fa-book-open",
    heading1: "We Add Sparkle to Study",
    details:
      "Learning doesn't have to be dull, and StudyTub knows it! We make education exciting.",
  },
  {
    icon: "fas fa-code-branch",
    heading1: "Premium Study Materials",
    details:
      "Your academic journey should be as smooth as butter. We provide high-quality notes.",
  },
  {
    icon: "fas fa-user-graduate",
    heading1: "Rewards for Stars",
    details:
      "We have special rewards for our top contributors. Shine bright like a star!",
  },
  {
    icon: "fas fa-code-branch",
    heading1: "Outsmarting Copycats",
    details:
      "We don't just beat the competition; we outsmart them with our winning formula.",
  },
];

const communityPerks = [
  "Share notes, gain insights, and collaborate with peers who share your passion.",
  "Contribute to the community by providing the latest notes and resources.",
  "Get a chance to win exciting goodies and certificates as a top contributor.",
];

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About StudyTub — Free Notes Built by Students"
        description="StudyTub collects the notes that usually circulate in one WhatsApp group and disappear. Free study materials for BTECH students, shared by the students who took the subject."
        jsonLd={breadcrumb([["StudyTub", "/"], ["About", "/about"]])}
      />
<div className="page-wrapper">
      <Navbar />
      <main>
        <Header headerData={headerData} />

        {/* Community Section */}
        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div
                className="growth-chart"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px 24px 20px",
                  boxShadow: "var(--shadow-md)",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <FiTrendingUp size={18} style={{ color: "var(--primary)" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>User Growth</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", background: "var(--bg-alt)", padding: "4px 10px", borderRadius: "var(--radius-full)" }}>{TOTAL.toLocaleString()}+ total</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180 }}>
                  {chartData.map((d) => (
                    <div key={d.year} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--primary)" }}>
                        {d.users >= 1000 ? `${(d.users / 1000).toFixed(1).replace(/\.0$/, "")}k` : d.users}
                      </span>
                      <div style={{
                        width: "100%",
                        maxWidth: 40,
                        height: `${(d.users / TOTAL) * 140 + 10}px`,
                        background: `linear-gradient(180deg, var(--primary), var(--primary-light))`,
                        borderRadius: "6px 6px 2px 2px",
                        transition: "height 0.6s ease",
                      }} />
                      <span style={{ fontSize: "0.65rem", fontWeight: 500, color: "var(--text-light)" }}>
                        {d.year.slice(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
              >
                <span className="section__label">Community</span>
                <h2 className="section__title" style={{ textAlign: "left" }}>Join Our Community!</h2>
                <p style={{ color: "var(--text-light)", lineHeight: 1.7, marginBottom: 24 }}>
                  Connect with like-minded individuals and enhance your educational journey.
                  Win exciting prizes and certificates!
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {communityPerks.map((perk, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.9rem", color: "var(--text-light)" }}>
                      <FiCheck size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://t.me/noteshare1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Join Community <FiArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section section--alt">
          <div className="container">
            <div className="section__header">
              <span className="section__label">Why StudyTub</span>
              <h2 className="section__title">What Makes StudyTub Stand Out?</h2>
            </div>
            <div className="grid grid--4">
              {features.map((item, i) => (
                <div
                  key={i}
                >
                  <AboutUscards
                    heading1={item.heading1}
                    details={item.details}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container" style={{ padding: "24px" }}>
          <AdBanner
            title="🍽️ Campus Food Partners Wanted"
            description="Join our food network and offer student discounts, meal coupons, and educational content."
            type="horizontal"
            size="medium"
          />
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .about-grid-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
    </>
  );
}
