import React from "react";
import "./analytics.css";
export default function Analytics() {
  return (
    <section class="counter_section bg_light section_space_md">
      <div class="container">
        <div class="row">
          <div class="col col-lg-3 col-md-6">
            <div class="counter_item">
              <h3 class="counter_value">
                <span class="counter_value_text">
                  500<span>+</span>
                </span>
              </h3>
              <p class="mb-0">Hours of hands-on learning in our courses</p>
            </div>
          </div>
          <div class="col col-lg-3 col-md-6">
            <div class="counter_item">
              <h3 class="counter_value">
                <span class="counter_value_text">
                  1500<span>+</span>
                </span>
              </h3>
              <p class="mb-0">Students Passed Our Competitions and Got a Job</p>
            </div>
          </div>
          <div class="col col-lg-3 col-md-6">
            <div class="counter_item">
              <h3 class="counter_value">
                <span class="counter_value_text">
                  25<span>/75</span>
                </span>
              </h3>
              <p class="mb-0">
                The Ratio of Theory and Practice in Each Course
              </p>
            </div>
          </div>
          <div class="col col-lg-3 col-md-6">
            <div class="counter_item">
              <h3 class="counter_value">
                <span class="counter_value_text">
                  40<span>+</span>
                </span>
              </h3>
              <p class="mb-0">
                We teach people from 4 continents and over 40 countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
