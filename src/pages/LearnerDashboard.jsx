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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-semibold text-gray-900 my-6">
        Your Credentials
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {credentials.map((credential) => (
          <div
            key={credential.id}
            className="px-4 py-5 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-200"
          >
            {/* Credential Details */}
            <div>
              <div className="text-sm font-medium text-gray-500">
                Credential Type
              </div>
              <div className="mt-1 text-sm text-gray-900">
                {credential.type}
              </div>

              {/* Privacy controls: Name visibility */}
              <div className="text-sm font-medium text-gray-500 flex items-center">
                Name
                <button
                  className="ml-2 text-sm text-blue-500"
                  onClick={() => toggleVisibility(credential.id, "name")}
                >
                  <FontAwesomeIcon
                    icon={
                      credential.visibility.name ? faChevronUp : faChevronDown
                    }
                  />{" "}
                  {credential.visibility.name ? "Hide" : "Show"}
                </button>
              </div>
              {credential.visibility.name && (
                <div className="mt-1 text-sm text-gray-900">
                  {credential.name}
                </div>
              )}

              {/* Privacy controls: Institution visibility */}
              <div className="text-sm font-medium text-gray-500 flex items-center">
                Issuing Institution
                <button
                  className="ml-2 text-sm text-blue-500"
                  onClick={() => toggleVisibility(credential.id, "institution")}
                >
                  <FontAwesomeIcon
                    icon={
                      credential.visibility.institution
                        ? faChevronUp
                        : faChevronDown
                    }
                  />{" "}
                  {credential.visibility.institution ? "Hide" : "Show"}
                </button>
              </div>
              {credential.visibility.institution && (
                <div className="mt-1 text-sm text-gray-900">
                  {credential.institution}
                </div>
              )}

              {/* Privacy controls: Date Issued visibility */}
              <div className="text-sm font-medium text-gray-500 flex items-center">
                Date Issued
                <button
                  className="ml-2 text-sm text-blue-500"
                  onClick={() => toggleVisibility(credential.id, "dateIssued")}
                >
                  <FontAwesomeIcon
                    icon={
                      credential.visibility.dateIssued
                        ? faChevronUp
                        : faChevronDown
                    }
                  />{" "}
                  {credential.visibility.dateIssued ? "Hide" : "Show"}
                </button>
              </div>
              {credential.visibility.dateIssued && (
                <div className="mt-1 text-sm text-gray-900">
                  {credential.dateIssued}
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Status</div>
              <div className="mt-1 text-sm text-gray-900">
                {credential.status}
              </div>
              {credential.verificationDetails && (
                <div className="mt-1 text-sm text-gray-500">
                  Verified by: {credential.verificationDetails.verifiedBy} on{" "}
                  {credential.verificationDetails.verifiedOn}
                  <a
                    href={credential.verificationDetails.blockchainTx}
                    className="block text-blue-500 hover:text-blue-700"
                  >
                    View Verification
                  </a>
                </div>
              )}
              <a
                href={credential.blockchainUrl}
                className="text-blue-500 hover:text-blue-700"
              >
                View Credential on Blockchain
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              {credential.isPublic && (
                <QRCode value={credential.blockchainUrl} size={128} />
              )}
              <button
                onClick={() => toggleNotifications(credential.id)}
                className={`px-4 py-2 rounded text-sm ${
                  credential.notifications
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {credential.notifications
                  ? "Notifications: On"
                  : "Notifications: Off"}
              </button>
              <button
                onClick={() => togglePublic(credential.id)}
                className={`px-4 py-2 rounded text-sm ${
                  credential.isPublic
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {credential.isPublic ? "Private" : "Public"}
              </button>
              {credential.isPublic && (
                <button
                  onClick={() => revokeCredential(credential.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm"
                >
                  Revoke Credential
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      ;{/* Profile Management Section */}
      <div className="mt-6 bg-white p-4 shadow sm:rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Management
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="blockchainWallet"
                className="block text-sm font-medium text-gray-700"
              >
                Primary Blockchain Wallet
              </label>
              <input
                type="text"
                name="blockchainWallet"
                id="blockchainWallet"
                value={profile.blockchainWallet}
                onChange={updateProfile}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={updateProfile}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Adding Additional Wallets */}
          <div className="mt-4">
            <label
              htmlFor="newWallet"
              className="block text-sm font-medium text-gray-700"
            >
              Add Additional Wallet
            </label>
            <div className="flex space-x-4 mt-1">
              <input
                type="text"
                name="newWallet"
                id="newWallet"
                value={newWallet}
                onChange={(e) => setNewWallet(e.target.value)}
                className="flex-1 block w-full min-w-0 border border-gray-300 rounded-md shadow-sm p-2"
              />
              <button
                type="button"
                onClick={addAdditionalWallet}
                className="flex-shrink-0 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
              >
                Add Wallet
              </button>
            </div>
          </div>

          {/* Display Additional Wallets */}
          {profile.additionalWallets.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-700">
                Additional Wallets
              </h3>
              <ul className="mt-2 space-y-2">
                {profile.additionalWallets.map((wallet, index) => (
                  <li key={index} className="text-sm text-gray-900">
                    {wallet}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* LinkedIn Link */}
          <div className="mt-4">
            <label
              htmlFor="linkedIn"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LearnerDashboard;
