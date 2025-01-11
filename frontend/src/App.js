import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footbar"; 
import Dashboard from "./pages/Dashboard";
import SchoolDetails from "./pages/SchoolDetails";
import StatusCheck from "./pages/StatusCheck";
import TransactionDetailsBySchool from "./components/TransactionDetailsBySchool";
import TransactionStatusCheck from "./components/TransactionStatusCheck";
import WebhookTester from "./components/WebhookTester";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 p-4  dark:border-gray-600">
          <Routes>
            <Route path="/transactions" element={<Dashboard />} />
            <Route path="/school-details" element={<TransactionDetailsBySchool />} />
            <Route path="/transactions/status-check" element={<TransactionStatusCheck />} />
            <Route path="/custompayload" element={<WebhookTester />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
