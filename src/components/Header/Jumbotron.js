import React from "react";
import "./header.css";
import Anch_button from "../Buttons/Anch_button/Anch_button";
export default function Jumbotron() {
  const SatisfiedData = [
    {
      img: "https://avatars.githubusercontent.com/u/62615392?v=4",
    },
    {
      img: "https://avatars.githubusercontent.com/u/25149022?v=4",
    },
    {
      img: "https://avatars.githubusercontent.com/u/66218496?v=4",
    },
    {
      img: "https://avatars.githubusercontent.com/u/63730038?v=4",
    },
    {
      img: "https://avatars.githubusercontent.com/u/88227246?v=4",
    },
  ];
  return (
    <main class="page_content">
      <section class="hero_banner style_1">
        <div class="container">
          <div class="content_wrap">
            <div class="row">
              <div class="col col-lg-7 d-n">
                <h1 class="banner_small_title">Learning Excellence</h1>
                <h2 class="banner_big_title">
                  Your BTECH Companion in the Digital Age
                </h2>
                <p class="banner_description">
                  Simplify your BTECH studies with StudyTub. Access high-quality
                  notes anytime, anywhere, on any device. Boost your academic
                  journey today!
                </p>
                <ul class="banner_btns_group unordered_list ">
                  <li>
                    <Anch_button
                      clas="btn btn_primary"
                      href="https://notes.studytub.workers.dev/0:/"
                      text1="Browse Notes"
                      text2="Read Notes"
                    />
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
                    <h3 class="wrap_title">1100+ Satisfied Students</h3>
                    <ul class="students_thumbnail unordered_list_center">
                      {SatisfiedData.map((item, index) => {
                        return (
                          <li key={item}>
                            <span>
                              <img src={item.img} alt="" />
                            </span>
                          </li>
                        );
                      })}
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
