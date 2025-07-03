import React, { useState } from "react";
import { saveRecordForToday } from "../utils/recordStorage";

const DailyWeightInputForm = ({ reloadData }) => {
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().slice(0, 10);
    let records = JSON.parse(localStorage.getItem("dailyRecords") || "[]");
    const todayRecord = records.find((r) => r.date === today);

    const newRecord = {
      weight: Number(weight),
      intake: todayRecord ? todayRecord.intake : { protein: 0, fat: 0, carbs: 0 },
    };

    saveRecordForToday(newRecord);
    reloadData();
    setWeight("");
    alert("今日の体重を記録しました！");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>今日の体重を記録</h3>
      <div>
        <label>体重（kg）</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "1rem" }}>保存</button>
    </form>
  );
};

export default DailyWeightInputForm;
