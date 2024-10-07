import React, { useState } from "react";

// Mock data for credential verification
const mockCredentials = [
  {
    id: 1,
    learnerWallet: "0xABC123",
    issuer: "University of Technology",
    course: "Bachelor of Science in Computer Science",
    dateCompleted: "2021-06-15",
    status: "Verified",
    sensitive: true, // Indicates sensitive credential
  },
  {
    id: 2,
    learnerWallet: "0xDEF456",
    issuer: "Data Science Academy",
    course: "Certified Data Analyst",
    dateCompleted: "2022-08-20",
    status: "Verified",
    sensitive: false, // Non-sensitive credential
  },
  {
    id: 3,
    learnerWallet: "0xGHI789",
    issuer: "Online Learning Platform",
    course: "AI Fundamentals",
    dateCompleted: "2023-01-10",
    status: "Pending Verification",
    sensitive: true, // Indicates sensitive credential
  },
];

function EmployerDashboard() {
  const [credentialId, setCredentialId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [credentialData, setCredentialData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [batchResults, setBatchResults] = useState([]);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [feedback, setFeedback] = useState("");
  const [ratings, setRatings] = useState({}); // To store ratings for institutions
  const [rating, setRating] = useState(0); // For selected rating
  const [employerDetails, setEmployerDetails] = useState({
    name: "",
    location: "",
    stakeholders: [],
  });
  const [newStakeholder, setNewStakeholder] = useState("");

  // Function to verify credential by ID or wallet address
  const verifyCredential = () => {
    let credential = null;

    if (credentialId) {
      credential = mockCredentials.find(
        (cred) => cred.id === parseInt(credentialId)
      );
    } else if (walletAddress) {
      credential = mockCredentials.find(
        (cred) => cred.learnerWallet === walletAddress
      );
    }

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    if (credential) {
      setCredentialData(credential);
      setVerificationStatus(
        credential.status === "Verified"
          ? "Valid Credential"
          : "Verification Pending"
      );

      // Check for sensitive credential and handle permission logic
      if (credential.sensitive && !permissions[credential.id]) {
        setPermissionRequested(true);
        setVerificationStatus("Permission Required to View Credential");
      } else {
        // Add to verification history
        setVerificationHistory((prevHistory) => [
          ...prevHistory,
          {
            id: credentialId || walletAddress,
            status: credential.status,
            timestamp: timestamp,
          },
        ]);
      }
    } else {
      setCredentialData(null);
      setVerificationStatus("Credential Not Found");

      // Add to verification history for a failed request
      setVerificationHistory((prevHistory) => [
        ...prevHistory,
        {
          id: credentialId || walletAddress,
          status: "Not Found",
          timestamp: timestamp,
        },
      ]);
    }
  };

  // Function to verify batch credentials
  const verifyBatchCredentials = () => {
    const ids = batchInput.split(",").map((id) => id.trim());
    const results = ids.map((id) => {
      const credential = mockCredentials.find(
        (cred) => cred.id === parseInt(id)
      );
      return {
        id: id,
        status: credential ? credential.status : "Not Found",
        timestamp: new Date().toLocaleString(),
      };
    });
    setBatchResults(results);
    setBatchInput(""); // Clear the input field after submission
  };

  // Request permission to view sensitive credentials
  const requestPermission = (credentialId) => {
    setPermissions((prev) => ({
      ...prev,
      [credentialId]: true, // Simulate permission granted
    }));
    setPermissionRequested(false);
    setVerificationStatus(
      "Permission Granted. You can now view the credential."
    );
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (feedback.trim() !== "" && rating > 0) {
      setRatings((prev) => ({
        ...prev,
        [credentialData?.issuer]: { feedback, rating },
      }));
      setFeedback("");
      setRating(0);
    }
  };

  // Handle adding new stakeholder
  const addStakeholder = () => {
    if (newStakeholder.trim() !== "") {
      setEmployerDetails((prev) => ({
        ...prev,
        stakeholders: [...prev.stakeholders, newStakeholder],
      }));
      setNewStakeholder("");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Employer Dashboard */}
      <div className="bg-white p-8 shadow-2xl rounded-3xl mb-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Employer Profile
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employer Name
          </label>
          <input
            type="text"
            value={employerDetails.name}
            onChange={(e) =>
              setEmployerDetails({ ...employerDetails, name: e.target.value })
            }
            className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="Enter Employer Name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={employerDetails.location}
            onChange={(e) =>
              setEmployerDetails({
                ...employerDetails,
                location: e.target.value,
              })
            }
            className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="Enter Location"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add Stakeholder
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={newStakeholder}
              onChange={(e) => setNewStakeholder(e.target.value)}
              className="flex-grow p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Enter Stakeholder Name"
            />
            <button
              onClick={addStakeholder}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-200 ease-in-out"
            >
              Add
            </button>
          </div>
        </div>

        {/* Display Stakeholders */}
        {employerDetails.stakeholders.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Stakeholders:
            </h3>
            <ul className="list-disc ml-6 space-y-2">
              {employerDetails.stakeholders.map((stakeholder, index) => (
                <li key={index} className="text-gray-700">
                  {stakeholder}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Credential Verification Section */}
        <div className="mt-12 bg-white p-8 shadow-xl rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Employer Dashboard - Credential Verification
          </h2>

          {/* Input fields for credential ID or wallet address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="credentialId"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Credential ID
              </label>
              <input
                type="text"
                id="credentialId"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Enter Credential ID"
              />
            </div>

            <div>
              <label
                htmlFor="walletAddress"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Learner Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Enter Blockchain Wallet Address"
              />
            </div>
          </div>

          {/* Verification Button */}
          <button
            onClick={verifyCredential}
            className="mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ease-in-out"
          >
            Verify Credential
          </button>
        </div>
      </div>

      {/* Credential Details */}
      {verificationStatus && (
        <div className="bg-white p-8 shadow-xl rounded-3xl mt-8">
          <h3 className="text-xl font-bold mb-6 text-gray-900">
            Verification Status: {verificationStatus}
          </h3>

          {credentialData && (
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Issuer:</strong> {credentialData.issuer}
              </p>
              <p className="text-gray-700">
                <strong>Course:</strong> {credentialData.course}
              </p>
              <p className="text-gray-700">
                <strong>Date of Completion:</strong>{" "}
                {credentialData.dateCompleted}
              </p>
              <p
                className={`text-sm font-semibold ${
                  credentialData.status === "Verified"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <strong>Status:</strong> {credentialData.status}
              </p>

              {/* Permission Request for Sensitive Credentials */}
              {credentialData.sensitive && !permissions[credentialData.id] && (
                <div className="mt-6">
                  <p className="text-red-600 font-semibold">
                    This credential is sensitive. Permission is required to view
                    full details.
                  </p>
                  <button
                    onClick={() => requestPermission(credentialData.id)}
                    className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ease-in-out"
                  >
                    Request Permission
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Verification History */}
      {verificationHistory.length > 0 && (
        <div className="bg-white p-8 shadow-xl rounded-3xl mt-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Verification History
          </h3>
          <ul className="space-y-6">
            {verificationHistory.map((entry, index) => (
              <li
                key={index}
                className="p-6 bg-gray-100 border border-gray-200 rounded-2xl shadow-md transition transform hover:bg-transparent duration-200 ease-in-out"
              >
                <p className="text-gray-800 font-medium">
                  <strong>ID/Wallet:</strong> {entry.id}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Status:</strong> {entry.status}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Timestamp:</strong> {entry.timestamp}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Batch Verification Section */}
      <div className="bg-white p-8 shadow-2xl rounded-3xl mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Batch Verification
        </h2>
        <label
          htmlFor="batchInput"
          className="block text-sm font-semibold text-gray-700 mb-3"
        >
          Enter Credential IDs (comma-separated)
        </label>
        <input
          type="text"
          id="batchInput"
          value={batchInput}
          onChange={(e) => setBatchInput(e.target.value)}
          className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
          placeholder="e.g., 1, 2, 3"
        />
        <button
          onClick={verifyBatchCredentials}
          className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition duration-200 ease-in-out"
        >
          Verify Batch Credentials
        </button>

        {/* Batch Results */}
        {batchResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Batch Verification Results:
            </h3>
            <ul className="space-y-4">
              {batchResults.map((result, index) => (
                <li
                  key={index}
                  className="p-6 bg-gray-100 border border-gray-200 rounded-2xl shadow-md transition transform hover:scale-105 duration-200 ease-in-out"
                >
                  <p className="text-gray-800 font-medium">
                    <strong>ID:</strong> {result.id}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <strong>Status:</strong> {result.status}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <strong>Timestamp:</strong> {result.timestamp}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-8 shadow-2xl rounded-3xl mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Employer Reputation
        </h2>
        <label
          htmlFor="feedback"
          className="block text-sm font-semibold text-gray-700 mb-4"
        >
          Provide Feedback on Credential Quality
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
          placeholder="Enter your feedback here..."
          rows="4"
        />

        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Rate the Credential (1-5):
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="block w-full p-4 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="Enter a rating from 1 to 5"
          />
        </div>

        <button
          onClick={handleFeedbackSubmit}
          className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ease-in-out"
        >
          Submit Feedback
        </button>

        {/* Display Ratings */}
        {Object.keys(ratings).length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              Feedback and Ratings:
            </h3>
            <ul className="space-y-6">
              {Object.entries(ratings).map(
                ([institution, { feedback, rating }], index) => (
                  <li
                    key={index}
                    className="p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-md"
                  >
                    <p className="text-gray-700">
                      <strong>Institution:</strong> {institution}
                    </p>
                    <p className="text-gray-700">
                      <strong>Feedback:</strong> {feedback}
                    </p>
                    <p className="text-gray-700">
                      <strong>Rating:</strong> {rating} / 5
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployerDashboard;
