export const subscribeUserToPush = async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
  
      // ここに自分の VAPID 公開鍵を入れる
      const vapidPublicKey = "あなたのPublic Key（Base64形式）";
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  
      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
  
        console.log("Push Subscription:", JSON.stringify(subscription));
  
        // ここでサーバーに送信する処理を後で追加
        alert("プッシュ通知が有効になりました！");
      } catch (error) {
        console.error("Push subscription error:", error);
      }
    }
  };
  
  // 変換用関数
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  