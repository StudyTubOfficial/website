import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiDownload, FiBook, FiStar } from "react-icons/fi";
import "./analytics.css";

const stats = [
  { icon: <FiTrendingUp />, value: "4,200+", label: "Active Users" },
  { icon: <FiDownload />, value: "4,100+", label: "Downloads" },
  { icon: <FiBook />, value: "25/75", label: "Theory/Practice" },
  { icon: <FiStar />, value: "4.8", label: "User Rating" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Analytics() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              className="stat-card"
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              <div className="stat-card__icon">{stat.icon}</div>
              <h3 className="stat-card__value">{stat.value}</h3>
              <p className="stat-card__label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
