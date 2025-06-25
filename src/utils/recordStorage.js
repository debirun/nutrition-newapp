const STORAGE_KEY = "dailyRecords";

export const getRecords = () => {
  const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return Array.isArray(records) ? records : [];
};

export const saveRecordForToday = (record) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let records = getRecords();

  // 同じ日付があれば置き換え
  records = records.filter((r) => r.date !== today);
  records.push({ ...record, date: today });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const getLast7DaysRecords = () => {
  const all = getRecords();
  const today = new Date();
  return all
    .filter((r) => {
      const d = new Date(r.date);
      return (today - d) / (1000 * 60 * 60 * 24) <= 7;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
