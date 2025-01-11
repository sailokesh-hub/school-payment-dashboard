import React, { useState } from "react";
import axios from "axios";
import { fetchTransactionStatus } from "../services/api";

const TransactionStatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [status, setStatus] = useState("");

  const checkStatus = async () => {
    try {
      const data = await fetchTransactionStatus({ custom_order_id: customOrderId });
  
      if (data && data.status) {
        setStatus(`Status: ${data.status}`);
      } else {
        setStatus(data?.message || "Status not available.");
      }
    } catch (error) {
      console.error("Error fetching transaction status:", error);
      setStatus("Failed to fetch status. Please try again.");
    }
  };
  
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Transaction Status Check</h1>
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter Custom Order ID"
          className="p-2 border rounded w-1/4"
          value={customOrderId}
          onChange={(e) => setCustomOrderId(e.target.value)}
        />
        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={checkStatus}
        >
          Check Status
        </button>
      </div>
      {status && <p className="mt-4 text-lg font-semibold">{status}</p>}
    </div>
  );
};

export default TransactionStatusCheck;
