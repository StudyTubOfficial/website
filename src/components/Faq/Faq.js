import React from "react";

export default function Faq() {
  const faqData = [
    {
      question: "What do Collab courses include?",
      answer:
        "Dictum non consectetur a erat. Odio morbi quis commodo odio aenean. Blandit libero volutpat sed cras ornare arcu. Tempus urna et pharetra pharetra. Enim ut sem viverra aliquet. Nisl vel pretium lectus quam id. Augue eget arcu dictum varius duis at consectetur. Egestas dui id ornare arcu. Nec ullamcorper sit amet risus nullam eget felis eget nunc.",
    },
    {
      question: "Do I have to start my course at a certain time?",
      answer:
        "Dictum non consectetur a erat. Odio morbi quis commodo odio aenean. Blandit libero volutpat sed cras ornare arcu. Tempus urna et pharetra pharetra. Enim ut sem viverra aliquet. Nisl vel pretium lectus quam id. Augue eget arcu dictum varius duis at consectetur. Egestas dui id ornare arcu. Nec ullamcorper sit amet risus nullam eget felis eget nunc.",
    },
    {
      question: "How do I take a Collab course?",
      answer:
        "Dictum non consectetur a erat. Odio morbi quis commodo odio aenean. Blandit libero volutpat sed cras ornare arcu. Tempus urna et pharetra pharetra. Enim ut sem viverra aliquet. Nisl vel pretium lectus quam id. Augue eget arcu dictum varius duis at consectetur. Egestas dui id ornare arcu. Nec ullamcorper sit amet risus nullam eget felis eget nunc.",
    },
    {
      question: "Do I receive anything after I complete a course?",
      answer:
        "Dictum non consectetur a erat. Odio morbi quis commodo odio aenean. Blandit libero volutpat sed cras ornare arcu. Tempus urna et pharetra pharetra. Enim ut sem viverra aliquet. Nisl vel pretium lectus quam id. Augue eget arcu dictum varius duis at consectetur. Egestas dui id ornare arcu. Nec ullamcorper sit amet risus nullam eget felis eget nunc.",
    },
    {
      question: "Where can I go for help?",
      answer:
        "Dictum non consectetur a erat. Odio morbi quis commodo odio aenean. Blandit libero volutpat sed cras ornare arcu. Tempus urna et pharetra pharetra. Enim ut sem viverra aliquet. Nisl vel pretium lectus quam id. Augue eget arcu dictum varius duis at consectetur. Egestas dui id ornare arcu. Nec ullamcorper sit amet risus nullam eget felis eget nunc.",
    },
  ];
  return (
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
              {faqData.map((item, i) => (
                <div class="accordion-item" key={i}>
                  <div
                    class="accordion-button"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse_${i}`}
                    aria-expanded="true"
                  >
                    {item.question}
                  </div>
                  <div
                    id={`collapse_${i}`}
                    class="accordion-collapse collapse show"
                    data-bs-parent="#faq_accordion"
                  >
                    <div class="accordion-body">
                      <p class="mb-0">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
