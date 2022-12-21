import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./comp/Login";
import SignUp from "./comp/Signup";
import Home from "./comp/Home";
import Dash from "./comp/Dash";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/dash" element={<Dash />} />
          <Route path="/signup/dash" element={<Dash />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
