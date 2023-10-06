import React from "react";
import "./header.css";
export default function Jumbotron() {
  return (
    <main class="page_content">
      <section class="hero_banner style_1">
        <div class="container">
          <div class="content_wrap">
            <div class="row">
              <div class="col col-lg-7 d-n">
                <h1 class="banner_small_title">Learning Excellence</h1>
                <h2 class="banner_big_title">
                  The Best Free Online Courses of All Time
                </h2>
                <p class="banner_description">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  fugiat nulla pariatur
                </p>
                <ul class="banner_btns_group unordered_list ">
                  <li>
                    <a class="btn btn_primary" href="course.html">
                      <span>
                        <small>Explore Courses</small>{" "}
                        <small>Explore Courses</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="video_play_btn text-white popup_video "
                      href="https://www.youtube.com/watch?v=7e90gBu4pas"
                    >
                      <span class="icon" data-magnetic>
                        <i class="fas fa-play"></i>
                      </span>{" "}
                      <span class="text">Watch video</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col col-lg-1"></div>
              <div class="col col-lg-4 ">
                <div class="banner_image_1 decoration_wrap d-n-b">
                  <div class="image_wrap ">
                    <img
                      src="assets/images/banner/hero_banner_img_1.jpg"
                      alt="Collab – Online Learning Platform"
                    />
                  </div>
                  <div class="satisfied_student">
                    <h3 class="wrap_title">1100+ Satisfied Student</h3>
                    <ul class="students_thumbnail unordered_list_center">
                      <li>
                        <span>
                          <img
                            src="assets/images/meta/student_thumbnail_1.png"
                            alt="Collab – Online Learning Platform"
                          />
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/images/meta/student_thumbnail_2.png"
                            alt="Collab – Online Learning Platform"
                          />
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/images/meta/student_thumbnail_3.png"
                            alt="Collab – Online Learning Platform"
                          />
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/images/meta/student_thumbnail_4.png"
                            alt="Collab – Online Learning Platform"
                          />
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/images/meta/student_thumbnail_5.png"
                            alt="Collab – Online Learning Platform"
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="deco_item shape_img_1"
                    data-parallax='{"y" : -130, "smoothness": 6}'
                  >
                    <img
                      src="assets/images/shape/shape_img_1.png"
                      alt="Collab – Online Learning Platform"
                    />
                  </div>
                  <div
                    class="deco_item shape_img_2"
                    data-parallax='{"y" : 160, "smoothness": 6}'
                  >
                    <img
                      src="assets/images/shape/shape_img_2.png"
                      alt="Collab – Online Learning Platform"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
