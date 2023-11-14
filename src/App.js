import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import PrivateRoute from "./utils/PrivateRoute";
/**
 * Renders the main App component.
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <>
      <div className="backtotop">
        <a className="scroll">
          <i className="far fa-arrow-up"></i>
        </a>
      </div>
      <Routes>
        <Route element={<PrivateRoute />}>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/list" element={<UserList />} />
          <Route path="*" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
