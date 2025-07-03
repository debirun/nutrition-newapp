import React, { useEffect } from "react";

const WaterReminder = () => {
  useEffect(() => {
    Notification.requestPermission();

    const sendWaterNotification = () => {
      if (Notification.permission === "granted") {
        new Notification("体が水を欲しているよ！", {
          body: "そろそろ水分補給しよう！",
        });
      }
    };

    const intervalId = setInterval(() => {
      sendWaterNotification();
    }, 2 * 60 * 1000); // 2分（テスト用）

    return () => clearInterval(intervalId);
  }, []);

  return null; // 表示要素は不要
};

export default WaterReminder;
