import { useState, useEffect } from "react";
import { fetchHistories, fetchHomeHistories } from "../apis/historyApi";

function normalize(item) {
  return {
    historyId: item.historyId,
    name: item.restaurantName,
    image: item.imageUrl ?? "",
    category: item.category ?? "",
    badge: item.pickType ?? "",
    tag: item.pickType ?? "",
    _histDate: item.selectedAt
      ? new Date(item.selectedAt).toLocaleDateString("ko-KR")
      : "",
  };
}

export function useHistoryData() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistories()
      .then((data) => setList((data ?? []).map(normalize)))
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
      .then((data) => setList((data ?? []).map(normalize)))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  return { list, loading };
}
