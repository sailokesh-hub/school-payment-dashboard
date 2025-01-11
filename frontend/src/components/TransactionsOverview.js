import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";
import Pagination from "../shared/Pagination";

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    dateRange: "",
    schoolId: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [copiedId, setCopiedId] = useState(null); // Track the copied ID
  const [isLoading, setIsLoading] = useState(false);
  console.log(filters)

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        const { data, total } = await fetchTransactions({ ...filters, page });
        setTransactions(data || []);
        setTotalPages(Math.ceil(total / 10));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, [filters, page]);

  // Function to return status style
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

  const handleExport = () => {
    // Implement export to Excel functionality here
    alert("Export to Excel feature not implemented yet!");
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800">
      <h1 className="text-xl font-bold text-gray-800 mb-6 dark:text-white">
        Transactions Overview
      </h1>

      {/* Filters, Search, and Export */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by School ID"
          className="p-2 rounded-md bg-white w-1/4 focus:outline-none dark:bg-gray-700 dark:text-white"
          onChange={(e) => 
            setFilters({ ...filters, schoolId: e.target.value.trim() })
          }
        />

        {/* Filters and Export Button */}
        <div className="flex items-center space-x-4">
          <select
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILURE">Failed</option>
          </select>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white"
            onChange={(e) =>
              setFilters({ ...filters, dateRange: e.target.value })
            }
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            onClick={handleExport}
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-xs">
        <table className="min-w-full bg-white border border-gray-300 shadow-md dark:bg-gray-700 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 text-left dark:bg-gray-800 dark:text-white">
              <th className="p-3 border-b">S.No</th>
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
            {isLoading ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-3 text-gray-500 dark:text-gray-300"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr
                  key={tx.collect_id}
                  className="hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] transform transition duration-200 dark:hover:bg-gray-600"
                >
                  <td className="p-3 border-b dark:text-white">
                    {(page - 1) * 10 + index + 1}
                  </td>
                  <td className="p-3 border-b dark:text-white">
                    {tx.school_id}
                    <button
                      className="ml-2 align-middle"
                      onClick={() => handleCopy(tx.school_id)}
                    >
                      <img
                        src="./copy-icon.svg"
                        alt="Copy Icon"
                        className="w-5 h-5 cursor-pointer hover:scale-110 transform transition duration-200"
                      />
                    </button>
                    {copiedId === tx.school_id && (
                      <span className="text-green-500 absolute ml-3 text-xs">
                        Copied!
                      </span>
                    )}
                  </td>
                  <td className="p-3 border-b dark:text-white">{tx.collect_id}<button
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
                    )}</td>
                  <td className="p-3 border-b dark:text-white">{tx.gateway}</td>
                  <td className="p-3 border-b dark:text-white">
                    {tx.order_amount}
                  </td>
                  <td className="p-3 border-b dark:text-white">
                    {tx.transaction_amount}
                  </td>
                  <td className="p-3 border-b">
                    <span className={getStatusStyle(tx.status)}>{tx.status}</span>
                  </td>
                  <td className="p-3 border-b dark:text-white">
                    {tx.custom_order_id}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TransactionsOverview;
