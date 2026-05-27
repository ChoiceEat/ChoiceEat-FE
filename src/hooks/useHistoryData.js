import { useState, useEffect } from "react";
import { fetchHistories, fetchHomeHistories } from "../apis/historyApi";

export function useHistoryData() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistories()
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteItem = (historyId) => {
    setList((prev) => prev.filter((item) => item.historyId !== historyId));
  };

  return { list, loading, deleteItem };
}

export function useHomeHistoryData() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeHistories()
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  return { list, loading };
}
