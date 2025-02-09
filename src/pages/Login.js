import { React, useState } from "react";
import "./login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };

    if (email === "") {
      toast.error("Please enter email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    } else if (!email.includes("@")) {
      toast.error("Please enter valid email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}api/auth/login`, data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Login successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
          toast.error("Invalid email or password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
    }
  };
  return (
    <main className="page_content mobile_view page_banner ">
      <section className="register_section section_space_lg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col col-lg-5">
              <form>
                <div className="register_form signup_login_form fm">
                  <h1 className=" text-center">Login Here</h1>
                  <p className=" font-sz text-center">
                    Unlock Learning, Discover, Thrive Together.
                  </p>
                  <div className="form_item">
                    <input
                      type="email"
                      name="email"
                      placeholder="Please enter your Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="btn btn_dark mb-5"
                  >
                    <span>
                      <small>Login Now</small> <small>Login Now</small>
                    </span>
                  </button>

                  <p className=" login-footer text-center mb-0">
                    Copyright © 2023 || <b>Study Tub </b> . All rights reserved.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
