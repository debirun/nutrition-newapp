import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WeightInputForm = () => {
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      currentWeight: Number(current),
      targetWeight: Number(target),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem("weightData", JSON.stringify(data));
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>現在の体重（kg）:</label>
        <input
          type="number"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>目標体重（kg）:</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "1rem" }}>保存して進む</button>
    </form>
  );
};

export default WeightInputForm;
