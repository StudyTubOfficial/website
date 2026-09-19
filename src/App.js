import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
/**
 * Renders the main App component.
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <>
      <Routes>
        {/* Public. These pages describe what StudyTub is and are the pages
            search engines and first-time visitors land on — gating them behind
            a login meant Googlebot saw a redirect and nothing was indexable.
            The notes FILES are still gated: the drive links ask for a login. */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />

        {/* Anything signed-in-only goes inside this wrapper. */}
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Catch-all last, so it cannot shadow the routes above. */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
