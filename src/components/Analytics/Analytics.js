import React from "react";
import "./analytics.css";
export default function Analytics() {
  const analyticsData = [
    {
      id: 1,
      title: "Hours of hands-on learning in our courses",
      value1: "500",
      value2: "+",
    },
    {
      id: 2,
      title: "Students Passed Our Competitions and Got a Job",
      value1: "1500",
      value2: "+",
    },
    {
      id: 3,
      title: "The Ratio of Theory and Practice in Each Course",
      value1: "25",
      value2: "/75",
    },
    {
      id: 4,
      title: "We teach people from 4 continents and over 40 countries",
      value1: "40",
      value2: "+",
    },
  ];
  return (
    <section class="counter_section bg_light section_space_md">
      <div class="container">
        <div class="row">
          {analyticsData.map((item, index) => {
            return (
              <div class="col col-lg-3 col-md-6">
                <div class="counter_item">
                  <h3 class="counter_value">
                    <span class="counter_value_text">
                      {item.value1}
                      <span>{item.value2}</span>
                    </span>
                  </h3>
                  <p class="mb-0">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
