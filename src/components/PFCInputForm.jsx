import React, { useState } from "react";
import { saveRecordForToday } from "../utils/recordStorage";

const PFCInputForm = () => {
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("weightData") || "{}");

    const newRecord = {
      weight: existing.currentWeight || null,
      intake: {
        protein: Number(protein),
        fat: Number(fat),
        carbs: Number(carbs),
      }
    };

    saveRecordForToday(newRecord);
    alert("本日のPFCを記録しました！");
    setProtein(""); setFat(""); setCarbs("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>今日の摂取PFCを記録</h3>
      <div>
        <label>タンパク質（g）</label>
        <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} required />
      </div>
      <div>
        <label>脂質（g）</label>
        <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} required />
      </div>
      <div>
        <label>糖質（g）</label>
        <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} required />
      </div>
      <button type="submit" style={{ marginTop: "1rem" }}>保存</button>
    </form>
  );
};

export default PFCInputForm;
