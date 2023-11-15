import React, { useState, useEffect } from "react";
import Navbar from "../components/Header/Navbar";
import Header from "../components/Multi_Header/Header";
import Footer from "../components/Footer/Footer";
import "./userlist.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  const conatctData = {
    page_title: "USER LIST",
    page_description:
      "Explore our diverse community! Connect with fellow learners on our user list for shared insights and collaborative knowledge.",
    text_1: "Get Started",
    text_2: "Now",
    details: "User List",
  };
  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);

  const [userData, setUserData] = useState([]);

  const handelDelete = (email) => {
    const data = {
      email: email,
    };
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    if (email)
      axios
        .delete(`${process.env.REACT_APP_API_URL}api/auth/delete-user`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          data,
        })
        .then((res) => {
          toast.success("User deleted successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          GetAllUser();
        })
        .catch((err) => {
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
  };
  const GetAllUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/get-all-users`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetAllUser();
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(userData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }).map(
    (_, index) => index + 1
  );

  const displayPageNumbers = pageNumbers.slice(
    Math.max(0, currentPage - 2),
    Math.min(currentPage + 1, totalPages)
  );
  return (
    <div>
      <div className="page_wrapper">
        <Navbar />
        <main className="page_content">
          <Header headerData={conatctData} />
        </main>
        <div className="container" style={{ marginTop: "10vh" }}>
          <div class="table-responsive">
            {" "}
            <table className="table table-light ">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">User Id</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Action </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.id}</td>
                    <td>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-dark text-center"
                      >
                        {item.email}
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn_dark_hello"
                        style={{ backgroundColor: "#bb2124" }}
                        onClick={() => {
                          handelDelete(item.email);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <div
              className="pagination text-center"
              style={{ display: "inline-block" }}
            >
              <button className="btn btn_dark_hello" onClick={prevPage}>
                Previous
              </button>

              {displayPageNumbers.map((number) => (
                <button
                  className={`btn_dark_btnn ${
                    number === currentPage ? "active" : ""
                  }`}
                  key={number}
                  onClick={() => {
                    setCurrentPage(number);
                    paginate(number);
                  }}
                >
                  {number}
                </button>
              ))}
              <button className="btn btn_dark_hello" onClick={nextPage}>
                Next
              </button>
            </div>
            <p>Total page {totalPages}</p>
          </div>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
