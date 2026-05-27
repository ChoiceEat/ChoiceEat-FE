import { useState } from "react";
import { useAuth } from "./useAuth";

export function useHistory() {
  const { user } = useAuth();
  const STORAGE_KEY = `choiceeat_history_${user?.userId ?? "guest"}`;

  const [list, setList] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  );

  const addItem = (restaurant) => {
    const date = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setList((prev) => {
      const updated = [
        { ...restaurant, _histDate: date },
        ...prev.filter((r) => !(r.name === restaurant.name && r._histDate === date)),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteItem = (name) => {
    setList((prev) => {
      const updated = prev.filter((r) => r.name !== name);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const save = (currentList) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
  };

  return { list, addItem, deleteItem, save };
}
