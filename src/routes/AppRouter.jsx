import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WeightSetupPage from "../pages/WeightSetupPage";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
  const isSetupDone = localStorage.getItem("weightData");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isSetupDone ? <Navigate to="/home" replace /> : <WeightSetupPage />}
        />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
