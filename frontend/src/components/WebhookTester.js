import React, { useState } from "react";
import axios from "axios";

const WebhookTester = () => {
  const [orderId, setOrderId] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [gateway, setGateway] = useState("PhonePe");
  const [bankReference, setBankReference] = useState("");
  const [status, setStatus] = useState(200);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      status,
      order_info: {
        order_id: orderId,
        order_amount: parseFloat(orderAmount),
        transaction_amount: parseFloat(transactionAmount),
        gateway,
        bank_reference: bankReference,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/transactions/webhook/status-update",
        payload
      );
      setResponseMessage(`Success: ${response.data.message}`);
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || "Failed to send payload"}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* <h1 className="text-2xl font-bold">Webhook Tester</h1> */}
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="orderId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Order ID
          </label>
          <input
            type="text"
            id="orderId"
            className="p-2 border rounded w-full"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="orderAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Order Amount
          </label>
          <input
            type="number"
            id="orderAmount"
            className="p-2 border rounded w-full"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="transactionAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Amount
          </label>
          <input
            type="number"
            id="transactionAmount"
            className="p-2 border rounded w-full"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gateway"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gateway
          </label>
          <select
            id="gateway"
            className="p-2 border rounded w-full"
            value={gateway}
            onChange={(e) => setGateway(e.target.value)}
          >
            <option value="PhonePe">PhonePe</option>
            <option value="Paytm">Paytm</option>
            <option value="GooglePay">GooglePay</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="bankReference"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bank Reference
          </label>
          <input
            type="text"
            id="bankReference"
            className="p-2 border rounded w-full"
            value={bankReference}
            onChange={(e) => setBankReference(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status Code
          </label>
          <input
            type="number"
            id="status"
            className="p-2 border rounded w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Send Payload
        </button>
      </form>
      {responseMessage && (
        <div
          className={`mt-6 p-4 rounded ${
            responseMessage.startsWith("Success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default WebhookTester;
