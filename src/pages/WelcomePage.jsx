import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';


function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-2">Welcome to CERTITRUST</h1>
      <p className="text-xl mb-8">
        Empowering the future of digital credentials.
      </p>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}

export default WelcomePage;
