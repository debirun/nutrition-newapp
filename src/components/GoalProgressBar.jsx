import React from "react";

const GoalProgressBar = ({ latestWeight }) => {
  const weightData = JSON.parse(localStorage.getItem("weightData") || "{}");
  const startWeight = weightData.currentWeight;
  const targetWeight = weightData.targetWeight;

  if (!startWeight || !targetWeight || !latestWeight) {
    return <p>体重データが不足しています</p>;
  }

  const totalDiff = targetWeight - startWeight;
  const currentDiff = latestWeight - startWeight;

  let progress = (currentDiff / totalDiff) * 100;
  // 減量の場合（目標体重 < 開始体重）、進捗率を逆にする
  if (totalDiff < 0) {
    progress = ((startWeight - latestWeight) / (startWeight - targetWeight)) * 100;
  }

  // 上限下限補正
  progress = Math.max(0, Math.min(progress, 100));

  return (
    <div>
      <h3>目標達成度</h3>
      <div style={{
        width: "100%",
        background: "#eee",
        height: "30px",
        borderRadius: "5px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${progress}%`,
          background: "#82ca9d",
          height: "100%",
          transition: "width 0.5s"
        }} />
      </div>
      <p>{progress.toFixed(1)}%</p>
    </div>
  );
};

export default GoalProgressBar;
