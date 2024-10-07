import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// Mocked data for educational credentials and user profile
const initialCredentials = [
  {
    id: 1,
    type: "Diploma",
    name: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    dateIssued: "2021-06-15",
    status: "Verified",
    blockchainUrl: "https://blockchain.com/tx/123",
    isPublic: false,
    notifications: true,
    visibility: {
      name: true,
      institution: true,
      dateIssued: true,
    },
    verificationDetails: {
      verifiedBy: "University of Technology",
      verifiedOn: "2021-07-01",
      blockchainTx: "https://blockchain.com/tx/abc123",
    },
  },
  {
    id: 2,
    type: "Certificate",
    name: "Certified Data Analyst",
    institution: "Data Science Academy",
    dateIssued: "2022-08-20",
    status: "Pending Verification",
    blockchainUrl: "https://blockchain.com/tx/456",
    isPublic: true,
    notifications: true,
    visibility: {
      name: true,
      institution: true,
      dateIssued: true,
    },
    verificationDetails: null,
  },
  {
    id: 3,
    type: "Badge",
    name: "AI Fundamentals",
    institution: "Online Learning Platform",
    dateIssued: "2023-01-10",
    status: "Verified",
    blockchainUrl: "https://blockchain.com/tx/789",
    isPublic: false,
    notifications: false,
    visibility: {
      name: true,
      institution: true,
      dateIssued: true,
    },
    verificationDetails: {
      verifiedBy: "AI Certification Board",
      verifiedOn: "2023-02-15",
      blockchainTx: "https://blockchain.com/tx/def456",
    },
  },
];

