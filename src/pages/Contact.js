import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Multi_Header/Header";
import AdBanner from "../components/AdBanner/AdBanner";
import { FiMail, FiMapPin } from "react-icons/fi";

const headerData = {
  page_title: "Contact Us",
  page_description:
    "Questions or feedback? Get in touch with us for prompt assistance.",
  details: "Contact",
};

export default function Contact() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Header headerData={headerData} />
        <section className="section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>Get In Touch</h2>
                <p style={{ color: "var(--text-light)", lineHeight: 1.7, marginBottom: 32 }}>
                  Feel free to contact us for any inquiries or assistance. We look forward to hearing from you!
                </p>
                <div className="contact-item">
                  <div className="contact-item__icon">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Email</h4>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem", margin: 0 }}>
                      studytub@nishikanta.in
                    </p>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem", margin: 0 }}>
                      support@nishikanta.in
                    </p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Location</h4>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem", margin: 0 }}>
                      Bhubaneswar, Odisha, India
                    </p>
                  </div>
                </div>
              </div>
              <div className="contact-map">
                <iframe
                  title="StudyTub Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.52297962956!2d85.82045315!3d20.300884149999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1697908955915!5m2!1sen!2sin"
                  style={{ width: "100%", height: "100%", minHeight: 360, border: 0, borderRadius: "var(--radius-md)" }}
                  loading="lazy"
                />
              </div>
            </div>
            <div style={{ marginTop: 32 }}>
              <AdBanner
                title="🍜 Restaurant Owners & Food Entrepreneurs"
                description="Connect with 4000+ hungry students!"
                type="horizontal"
                size="medium"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 48px;
          align-items: start;
        }
        .contact-item {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .contact-item__icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--bg-alt);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
