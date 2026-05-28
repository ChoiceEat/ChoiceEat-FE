import { useState, useEffect, useCallback } from "react";
import {
  saveHistory,
  getHomeHistories,
  getAllHistories,
} from "../apis/historyApi";

const BADGE_MAP = {
  "BALANCE PICK": "밸런스",
  "VALUE PICK": "가성비",
  "QUALITY PICK": "퀄리티",
  balance: "밸런스",
  value: "가성비",
  quality: "퀄리티",
};

function toListItem(item) {
  return {
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

export function useHistory({ home = false } = {}) {
  const [list, setList] = useState([]);

  const load = useCallback(async () => {
    try {
      const data = home ? await getHomeHistories() : await getAllHistories();
      setList((data ?? []).map(toListItem));
    } catch (e) {
      console.error("히스토리 조회 실패:", e);
    }
  }, [home]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = home ? await getHomeHistories() : await getAllHistories();
        if (!cancelled) setList((data ?? []).map(toListItem));
      } catch (e) {
        console.error("히스토리 조회 실패:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [home]);

  const addItem = useCallback(
    async (restaurant) => {
      try {
        await saveHistory(
          restaurant.kakaoPlaceId,
          BADGE_MAP[restaurant.badge] ?? "밸런스",
        );
        await load();
      } catch (e) {
        console.error("히스토리 저장 실패:", e);
      }
    },
    [load],
  );

  return { list, addItem, reload: load };
}
