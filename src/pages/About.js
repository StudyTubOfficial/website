import React from "react";
import Header from "../components/About_Header/Header";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Team from "../components/Team/Team";

export default function About() {
  return (
    <div class="page_wrapper">
      <Navbar />
      <main class="page_content">
        <Header />
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
              <div class="col col-lg-3 col-md-6">
                <div class="iconbox_item">
                  <div class="title_wrap">
                    <div class="item_icon bg_dark">
                      <i class="fas fa-book-open"></i>
                    </div>
                    <h3 class="item_title mb-0">
                      <span class="d-block">Allocate the time </span>for study
                    </h3>
                  </div>
                  <p class="mb-0">
                    Etiam sit amet nisl purus in mollis nunc sed. Viverra nibh
                    cras pulvinar mattis nunc sed blandit libero volutpat
                  </p>
                </div>
              </div>
              <div class="col col-lg-3 col-md-6">
                <div class="iconbox_item">
                  <div class="title_wrap">
                    <div class="item_icon bg_dark">
                      <i class="fas fa-code-branch"></i>
                    </div>
                    <h3 class="item_title mb-0">
                      <span class="d-block">Alternative learning</span>formats
                    </h3>
                  </div>
                  <p class="mb-0">
                    Posuere ac ut consequat semper viverra nam libero justo.
                    Semper feugiat nibh sed pulvinar proin gravida hendrerit
                  </p>
                </div>
              </div>
              <div class="col col-lg-3 col-md-6">
                <div class="iconbox_item">
                  <div class="title_wrap">
                    <div class="item_icon bg_dark">
                      <i class="fas fa-comment-smile"></i>
                    </div>
                    <h3 class="item_title mb-0">
                      <span class="d-block">Mentors with over 5 </span>years of
                      experience
                    </h3>
                  </div>
                  <p class="mb-0">
                    Nunc sed velit dignissim sodales ut eu sem. Id faucibus nisl
                    tincidunt eget. Nunc non blandit massa enim
                  </p>
                </div>
              </div>
              <div class="col col-lg-3 col-md-6">
                <div class="iconbox_item">
                  <div class="title_wrap">
                    <div class="item_icon bg_dark">
                      <i class="fas fa-user-graduate"></i>
                    </div>
                    <h3 class="item_title mb-0">
                      <span class="d-block">Follow the Training </span>Program
                    </h3>
                  </div>
                  <p class="mb-0">
                    Tincidunt vitae semper quis lectus nulla at. Eget lorem
                    dolor sed viverra ipsum nunc. Tellus at urna condimentum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="counter_section bg_primary section_space_md">
          <div class="container">
            <div class="row">
              <div class="col col-lg-3 col-md-6">
                <div class="counter_item">
                  <h3 class="counter_value">
                    <span class="counter_value_text">500</span> <span>+</span>
                  </h3>
                  <p class="mb-0">Hours of hands-on learning in our courses</p>
                </div>
              </div>
              <div class="col col-lg-3 col-md-6">
                <div class="counter_item">
                  <h3 class="counter_value">
                    <span class="counter_value_text">1500</span> <span>+</span>
                  </h3>
                  <p class="mb-0">
                    Students Passed Our Competitions and Got a Job
                  </p>
                </div>
              </div>
              <div class="col col-lg-3 col-md-6">
                <div class="counter_item">
                  <h3 class="counter_value">
                    <span class="counter_value_text">25</span> <span>/75</span>
                  </h3>
                  <p class="mb-0">
                    The Ratio of Theory and Practice in Each Course
                  </p>
                </div>
              </div>
              <div class="col col-lg-3 col-md-6">
                <div class="counter_item">
                  <h3 class="counter_value">
                    <span class="counter_value_text">40</span> <span>+</span>
                  </h3>
                  <p class="mb-0">
                    We teach people from 4 continents and over 40 countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <Team />
        <section class="faq_section section_space_lg">
          <div class="container">
            <div class="section_heading text-center mb-3">
              <div class="row justify-content-center">
                <div class="col col-lg-7">
                  <h2 class="heading_text mb-0">
                    Popular Questions to Ask Before Choosing a Course
                  </h2>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col col-lg-10">
                <div class="accordion" id="faq_accordion">
                  <div class="accordion-item">
                    <div
                      class="accordion-button"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_one"
                      aria-expanded="true"
                    >
                      What do Collab courses include?
                    </div>
                    <div
                      id="collapse_one"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#faq_accordion"
                    >
                      <div class="accordion-body">
                        <p class="mb-0">
                          Dictum non consectetur a erat. Odio morbi quis commodo
                          odio aenean. Blandit libero volutpat sed cras ornare
                          arcu. Tempus urna et pharetra pharetra. Enim ut sem
                          viverra aliquet. Nisl vel pretium lectus quam id.
                          Augue eget arcu dictum varius duis at consectetur.
                          Egestas dui id ornare arcu. Nec ullamcorper sit amet
                          risus nullam eget felis eget nunc.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div
                      class="accordion-button collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_two"
                      aria-expanded="false"
                    >
                      Do I have to start my course at a certain time?
                    </div>
                    <div
                      id="collapse_two"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq_accordion"
                    >
                      <div class="accordion-body">
                        <p class="mb-0">
                          Dictum non consectetur a erat. Odio morbi quis commodo
                          odio aenean. Blandit libero volutpat sed cras ornare
                          arcu. Tempus urna et pharetra pharetra. Enim ut sem
                          viverra aliquet. Nisl vel pretium lectus quam id.
                          Augue eget arcu dictum varius duis at consectetur.
                          Egestas dui id ornare arcu. Nec ullamcorper sit amet
                          risus nullam eget felis eget nunc.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div
                      class="accordion-button collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_three"
                      aria-expanded="false"
                    >
                      How do I take a Collab course?
                    </div>
                    <div
                      id="collapse_three"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq_accordion"
                    >
                      <div class="accordion-body">
                        <p class="mb-0">
                          Dictum non consectetur a erat. Odio morbi quis commodo
                          odio aenean. Blandit libero volutpat sed cras ornare
                          arcu. Tempus urna et pharetra pharetra. Enim ut sem
                          viverra aliquet. Nisl vel pretium lectus quam id.
                          Augue eget arcu dictum varius duis at consectetur.
                          Egestas dui id ornare arcu. Nec ullamcorper sit amet
                          risus nullam eget felis eget nunc.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div
                      class="accordion-button collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_four"
                      aria-expanded="false"
                    >
                      Do I receive anything after I complete a course?
                    </div>
                    <div
                      id="collapse_four"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq_accordion"
                    >
                      <div class="accordion-body">
                        <p class="mb-0">
                          Dictum non consectetur a erat. Odio morbi quis commodo
                          odio aenean. Blandit libero volutpat sed cras ornare
                          arcu. Tempus urna et pharetra pharetra. Enim ut sem
                          viverra aliquet. Nisl vel pretium lectus quam id.
                          Augue eget arcu dictum varius duis at consectetur.
                          Egestas dui id ornare arcu. Nec ullamcorper sit amet
                          risus nullam eget felis eget nunc.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div
                      class="accordion-button collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_five"
                      aria-expanded="false"
                    >
                      Where can I go for help?
                    </div>
                    <div
                      id="collapse_five"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq_accordion"
                    >
                      <div class="accordion-body">
                        <p class="mb-0">
                          Dictum non consectetur a erat. Odio morbi quis commodo
                          odio aenean. Blandit libero volutpat sed cras ornare
                          arcu. Tempus urna et pharetra pharetra. Enim ut sem
                          viverra aliquet. Nisl vel pretium lectus quam id.
                          Augue eget arcu dictum varius duis at consectetur.
                          Egestas dui id ornare arcu. Nec ullamcorper sit amet
                          risus nullam eget felis eget nunc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
