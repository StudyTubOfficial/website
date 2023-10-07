import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Multi_Header/Header";

export default function Contact() {
  return (
    <div class="page_wrapper">
      <Navbar />
      <main class="page_content">
        <Header />
        <section class="contact_section section_space_lg">
          <div class="container">
            <div class="row">
              <div class="col col-lg-5">
                <div class="pe-lg-5">
                  <div class="section_heading">
                    <h2 class="heading_text">Contact Us</h2>
                    <p class="heading_description mb-0">
                      Viverra maecenas accumsan lacus vel facilisis volutpat.
                      Faucibus purus in massa tempor nec feugiat nisl
                    </p>
                  </div>
                  <div class="iconbox_item contact_info_iconbox">
                    <div class="item_icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="item_content">
                      <h3 class="item_title">Call Us</h3>
                      <p class="mb-0">(101) 222 123 456</p>
                      <p class="mb-0">(102) 333 234 674</p>
                    </div>
                  </div>
                  <div class="iconbox_item contact_info_iconbox">
                    <div class="item_icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="item_content">
                      <h3 class="item_title">Email Address</h3>
                      <p class="mb-0">info-collab@example.com</p>
                      <p class="mb-0">collab-support@exapmple.com</p>
                    </div>
                  </div>
                  <div class="iconbox_item contact_info_iconbox">
                    <div class="item_icon">
                      <i class="fas fa-location-dot"></i>
                    </div>
                    <div class="item_content">
                      <h3 class="item_title">Reach Us</h3>
                      <p class="mb-0">31 Sunset Road, Gales Ferry,</p>
                      <p class="mb-0">6335 United States</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col col-lg-7">
                <div class="gmap_canvas">
                  <iframe
                    id="gmap_canvas_iframe"
                    src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                  ></iframe>
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
