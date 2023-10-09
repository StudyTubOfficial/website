import React from "react";

export default function Team() {
  const teamData = [
    {
      name: "Nishikanta Ray",
      image: "https://avatars.githubusercontent.com/u/62615392?v=4",
      designation: "Fullstack developer ",
      company: "LetsFlo",
      github: "https://github.com/NishikantaRay",
    },
    {
      name: "Sumeet Naik",
      image: "https://avatars.githubusercontent.com/u/25149022?v=4",
      designation: "Fullstack developer",
      company: "McKinley Rice",
      github: "https://github.com/sumeetweb",
    },
    {
      name: "Anirudh Panda",
      image: "https://avatars.githubusercontent.com/u/66218496?v=4",
      designation: "Tech & Content",
      company: "Inagiffy",
      github: "https://github.com/AnirudhPanda",
    },
  ];
  return (
    <section className="expect_from_course ">
      <div className="container">
        <div className="row">
          <div className="col col-lg-6">
            <div className="section_heading">
              <h2 className="heading_text">
              Meet the Dream Team Behind the Scenes!
              </h2>
            </div>
          </div>
        </div>
        <section className="mentor_section ">
          <div className="container">
            <div className="row">
              {teamData.map((item, index) => {
                return (
                  <div className="col col-lg-4 col-md-6">
                    <div className="mentor_item">
                      <div className="mentor_image">
                        <a href={item.github}>
                          <img
                            src={item.image}
                            alt="Collab – Online Learning Platform"
                          />
                        </a>
                      </div>
                      <div className="mentor_content">
                        <h3 className="mentor_name">
                          <a href="mentor_details.html">{item.name}</a>
                        </h3>
                        <p className="mentor_designation">{item.designation}</p>
                        <ul className="meta_info_list unordered_list_center mb-0">
                          <li>
                            <i className="fas fa-thumbtack"></i>{" "}
                            <span>{item.company}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
