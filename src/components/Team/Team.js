import React from "react";

export default function Team() {
  return (
    <section class="expect_from_course ">
      <div class="container">
        <div class="row">
          <div class="col col-lg-6">
            <div class="section_heading">
              <h2 class="heading_text">What to Expect from a Collab Course</h2>
            </div>
          </div>
        </div>
        <section class="mentor_section ">
          <div class="container">
            <div class="row">
              <div class="col col-lg-4 col-md-6">
                <div class="mentor_item">
                  <div class="mentor_image">
                    <a href="mentor_details.html">
                      <img
                        src="assets/images/mentor/mentor_image_4.jpg"
                        alt="Collab – Online Learning Platform"
                      />
                    </a>
                  </div>
                  <div class="mentor_content">
                    <h3 class="mentor_name">
                      <a href="mentor_details.html">Alex Edwards</a>
                    </h3>
                    <p class="mentor_designation">Fullstack developer</p>
                    <ul class="meta_info_list unordered_list_center mb-0">
                      <li>
                        <i class="fas fa-clock"></i> <span>120 Hours</span>
                      </li>
                      <li>
                        <i class="fas fa-star"></i>{" "}
                        <span>4.9 (22 reviews)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col col-lg-4 col-md-6">
                <div class="mentor_item">
                  <div class="mentor_image">
                    <a href="mentor_details.html">
                      <img
                        src="assets/images/mentor/mentor_image_5.jpg"
                        alt="Collab – Online Learning Platform"
                      />
                    </a>
                  </div>
                  <div class="mentor_content">
                    <h3 class="mentor_name">
                      <a href="mentor_details.html">Wendy Chandler</a>
                    </h3>
                    <p class="mentor_designation">Java Developer</p>
                    <ul class="meta_info_list unordered_list_center mb-0">
                      <li>
                        <i class="fas fa-clock"></i> <span>100 Hours</span>
                      </li>
                      <li>
                        <i class="fas fa-star"></i> <span>5 (10 reviews)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col col-lg-4 col-md-6">
                <div class="mentor_item">
                  <div class="mentor_image">
                    <a href="mentor_details.html">
                      <img
                        src="assets/images/mentor/mentor_image_6.jpg"
                        alt="Collab – Online Learning Platform"
                      />
                    </a>
                  </div>
                  <div class="mentor_content">
                    <h3 class="mentor_name">
                      <a href="mentor_details.html">James Grant</a>
                    </h3>
                    <p class="mentor_designation">Fullstack developer</p>
                    <ul class="meta_info_list unordered_list_center mb-0">
                      <li>
                        <i class="fas fa-clock"></i> <span>120 Hours</span>
                      </li>
                      <li>
                        <i class="fas fa-star"></i>{" "}
                        <span>4.9 (22 reviews)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
