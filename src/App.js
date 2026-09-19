import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";

// Home stays eager — it is the landing page and the most common entry. The
// rest are split out so a visitor who never opens them never downloads them.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const Faq = lazy(() => import("./pages/Faq"));
const Login = lazy(() => import("./pages/Login"));
/**
 * Renders the main App component.
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <>
      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
}

export default App;
