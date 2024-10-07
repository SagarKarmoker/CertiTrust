import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-2">Welcome to CERTITRUST</h1>
      <p className="text-xl mb-8">
        Empowering the future of digital credentials.
      </p>
      <div>
        <Link
          to="/signup"
          className="px-6 py-3 rounded-md bg-white text-blue-600 font-medium mr-4 hover:bg-gray-100"
        >
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="px-6 py-3 rounded-md border border-white text-white font-medium hover:bg-white hover:text-blue-600"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
