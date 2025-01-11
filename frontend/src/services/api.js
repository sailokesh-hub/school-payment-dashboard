import axios from "axios";

const API = axios.create({ baseURL: "https://school-payment-dashboard-fswcozdeh-sailokesh-hubs-projects.vercel.app" });

export const fetchTransactions = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const { data } = await API.get(`/transactions?${queryParams}`);
  return data;
};

export const fetchTransactionStatus = async (params) => {
  try {
    const { data } = await API.post("/transactions/status-check", params);
    return data;
  } catch (error) {
    console.error("Error in fetchTransactionStatus API call:", error);
    throw error; // Propagate the error for the calling function to handle
  }
};



export const fetchTransactionBySchool = async (schoolId) => {
  const { data } = await API.get(`/transactions/by-school/${schoolId}`);
  return data;
};
