import React from "react";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import "./header.css";

const avatars = [
  "https://avatars.githubusercontent.com/u/62615392?v=4",
  "https://avatars.githubusercontent.com/u/25149022?v=4",
  "https://avatars.githubusercontent.com/u/66218496?v=4",
  "https://avatars.githubusercontent.com/u/63730038?v=4",
  "https://avatars.githubusercontent.com/u/88227246?v=4",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" } }),
};

export default function Jumbotron() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <motion.div className="hero__label" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              🎓 Learning Excellence
            </motion.div>
            <motion.h1 className="hero__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              Your BTECH Companion in the <span>Digital Age</span>
            </motion.h1>
            <motion.p className="hero__desc" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              Simplify your BTECH studies with StudyTub. Access high-quality
              notes anytime, anywhere, on any device. Boost your academic
              journey today!
            </motion.p>
            <motion.div className="hero__actions" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <a href="/notes/" className="btn btn--primary btn--lg">
                Browse Notes
              </a>
              <a
                href="https://youtu.be/kzwfyEfJEW4?si=y11E80WV1KL2rwDC"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__play"
              >
                <span className="hero__play-icon">
                  <FiPlay size={18} />
                </span>
                Watch Video
              </a>
            </motion.div>
          </div>
          <motion.div
            className="hero__image"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <img
              src="assets/images/banner/hero_banner_img_1.jpg"
              alt="Students learning on StudyTub"
            />
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="hero__stat">
                <div className="hero__stat-avatars">
                  {avatars.map((url, i) => (
                    <img key={i} src={url} alt="" />
                  ))}
                </div>
                <div className="hero__stat-text">
                  4100+
                  <small>Satisfied Students</small>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
