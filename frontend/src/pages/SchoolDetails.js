import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";
import Pagination from "../shared/Pagination";

const SchoolDetails = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  const handleFetchTransactions = async () => {
    if (schoolId) {
      const data = await fetchTransactions({ school_id: schoolId, page });
      setTransactions(data);
    }
  };

  useEffect(() => {
    handleFetchTransactions();
  }, [schoolId, page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Details by School</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter School ID"
          className="p-2 border rounded w-64"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleFetchTransactions}
        >
          Search
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200 text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Collect ID</th>
            <th className="border p-2">Gateway</th>
            <th className="border p-2">Order Amount</th>
            <th className="border p-2">Transaction Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Custom Order ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.collect_id}>
              <td className="border p-2">{tx.collect_id}</td>
              <td className="border p-2">{tx.gateway}</td>
              <td className="border p-2">{tx.order_amount}</td>
              <td className="border p-2">{tx.transaction_amount}</td>
              <td className="border p-2">{tx.status}</td>
              <td className="border p-2">{tx.custom_order_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {page !== 1 && (<Pagination currentPage={page} onPageChange={setPage} />)}
      
    </div>
  );
};

export default SchoolDetails;
