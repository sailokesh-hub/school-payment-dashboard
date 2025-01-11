import React, { useState } from "react";
import { fetchTransactions } from "../services/api";

const StatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleCheckStatus = async () => {
    try {
      setError(""); // Reset error
      if (!customOrderId) {
        setError("Please enter a valid Custom Order ID.");
        return;
      }
      const data = await fetchTransactions({ custom_order_id: customOrderId });
      setStatus(data.status); // Assuming the API returns an object with "status"
    } catch (err) {
      setError("Failed to fetch transaction status. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Status Check</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter Custom Order ID"
          className="p-2 border rounded w-64"
          value={customOrderId}
          onChange={(e) => setCustomOrderId(e.target.value)}
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleCheckStatus}
        >
          Check Status
        </button>
      </div>
      {status && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default StatusCheck;
