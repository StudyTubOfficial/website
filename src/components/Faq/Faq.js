import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqData = [
  {
    question: "What subjects are covered on StudyTub?",
    answer:
      "StudyTub offers a wide range of subjects, including engineering, computer science, mathematics, and more. We aim to support BTECH students with a diverse collection of notes.",
  },
  {
    question: "How much does StudyTub cost?",
    answer:
      "StudyTub offers both free and premium plans. While you can access almost all the resources for free, our premium plans provide additional features and resources at a minimal cost.",
  },
  {
    question: "Are the notes on StudyTub regularly updated?",
    answer:
      "Yes, we are committed to keeping our content up-to-date. Our notes and resources are continuously reviewed and updated to ensure that students have access to the most current information.",
  },
  {
    question: "Can I contribute my own notes to StudyTub?",
    answer:
      "Absolutely! We encourage students to contribute their own notes and share their knowledge with the StudyTub community. You can easily upload your notes to help fellow learners.",
  },
  {
    question: "Is there a community or discussion forum on StudyTub?",
    answer:
      "Yes, StudyTub has an active community and discussion forum where you can connect with other students, ask questions, and engage in discussions related to your studies.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button className="faq-item__question" onClick={onToggle}>
        <span>{item.question}</span>
        <FiChevronDown
          size={20}
          className={`faq-item__icon ${isOpen ? "faq-item__icon--open" : ""}`}
        />
      </button>
      <div className={`faq-item__answer ${isOpen ? "faq-item__answer--open" : ""}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {faqData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-item {
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          margin-bottom: 12px;
          overflow: hidden;
          transition: all var(--transition);
        }
        .faq-item--open {
          border-color: var(--primary-light);
          box-shadow: var(--shadow-sm);
        }
        .faq-item__question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 18px 20px;
          background: none;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
          text-align: left;
          gap: 16px;
          cursor: pointer;
        }
        .faq-item--open .faq-item__question {
          color: var(--primary);
        }
        .faq-item__icon {
          flex-shrink: 0;
          transition: transform var(--transition);
          color: var(--text-light);
        }
        .faq-item__icon--open {
          transform: rotate(180deg);
          color: var(--primary);
        }
        .faq-item__answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .faq-item__answer--open {
          max-height: 300px;
        }
        .faq-item__answer p {
          padding: 0 20px 18px;
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.7;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
