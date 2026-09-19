import React from "react";
import { FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";

const teamData = [
  {
    name: "Nishikanta Ray",
    image: "https://avatars.githubusercontent.com/u/62615392?v=4&s=320",
    designation: "Fullstack Developer",
    company: "LetsFlo",
    github: "https://github.com/NishikantaRay",
    linkedin: "https://www.linkedin.com/in/nishikantaray1/",
  },
  {
    name: "Sumeet Naik",
    image: "https://avatars.githubusercontent.com/u/25149022?v=4&s=320",
    designation: "Fullstack Developer",
    company: "McKinley Rice",
    github: "https://github.com/sumeetweb",
    linkedin: "https://www.linkedin.com/in/sumeetnaik19/",
  },
  {
    name: "Anirudh Panda",
    image: "https://avatars.githubusercontent.com/u/66218496?v=4&s=320",
    designation: "Tech & Content",
    company: "Curefit",
    github: "https://github.com/AnirudhPanda",
    linkedin: "https://www.linkedin.com/in/anirudhpanda/",
  },
];

export default function Team() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div
          className="section__header"
        >
          <span className="section__label">Our Team</span>
          <h2 className="section__title">Meet the Librarians</h2>
          <p className="section__desc">
            The passionate people behind StudyTub who make learning accessible for everyone.
          </p>
        </div>
        <div className="grid grid--3" style={{ maxWidth: 900, margin: "0 auto" }}>
          {teamData.map((member, i) => (
            <div
              className="team-card reveal"
              key={i}
            >
              <div className="team-card__avatar">
                <img src={member.image} alt={member.name} width="160" height="160" loading="lazy" />
              </div>
              <h3 className="team-card__name">{member.name}</h3>
              <p className="team-card__role">{member.designation}</p>
              <div className="team-card__company">
                <FiMapPin size={14} /> {member.company}
              </div>
              <div className="team-card__links">
                <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub size={18} />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .team-card {
          text-align: center;
          padding: 32px 24px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: all var(--transition);
        }
        .team-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
          border-color: var(--primary-light);
        }
        .team-card__avatar {
          width: 88px;
          height: 88px;
          margin: 0 auto 16px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--border);
          transition: border-color var(--transition);
        }
        .team-card:hover .team-card__avatar {
          border-color: var(--primary-light);
        }
        .team-card__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .team-card__name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .team-card__role {
          font-size: 0.875rem;
          color: var(--text-light);
          margin-bottom: 8px;
        }
        .team-card__company {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 16px;
        }
        .team-card__links {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .team-card__links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-alt);
          color: var(--text-light);
          transition: all var(--transition);
        }
        .team-card__links a:hover {
          background: var(--primary);
          color: white;
        }
      `}</style>
    </section>
  );
}
