import "./App.css";
import Jumbotron from "./components/Header/Jumbotron";
import Navbar from "./components/Header/Navbar.js";

function App() {
  return (
    <div className="page_wrapper">
      <Navbar />
      <Jumbotron />
    </div>
  );
}

export default App;
