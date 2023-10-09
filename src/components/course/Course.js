import React from "react";
import Anch_button from "../Buttons/Anch_button/Anch_button";
import CourseCards from "../Cards/CourseCards/CourseCards";

export default function Course() {
  const serviceData1 = [
    {
      href: "",
      img: "assets/images/service/1st.svg",
      title: "1st Semester",
      description:
        "Where the BTECH journey begins! Dive into the fun world of fundamentals.",
    },
    {
      href: "",
      img: "assets/images/service/2nd.svg",
      title: "2nd Semester",
      description:
        "Level up your knowledge and discover the secrets of your second semester",
    },
    {
      href: "",
      img: "assets/images/service/5th.svg",
      title: "Practical Skills",
      description:
        "Ready to rock the fifth semester? Let's unravel the mysteries together!",
    },
    {
      href: "",
      img: "assets/images/service/6th.svg",
      title: "6th Semester",
      description:
        "Gear up for the sixth semester thrill ride and ace your engineering journey.",
    },
  ];
  const serviceData2 = [
    {
      href: "",
      img: "assets/images/service/3rd.svg",
      title: "3rd Semester",
      description:
        "Things are heating up! Explore advanced topics and conquer the third semester.",
    },
    {
      href: "",
      img: "assets/images/service/4th.svg",
      title: "4th Semester",
      description:
        "Halfway there! Uncover the excitement of your fourth semester adventures.",
    },
    {
      href: "",
      img: "assets/images/service/7th.svg",
      title: "7th Semester",
      description:
        "It's the 'Lucky Number Seven' - where dreams take flight!",
    },
    {
      href: "",
      img: "assets/images/service/8th.svg",
      title: "8th Semester",
      description:
        "The final frontier! Prepare to graduate with flying colors in the eighth semester.",
    },
  ];
  return (
    <section class="expect_from_course section_space_lg">
      <div class="container">
        <div class="row">
          <div class="col col-lg-6">
            <div class="section_heading">
              <h2 class="heading_text">What's in Store at StudyTub?</h2>
            </div>
            <div class="row">
              {serviceData1.map((item, index) => {
                return (
                  <div class="col col-md-6">
                    <CourseCards item={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div class="col col-lg-6">
            <div class="btn_wrap pt-0 d-none d-lg-flex justify-content-end">
              <Anch_button
                clas="btn border_dark"
                href=""
                text1="Browse Notes"
                text2="Read Notes"
              />
            </div>
            <br />
            <div class="row pt-2">
              {serviceData2.map((item, index) => {
                return (
                  <div class="col col-md-6">
                    <CourseCards item={item} />
                  </div>
                );
              })}
            </div>
            <div class="btn_wrap pb-0 d-block d-lg-none text-center">
              <Anch_button
                clas="btn border_dark"
                href=""
                text1="Explore Courses"
                text2="Explore Courses"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
