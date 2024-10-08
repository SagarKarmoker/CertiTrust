import { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js v3
import toast, { Toaster } from "react-hot-toast";
import Upload from "../components/wallet/Upload";

// Mock data for existing templates, institution details, credentials, stakeholders, and notifications
const templates = [
  {
    id: 1,
    title: "Diploma in Computer Science",
    fields: ["Name", "Course", "Date", "Grade"],
  },
  {
    id: 2,
    title: "Certificate of Excellence",
    fields: ["Name", "Event", "Date"],
  },
];

const initialInstitution = {
  name: "University of Technology",
  logo: "",
  reputationScore: 85,
  cryptoKey: "abcd1234",
  stakeTokens: 1000,
};

const sampleCredentials = [
  { id: 1, learner: "John Doe", type: "Diploma", status: "Verified" },
  {
    id: 2,
    learner: "Jane Smith",
    type: "Certificate",
    status: "Pending Verification",
  },
];

const initialStakeholders = [
  { id: 1, name: "John Admin", role: "Administrator" },
  { id: 2, name: "Jane Professor", role: "Professor" },
];

const analyticsData = {
  totalCredentialsIssued: [120, 130, 125, 135, 140],
  verificationRequests: [100, 105, 110, 115, 123],
  reputationIndex: [75, 80, 85, 90, 92],
  labels: ["January", "February", "March", "April", "May"],
  positiveFeedback: 88,
  negativeFeedback: 12,
};

// Initial notifications
const initialNotifications = [
  {
    id: 1,
    type: "Cryptographic Signature Renewal",
    message: "Your cryptographic signature will expire in 5 days.",
  },
  {
    id: 2,
    type: "Learner Modification Request",
    message: "A learner requested modification of their diploma credentials.",
  },
  {
    id: 3,
    type: "Third-party Verification",
    message: "Third-party verification requested for John Doe's credentials.",
  },
];

function IssuerDashboard() {
  const [credentials, setCredentials] = useState(sampleCredentials);
  const [newCredential, setNewCredential] = useState({
    templateId: templates[0].id,
    data: {},
  });
  const [institution, setInstitution] = useState(initialInstitution);
  const [stakeholderList, setStakeholderList] = useState(initialStakeholders);
  const [apiKey, setApiKey] = useState("abcd1234efgh5678"); // Simulated API key
  const [studentId, setStudentId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);

  // Simulate real-time notifications using a useEffect hook
  useEffect(() => {
    // Only add new notifications if there are less than 5
    if (notifications.length < 3) {
      const timeout = setTimeout(() => {
        const newNotification = {
          id: notifications.length + 1,
          type: "Third-party Verification",
          message: `A verification request for Jane Smith's certificate has been made.`,
        };
        setNotifications((prev) => [...prev, newNotification]);
        toast.success(newNotification.message);
      }, 5000); // Simulate notification after 5 seconds

      return () => clearTimeout(timeout);
    }
  }, [notifications]);

  // Data for charts
  const feedbackData = {
    labels: ["Positive Feedback", "Negative Feedback"],
    datasets: [
      {
        data: [analyticsData.positiveFeedback, analyticsData.negativeFeedback],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const reputationData = {
    labels: analyticsData.labels,
    datasets: [
      {
        label: "Reputation Index",
        data: analyticsData.reputationIndex,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: analyticsData.labels,
    datasets: [
      {
        label: "Total Credentials Issued",
        data: analyticsData.totalCredentialsIssued,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Verification Requests",
        data: analyticsData.verificationRequests,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  // Credential data change handler
  const handleCredentialDataChange = (field, value) => {
    setNewCredential((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
    }));
  };

  // Credential issuance handler
  const issueCredential = () => {
    setCredentials([
      ...credentials,
      { ...newCredential, id: credentials.length + 1, studentId, courseCode },
    ]);
    setNewCredential({ templateId: templates[0].id, data: {} }); // Reset form
    setStudentId("");
    setCourseCode("");
    toast.success("Credential issued successfully!");
  };

  // Institution data change handler
  const handleInstitutionChange = (field, value) => {
    setInstitution((prev) => ({ ...prev, [field]: value }));
  };

  // Add stakeholder handler
  const handleAddStakeholder = (name, role) => {
    const newStakeholder = {
      id: stakeholderList.length + 1,
      name: name,
      role: role,
    };
    setStakeholderList([...stakeholderList, newStakeholder]);
    toast.success("Stakeholder added successfully!");
  };

  // Remove stakeholder handler
  const handleRemoveStakeholder = (id) => {
    setStakeholderList(
      stakeholderList.filter((stakeholder) => stakeholder.id !== id)
    );
    toast.success("Stakeholder removed successfully!");
  };

  // Regenerate API key
  const handleApiRegenerate = () => {
    const newApiKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    toast.success("API Key regenerated successfully!");
  };

  const currentTemplate = templates.find(
    (t) => t.id === newCredential.templateId
  );

  return (
    <div className="container mx-auto px-4">
      {/* demo */}
      <Upload />
      <Toaster position="top-center" />
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 text-center my-6 py-3">
        Issuer Dashboard
      </h1>

      {/* Notifications */}
      <div className="bg-white p-4 mb-4 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex-shrink-0 mr-3">
                {/* Icons based on notification type */}
                {notification.type === "Cryptographic Signature Renewal" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m9-6.5c0-4.972-4.028-9-9-9s-9 4.028-9 9 4.028 9 9 9 9-4.028 9-9z"
                    />
                  </svg>
                )}
                {notification.type === "Learner Modification Request" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 12h16m-7 8h7m-7-4h7M5 20h7M5 16h7"
                    />
                  </svg>
                )}
                {notification.type === "Third-party Verification" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12h7.5M12 3.75l3.15 6.75H5.85l3.15-6.75z"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-2">
                <h4 className="font-semibold text-gray-700">
                  {notification.type}
                </h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Tools */}
      <div className="bg-white p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Integration Tools
        </h2>
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            <strong className="text-gray-800">API Key:</strong> {apiKey}
          </p>
          <button
            onClick={handleApiRegenerate}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Regenerate API Key
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
              placeholder="Enter Student ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Code
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
              placeholder="Enter Course Code"
            />
          </div>
        </div>
      </div>

      {/* Stakeholder Management */}
      <div className="bg-white p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Stakeholder Management
        </h2>

        <div className="space-y-4">
          {stakeholderList.map((stakeholder) => (
            <div
              key={stakeholder.id}
              className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {/* Icon for roles */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    {stakeholder.name}
                  </p>
                  <p className="text-gray-500 text-sm">{stakeholder.role}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveStakeholder(stakeholder.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition ease-in-out duration-150 shadow-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() =>
              handleAddStakeholder("New Stakeholder", "Credential Officer")
            }
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Add Stakeholder
          </button>
        </div>
      </div>

      {/* Institution Management */}
      <div className="bg-white p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Institution Management
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institution Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name
              </label>
              <input
                type="text"
                value={institution.name}
                onChange={(e) =>
                  handleInstitutionChange("name", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Institution Name"
              />
            </div>

            {/* Reputation Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reputation Score
              </label>
              <input
                type="number"
                value={institution.reputationScore}
                onChange={(e) =>
                  handleInstitutionChange("reputationScore", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Reputation Score"
              />
            </div>

            {/* Cryptographic Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cryptographic Key
              </label>
              <input
                type="text"
                value={institution.cryptoKey}
                onChange={(e) =>
                  handleInstitutionChange("cryptoKey", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Cryptographic Key"
              />
            </div>

            {/* Stake Tokens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stake Tokens
              </label>
              <input
                type="number"
                value={institution.stakeTokens}
                onChange={(e) =>
                  handleInstitutionChange("stakeTokens", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Stake Tokens"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Learner Verification */}
      <div className="bg-white p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Learner Verification
        </h2>
        <ul className="space-y-4">
          {credentials.map((cred) => (
            <li
              key={cred.id}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">ID: {cred.id}</p>
                <p className="text-gray-700">{`Learner: ${cred.learner}`}</p>
                <p className="text-gray-700">{`Type: ${cred.type}`}</p>
                <p
                  className={`text-sm font-semibold ${
                    cred.status === "Verified"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {cred.status}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    handleCredentialDataChange(cred.id, "Verified")
                  }
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                >
                  Verify
                </button>
                <button
                  onClick={() => issueCredential(cred.id)}
                  className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                >
                  Revoke
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Analytics and Reporting with Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Feedback Analysis */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Feedback Analysis
          </h2>
          <Pie data={feedbackData} className="h-48 w-full" />
        </div>

        {/* Reputation Index */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Reputation Index
          </h2>
          <Bar
            data={reputationData}
            options={{ scales: { y: { beginAtZero: true } } }}
            className="h-48 w-full"
          />
        </div>

        {/* Trends Over Time */}
        <div className="col-span-2 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Trends Over Time
          </h2>
          <Line
            data={lineData}
            options={{ scales: { y: { beginAtZero: true } } }}
            className="h-48 w-full"
          />
        </div>
      </div>

      {/* Credential Issuance Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Issue Credential
        </h2>

        {/* Template Selector */}
        <div className="mb-4">
          <label
            htmlFor="template"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Template
          </label>
          <select
            id="template"
            value={newCredential.templateId}
            onChange={(e) =>
              setNewCredential({
                templateId: parseInt(e.target.value, 10),
                data: {},
              })
            }
            className="block w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
        </div>

        {/* Input Fields for Template Data */}
        {currentTemplate.fields.map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {field}
            </label>
            <input
              type="text"
              id={field}
              value={newCredential.data[field] || ""}
              onChange={(e) =>
                handleCredentialDataChange(field, e.target.value)
              }
              className="block w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        {/* Issue Credential Button */}
        <button
          onClick={issueCredential}
          className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
        >
          Issue Credential
        </button>
      </div>
    </div>
  );
}

export default IssuerDashboard;
