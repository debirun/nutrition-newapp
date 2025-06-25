import React from "react";
import WeightInputForm from "../components/WeightInputForm";

const WeightSetupPage = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>はじめに体重を入力してください</h2>
      <WeightInputForm />
    </div>
  );
};

export default WeightSetupPage;
