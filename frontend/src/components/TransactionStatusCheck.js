import React, { useState } from "react";
import { fetchTransactionStatus } from "../services/api";

const TransactionStatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [error, setError] = useState("");

  const statusColors = {
    SUCCESS: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    PENDING: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200",
    FAILED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
  };

  const checkStatus = async () => {
    try {
      const data = await fetchTransactionStatus({ custom_order_id: customOrderId });
      setTransactionDetails(data); // Set transaction details
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching transaction status:", error);
      setError("Failed to fetch status. Please try again.");
      setTransactionDetails(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
      <h1 className="text-xl font-bold mb-4">Transaction Status Check</h1>
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter Custom Order ID"
          className="p-2 border rounded w-1/4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={customOrderId}
          onChange={(e) => setCustomOrderId(e.target.value)}
        />
        <button
          className="p-2 bg-green-500 text-white rounded dark:bg-green-700"
          onClick={checkStatus}
        >
          Check Status
        </button>
      </div>

      {error && <p className="text-red-500 dark:text-red-300">{error}</p>}

      {transactionDetails && (
        <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Transaction Details:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Collect ID:</strong> {transactionDetails.collect_id}</p>
              <p><strong>School ID:</strong> {transactionDetails.school_id}</p>
              <p><strong>Gateway:</strong> {transactionDetails.gateway}</p>
              <p><strong>Order Amount:</strong> {transactionDetails.order_amount}</p>
              <p><strong>Transaction Amount:</strong> {transactionDetails.transaction_amount || "N/A"}</p>
            </div>
            <div className="flex items-center justify-end">
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  statusColors[transactionDetails.status] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {transactionDetails.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionStatusCheck;
