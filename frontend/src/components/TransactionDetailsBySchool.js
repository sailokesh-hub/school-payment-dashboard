import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchTransactionBySchool } from "../services/api";

const API = axios.create({ baseURL: "http://localhost:3001" });

const TransactionDetailsBySchool = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);
    const [copiedId, setCopiedId] = useState(null); // Track the copied collect ID

  const fetchTransactionsBySchool = async (id) => {
    const { data } = await fetchTransactionBySchool(id);
    setTransactions(data || []); // Ensure an empty array if no data is returned
  };

  const handleCopy = (collectId) => {
    navigator.clipboard.writeText(collectId);
    setCopiedId(collectId); // Set the copied ID
    setTimeout(() => setCopiedId(null), 2000); // Clear the copied ID after 2 seconds
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "SUCCESS":
        return "text-green-600 bg-green-100 px-2 py-1 rounded-full font-semibold dark:text-green-400 dark:bg-green-900";
      case "PENDING":
        return "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full font-semibold dark:text-yellow-400 dark:bg-yellow-900";
      case "FAILURE":
        return "text-red-600 bg-red-100 px-2 py-1 rounded-full font-semibold dark:text-red-400 dark:bg-red-900";
      default:
        return "text-gray-600 bg-gray-100 px-2 py-1 rounded-full font-semibold dark:text-gray-400 dark:bg-gray-900";
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-700">
      <h1 className="text-xl font-bold mb-4">Transactions By School</h1>
      <div className="flex items-center space-x-4 mb-6 dark:bg-gray-700">
        <input
          type="text"
          placeholder="Enter School ID"
          className="p-2 rounded-md bg-white  w-1/4 focus:outline-none dark:bg-gray-500 dark:text-white"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => fetchTransactionsBySchool(schoolId)}
        >
          Fetch Transactions
        </button>
      </div>

      <div className="overflow-x-auto text-xs">
        <table className="min-w-full border border-gray-300">
        <thead>
            <tr className="bg-gray-100 text-left dark:bg-gray-800 dark:text-white">
              <th className="p-3 border-b">School ID</th>
              <th className="p-3 border-b">Collect ID</th>

              <th className="p-3 border-b">Gateway</th>
              <th className="p-3 border-b">Order Amount</th>
              <th className="p-3 border-b">Transaction Amount</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.collect_id}
                className="hover:bg-gray-50 transition transform hover:scale-[1.02]"
              >
                <td className="p-2 border">{tx.school_id}</td>
                <td className="p-3 border-b dark:text-white">
                  {tx.collect_id}
                  <button
                    className="ml-2 align-middle"
                    onClick={() => handleCopy(tx.collect_id)}
                  >
                    <img
                      src="./copy-icon.svg"
                      alt="Copy Icon"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transform transition duration-200"
                    />
                  </button>
                  {copiedId === tx.collect_id && (
                    <span className="text-green-500 absolute ml-3 text-xs">
                      Copied!
                    </span>
                  )}
                </td>
                <td className="p-2 border">{tx.gateway}</td>
                <td className="p-2 border">{tx.order_amount}</td>
                <td className="p-2 border">{tx.transaction_amount}</td>
                <td className="p-2 border"><span className={getStatusStyle(tx.status)}>{tx.status}</span></td>
                <td className="p-2 border">{tx.custom_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDetailsBySchool;
