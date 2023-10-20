import React from "react";
import Header from "../components/Multi_Header/Header";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Team from "../components/Team/Team";
import Faq from "../components/Faq/Faq";
import Analytics from "../components/Analytics/Analytics";
import AboutUscards from "../components/Cards/AboutusCards/AboutUscards";
export default function About() {
  const headerData = {
    page_title: "About uss",
    page_description:
      "Egestas sed tempus urna et pharetra. Leo integer malesuada nunc vel. Libero id faucibus nisl tincidunt eget nullam non nisi.Faucibus turpis in eu mi bibendum neque egestas",
    text_1: "Get Started",
    text_2: "Now",
  };
  const serviceData1 = [
    {
      icon: "fas fa-book-open",
      heading1: "Allocate the time ",
      sub: "for study",
      details:
        "Etiam sit amet nisl purus in mollis nunc sed. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat",
    },
    {
      icon: "fas fa-code-branch",
      heading1: "Alternative learning",
      sub: "formats",
      details:
        "Posuere ac ut consequat semper viverra nam libero justo. Semper feugiat nibh sed pulvinar proin gravida hendrerit",
    },
    {
      icon: "fas fa-comment-smile",
      heading1: "Mentors with over 5 ",
      sub: "years of experience",
      details:
        "Nunc sed velit dignissim sodales ut eu sem. Id faucibus nisl tincidunt eget. Nunc non blandit massa enim",
    },
    {
      icon: "fas fa-user-graduate",
      heading1: "Follow the Training ",
      sub: "Program",
      details:
        "Tincidunt vitae semper quis lectus nulla at. Eget lorem dolor sed viverra ipsum nunc. Tellus at urna condimentum",
    },
  ];
  return (
    <div class="page_wrapper">
      <Navbar />
      <main class="page_content">
        <Header headerData={headerData} />
        <section class="courses_info_section section_space_lg pb-0">
          <div class="container">
            <div class="row align-items-center">
              <div class="col col-lg-6">
                <div class="image_widget">
                  <img
                    src="assets/images/about/about_image_2.jpg"
                    alt="Collab – Online Learning Platform"
                  />
                </div>
              </div>
              <div class="col col-lg-6">
                <div class="content_wrap ps-lg-3">
                  <div class="section_heading">
                    <h2 class="heading_text">
                      Supporting Student Learning in Your Course
                    </h2>
                    <p class="heading_description mb-0">
                      Rutrum tellus pellentesque eu tincidunt. Venenatis cras
                      sed felis eget velit aliquet sagittis id consectetur. Sit
                      amet porttitor eget dolor morbi
                    </p>
                  </div>
                  <ul class="info_list unordered_list_block">
                    <li>
                      <i class="fas fa-square"></i>{" "}
                      <span>
                        Learn in-demand skills with over 183,000 video courses
                      </span>
                    </li>
                    <li>
                      <i class="fas fa-square"></i>{" "}
                      <span>Choose courses taught by real-world experts</span>
                    </li>
                    <li>
                      <i class="fas fa-square"></i>{" "}
                      <span>
                        Learn at your own pace, with lifetime access on mobile
                        and desktop
                      </span>
                    </li>
                  </ul>
                  <div class="btn_wrap pb-0">
                    <a class="btn btn_dark" href="mentor.html">
                      <span>
                        <small>Our Mentors</small> <small>Our Mentors</small>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="policy_section section_space_lg">
          <div class="container position-relative">
            <div class="section_heading">
              <div class="row align-items-center justify-content-lg-between">
                <div class="col col-lg-6">
                  <h2 class="heading_text mb-0">
                    What to Expect from a Сollab Course
                  </h2>
                </div>
                <div class="col col-lg-4">
                  <p class="heading_description mb-0 text-lg-end">
                    Lobortis mattis aliquam faucibus purus in. Ultricies integer
                    quis auctor elit sed
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              {serviceData1.map((item) => (
                <AboutUscards
                  heading1={item.heading1}
                  sub={item.sub}
                  details={item.details}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </section>
        <Analytics />

        <br />
        <br />
        <Team />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
