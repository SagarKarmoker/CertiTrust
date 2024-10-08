import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import WelcomePage from "./pages/WelcomePage";
import LearnerDashboard from "./pages/LearnerDashboard";
import IssuerDashboard from "./pages/IssuerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import config from "../config";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/learner-dashboard" element={<LearnerDashboard />} />
              <Route path="/issuer-dashboard" element={<IssuerDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/" element={<WelcomePage />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default App;
