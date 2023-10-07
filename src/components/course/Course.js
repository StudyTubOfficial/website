import React from "react";
import Anch_button from "../Buttons/Anch_button/Anch_button";

export default function Course() {
  const serviceData1 = [
    {
      href: "",
      img: "assets/images/service/1st.svg",
      title: "Knowledge",
      description:
        "Duis aute irure dolor in repreh in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    },
    {
      href: "",
      img: "assets/images/service/2nd.svg",
      title: "Unlimited access",
      description:
        "Libero nunc consequat interd varius sit amet mattis vulpute enim liquet sagittis",
    },
    {
      href: "",
      img: "assets/images/service/3rd.svg",
      title: "Practical Skills",
      description:
        "Vulputate enim nulla aliquet porttitor lacus luctus accums. Cras sed felis eget velit",
    },
    {
      href: "",
      img: "assets/images/service/4th.svg",
      title: "A certificate",
      description:
        "Excepteur sint occaecat cupid non proident, sunt in culpa qui officia deserunt",
    },
  ];
  const serviceData2 = [
    {
      href: "",
      img: "assets/images/service/5th.svg",
      title: "Knowledge",
      description:
        "Duis aute irure dolor in repreh in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    },
    {
      href: "",
      img: "assets/images/service/6th.svg",
      title: "Unlimited access",
      description:
        "Libero nunc consequat interd varius sit amet mattis vulpute enim liquet sagittis",
    },
    {
      href: "",
      img: "assets/images/service/7th.svg",
      title: "Practical Skills",
      description:
        "Vulputate enim nulla aliquet porttitor lacus luctus accums. Cras sed felis eget velit",
    },
    {
      href: "",
      img: "assets/images/service/8th.svg",
      title: "A certificate",
      description:
        "Excepteur sint occaecat cupid non proident, sunt in culpa qui officia deserunt",
    },
  ];
  return (
    <section class="expect_from_course section_space_lg">
      <div class="container">
        <div class="row">
          <div class="col col-lg-6">
            <div class="section_heading">
              <h2 class="heading_text">What to Expect from a Collab Course</h2>
            </div>
            <div class="row">
              {serviceData1.map((item, index) => {
                return (
                  <div class="col col-md-6">
                    <a href={item.href}>
                      <div class="service_item" data-magnetic>
                        <div class="item_icon">
                          <img
                            src={item.img}
                            alt="Collab – Online Learning Platform"
                          />
                        </div>
                        <div class="item_content">
                          <h3 class="item_title">{item.title}</h3>
                          <p class="mb-0" style={{ color: "black" }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
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
                text1="Explore Courses"
                text2="Explore Courses"
              />
            </div>
            <br />
            <div class="row pt-2">
              {serviceData2.map((item, index) => {
                return (
                  <div class="col col-md-6">
                    <a href={item.href}>
                      <div class="service_item" data-magnetic>
                        <div class="item_icon">
                          <img
                            src={item.img}
                            alt="Collab – Online Learning Platform"
                          />
                        </div>
                        <div class="item_content">
                          <h3 class="item_title">{item.title}</h3>
                          <p class="mb-0" style={{ color: "black" }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
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
