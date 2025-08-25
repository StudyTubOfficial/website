import React, { useState, useEffect } from "react";
import Navbar from "../components/Header/Navbar";
import Header from "../components/Multi_Header/Header";
import Footer from "../components/Footer/Footer";
import "./userlist.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdBanner from "../components/AdBanner/AdBanner";
export default function UserList() {
  const [authenticated, setAuthenticated] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
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
  const [totalData, setTotalData] = useState();

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
        setUserData(res.data.users);
        setTotalData(res.data.totalUsers);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetAllUser();
  }, []);

  // Logout function
  const handleLogout = () => {
    setAuthenticated(false);
    setId("");
    setPassword("");
    setLoginAttempts(0);
    toast.info("Logged out successfully.");
  };

  // Handle Enter key press for login
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

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
  const totalNumber = totalData;
  const pageNumbers = Array.from({ length: totalPages }).map(
    (_, index) => index + 1
  );

  const displayPageNumbers = pageNumbers.slice(
    Math.max(0, currentPage - 2),
    Math.min(currentPage + 1, totalPages)
  );
  const handleLogin = () => {
    // Check if account is locked due to too many failed attempts
    if (isLocked) {
      toast.error("Account temporarily locked. Please try again later.");
      return;
    }

    // Validate input fields
    if (!id.trim() || !password.trim()) {
      toast.error("Please enter both ID and password.");
      return;
    }

    const validId = process.env.REACT_APP_ADMIN_USER_ID;
    const validPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (id === validId && password === validPassword) {
      setAuthenticated(true);
      setLoginAttempts(0);
      toast.success("Login successful!");
      
      // Set session timeout (30 minutes)
      setTimeout(() => {
        setAuthenticated(false);
        toast.info("Session expired. Please login again.");
      }, 30 * 60 * 1000);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        toast.error("Too many failed attempts. Account locked for 5 minutes.");
        
        // Unlock after 5 minutes
        setTimeout(() => {
          setIsLocked(false);
          setLoginAttempts(0);
        }, 5 * 60 * 1000);
      } else {
        toast.error(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
      }
      
      // Clear password field
      setPassword("");
    }
  };

  if (!authenticated) {
    return (
      <div className="page_wrapper">
        <Navbar />
        <main className="page_content">
          <section className="register_section section_space_lg">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col col-lg-5">
                  <div className="register_form signup_login_form">
                    <h2 className="text-center mb-3">Admin Authentication</h2>
                    <p className="text-center mb-4">
                      Access to user list requires admin credentials
                    </p>
                    
                    <div className="form_item">
                      <input
                        type="text"
                        placeholder="Enter Admin ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLocked}
                        required
                      />
                    </div>
                    
                    <div className="form_item">
                      <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLocked}
                        required
                      />
                    </div>

                    {loginAttempts > 0 && !isLocked && (
                      <p className="text-center" style={{ color: '#ff4444', fontSize: '14px', marginBottom: '15px' }}>
                        {3 - loginAttempts} attempts remaining
                      </p>
                    )}

                    {isLocked && (
                      <p className="text-center" style={{ color: '#ff4444', fontSize: '14px', marginBottom: '15px' }}>
                        Account locked. Please wait 5 minutes.
                      </p>
                    )}

                    <button
                      onClick={handleLogin}
                      className="btn btn_dark"
                      style={{ width: '100%' }}
                      disabled={isLocked}
                    >
                      <span>
                        <small>Login</small>
                        <small>Access Admin Panel</small>
                      </span>
                    </button>

                    <p className="text-center mt-4 mb-0" style={{ fontSize: '14px', color: '#666' }}>
                      Authorized personnel only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    );
  }
  return (
    <div>
      <div className="page_wrapper">
        <Navbar />
        <main className="page_content">
          <Header headerData={conatctData} />
          <div style={{ padding: '0 15px', marginTop: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <AdBanner 
                title="🍕 Food Partnerships with StudyTub"
                description="Connect your restaurant or food stall with our hungry student community. Offer educational nutrition content and exclusive coupons!"
                type="horizontal"
                size="large"
              />
            </div>
          </div>
        </main>
        <div className="container" style={{ marginTop: "10vh" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>User Management Panel</h3>
            <button 
              onClick={handleLogout}
              className="btn btn_warning"
              style={{ minWidth: '120px' }}
            >
              <span>
                <small>Logout</small>
                <small>Sign Out</small>
              </span>
            </button>
          </div>
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
                        className="text-dark text-center">
                        {item.email}
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn_dark_hello"
                        style={{ backgroundColor: "#bb2124" }}
                        onClick={() => {
                          handelDelete(item.email);
                        }}>
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
              style={{ display: "inline-block" }}>
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
                  }}>
                  {number}
                </button>
              ))}
              <button className="btn btn_dark_hello" onClick={nextPage}>
                Next
              </button>
            </div>
            <p>Total page {totalPages}</p>
            <p>Total {totalNumber}</p>
          </div>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
