import { useState } from "react";
import { RESTAURANTS } from "../data/restaurants";
import { MOCK_HISTORY_DATES } from "../data/history";

const STORAGE_KEY = "choiceeat_history_deleted";

const ALL_ITEMS = Object.values(RESTAURANTS)
  .slice(0, 4)
  .map((r, i) => ({ ...r, _histDate: MOCK_HISTORY_DATES[i] }));

function loadList() {
  const deleted = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return ALL_ITEMS.filter((r) => !deleted.includes(r.name));
}

export function useHistory() {
  const [list, setList] = useState(loadList);

  const deleteItem = (name) => {
    setList((prev) => prev.filter((r) => r.name !== name));
  };

  const save = (currentList) => {
    const remaining = new Set(currentList.map((r) => r.name));
    const deleted = ALL_ITEMS.map((r) => r.name).filter(
      (n) => !remaining.has(n)
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deleted));
  };

  return { list, deleteItem, save };
}
