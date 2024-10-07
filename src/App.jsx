import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import WelcomePage from "./pages/WelcomePage";
import LearnerDashboard from "./pages/LearnerDashboard";
import IssuerDashboard from "./pages/IssuerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/issuer-dashboard" element={<IssuerDashboard />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