function LearnerDashboard() {
  const [credentials, setCredentials] = useState([]);
  const [profile, setProfile] = useState({
    blockchainWallet: "0xABC123DEF456...",
    additionalWallets: [],
    email: "learner@example.com",
    linkedIn: "",
  });
  const [newWallet, setNewWallet] = useState(""); // for adding additional wallets

  useEffect(() => {
    // Simulate fetching data
    setCredentials(initialCredentials);

    // Simulate a notification for a newly issued credential
    setTimeout(() => {
      toast.success("A new badge has been issued: 'Blockchain Basics'");
    }, 2000);
  }, []);

  const addAdditionalWallet = () => {
    if (newWallet) {
      setProfile((prev) => ({
        ...prev,
        additionalWallets: [...prev.additionalWallets, newWallet],
      }));
      setNewWallet("");
      toast.success("New wallet added successfully!");
    }
  };

  const togglePublic = (id) => {
    setCredentials(
      credentials.map((cred) => {
        if (cred.id === id) {
          return { ...cred, isPublic: !cred.isPublic };
        }
        return cred;
      })
    );
    const cred = credentials.find((cred) => cred.id === id);
    toast(
      `${
        cred.isPublic
          ? "Credential was made private"
          : "Credential was made public"
      }`,
      { icon: cred.isPublic ? "🔒" : "🔓" }
    );
  };

  const toggleNotifications = (id) => {
    setCredentials(
      credentials.map((cred) => {
        if (cred.id === id) {
          return { ...cred, notifications: !cred.notifications };
        }
        return cred;
      })
    );
    const cred = credentials.find((cred) => cred.id === id);
    toast(
      `${
        cred.notifications
          ? "Notifications turned off"
          : "Notifications turned on"
      }`,
      { icon: cred.notifications ? "🔕" : "🔔" }
    );
  };

  const toggleVisibility = (id, field) => {
    setCredentials(
      credentials.map((cred) => {
        if (cred.id === id) {
          return {
            ...cred,
            visibility: {
              ...cred.visibility,
              [field]: !cred.visibility[field],
            },
          };
        }
        return cred;
      })
    );
    toast(`${field} visibility toggled.`);
  };

  const revokeCredential = (id) => {
    setCredentials(
      credentials.map((cred) => {
        if (cred.id === id) {
          return { ...cred, isPublic: false };
        }
        return cred;
      })
    );
    toast.error(`Credential ${id} was revoked.`);
  };

  const updateProfile = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-gray-900 my-8">
        Your Credentials
      </h1>
      <div className="bg-white shadow-2xl overflow-hidden rounded-3xl">
        {credentials.map((credential) => (
          <div
            key={credential.id}
            className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-gray-200"
          >
            {/* Credential Details */}
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  Credential Type
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {credential.type}
                </div>
              </div>

              {/* Privacy controls: Name visibility */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-500">Name</div>
                <button
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition ease-in-out duration-200"
                  onClick={() => toggleVisibility(credential.id, "name")}
                >
                  <FontAwesomeIcon
                    icon={
                      credential.visibility.name ? faChevronUp : faChevronDown
                    }
                  />
                  <span>{credential.visibility.name ? "Hide" : "Show"}</span>
                </button>
              </div>
              {credential.visibility.name && (
                <div className="pl-6 text-lg font-medium text-gray-900">
                  {credential.name}
                </div>
              )}

              {/* Privacy controls: Institution visibility */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-500">
                  Issuing Institution
                </div>
                <button
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition ease-in-out duration-200"
                  onClick={() => toggleVisibility(credential.id, "institution")}
                >
                  <FontAwesomeIcon
                    icon={
                      credential.visibility.institution
                        ? faChevronUp
                        : faChevronDown
                    }
                  />
                  <span>
                    {credential.visibility.institution ? "Hide" : "Show"}
                  </span>
                </button>
              </div>
              {credential.visibility.institution && (
                <div className="pl-6 text-lg font-medium text-gray-900">
                  {credential.institution}
                </div>
              )}

              {/* Privacy controls: Date Issued visibility */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-500">
                  Date Issued
                </div>
                <button
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition ease-in-out duration-200"
                  onClick={() => toggleVisibility(credential.id, "dateIssued")}
                >
                  <FontAwesomeIcon
                    icon={
                      credential.visibility.dateIssued
                        ? faChevronUp
                        : faChevronDown
                    }
                  />
                  <span>
                    {credential.visibility.dateIssued ? "Hide" : "Show"}
                  </span>
                </button>
              </div>
              {credential.visibility.dateIssued && (
                <div className="pl-6 text-lg font-medium text-gray-900">
                  {credential.dateIssued}
                </div>
              )}
            </div>

            <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
              {/* Status Section */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="text-lg font-semibold text-gray-900">
                  {credential.status}
                </div>
              </div>

              {/* Verification Details */}
              {credential.verificationDetails && (
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-medium text-gray-700">
                    Verified by:
                    <span className="text-gray-900">
                      {" "}
                      {credential.verificationDetails.verifiedBy}
                    </span>
                    on{" "}
                    <span className="text-gray-900">
                      {credential.verificationDetails.verifiedOn}
                    </span>
                  </div>
                  <a
                    href={credential.verificationDetails.blockchainTx}
                    className="inline-block text-blue-600 hover:text-blue-800 transition ease-in-out duration-200"
                  >
                    View Verification
                  </a>
                </div>
              )}

              {/* Blockchain Credential Link */}
              <a
                href={credential.blockchainUrl}
                className="inline-block text-blue-600 hover:text-blue-800 transition ease-in-out duration-200"
              >
                View Credential on Blockchain
              </a>
            </div>

            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg">
              {/* QR Code for Public Credential */}
              {credential.isPublic && (
                <div className="flex justify-center">
                  <QRCode value={credential.blockchainUrl} size={128} />
                </div>
              )}

              {/* Toggle Notifications Button */}
              <button
                onClick={() => toggleNotifications(credential.id)}
                className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition ease-in-out duration-200 ${
                  credential.notifications
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {credential.notifications
                  ? "Notifications: On"
                  : "Notifications: Off"}
              </button>

              {/* Toggle Public/Private Button */}
              <button
                onClick={() => togglePublic(credential.id)}
                className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition ease-in-out duration-200 ${
                  credential.isPublic
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {credential.isPublic ? "Private" : "Public"}
              </button>

              {/* Revoke Credential Button (visible when Public) */}
              {credential.isPublic && (
                <button
                  onClick={() => revokeCredential(credential.id)}
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 transition ease-in-out duration-150"
                >
                  Revoke Credential
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Profile Management Section */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Profile Management
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="blockchainWallet"
                className="block text-sm font-semibold text-gray-700"
              >
                Primary Blockchain Wallet
              </label>
              <input
                type="text"
                name="blockchainWallet"
                id="blockchainWallet"
                value={profile.blockchainWallet}
                onChange={updateProfile}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={updateProfile}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>
          </div>

          {/* Adding Additional Wallets */}
          <div className="mt-6">
            <label
              htmlFor="newWallet"
              className="block text-sm font-semibold text-gray-700"
            >
              Add Additional Wallet
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="text"
                name="newWallet"
                id="newWallet"
                value={newWallet}
                onChange={(e) => setNewWallet(e.target.value)}
                className="flex-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
              <button
                type="button"
                onClick={addAdditionalWallet}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Wallet
              </button>
            </div>
          </div>

          {/* Display Additional Wallets */}
          {profile.additionalWallets.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Additional Wallets
              </h3>
              <ul className="mt-3 space-y-3">
                {profile.additionalWallets.map((wallet, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-900 bg-gray-100 p-3 rounded-lg shadow"
                  >
                    {wallet}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* LinkedIn Link */}
          <div className="mt-6">
            <label
              htmlFor="linkedIn"
              className="block text-sm font-semibold text-gray-700"
            >
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedIn"
              id="linkedIn"
              value={profile.linkedIn}
              onChange={updateProfile}
              placeholder="https://www.linkedin.com/in/username"
              className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LearnerDashboard;
