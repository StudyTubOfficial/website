import "./App.css";
import Analytics from "./components/Analytics/Analytics";
import Jumbotron from "./components/Header/Jumbotron";
import Navbar from "./components/Header/Navbar.js";
import Team from "./components/Team/Team";
import Course from "./components/course/Course";

function App() {
  return (
    <div className="page_wrapper">
      <Navbar />
      <Jumbotron />
      <Analytics />
      <Course />
      <Team />
    </div>
  );
}

export default App;
