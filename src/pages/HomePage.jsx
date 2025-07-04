import React, { useEffect, useState } from "react";
import { getLast7DaysRecords } from "../utils/recordStorage";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import PFCInputForm from "../components/PFCInputForm";
import DailyWeightInputForm from "../components/DailyWeightInputForm";
import GoalProgressBar from "../components/GoalProgressBar";
import WaterReminder from "../components/WaterReminder";
import { subscribeUserToPush } from "../utils/pushNotification";




<button onClick={subscribeUserToPush}>プッシュ通知を有効にする</button>

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getLast7DaysRecords());
  }, []);

  const reloadData = () => {
    setData(getLast7DaysRecords());
  };  

  const latestWeight = data.length > 0 ? data[data.length - 1].weight : null;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>ホーム画面</h2>


      <DailyWeightInputForm reloadData={reloadData} />
      <PFCInputForm reloadData={reloadData} />


      <h3>体重の推移（7日間）</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <GoalProgressBar latestWeight={latestWeight} />



      <h3>PFC摂取量の推移（7日間）</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />          {/* 横軸：日付（文字列） */}
            <YAxis />                         {/* 縦軸：数値（PFC合計） */}
            <Tooltip />
            <Legend />
            <Bar dataKey="intake.protein" fill="#82ca9d" name="タンパク質" />
            <Bar dataKey="intake.fat" fill="#ffc658" name="脂質" />
            <Bar dataKey="intake.carbs" fill="#8884d8" name="糖質" />
        </BarChart>
    </ResponsiveContainer>

    <h3>水分補給のお知らせ</h3>
    <WaterReminder />
    </div>
  );
};

export default HomePage;
