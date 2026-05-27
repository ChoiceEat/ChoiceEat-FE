import { useState, useCallback } from "react";
import { fetchRecommendations, fetchRerollRecommendations } from "../apis/recommendationApi";

const TYPE_MAP = {
  "밸런스": "balance",
  "가성비": "value",
  "퀄리티": "quality",
  BALANCE: "balance",
  VALUE: "value",
  QUALITY: "quality",
};

function mapToRestaurant(item) {
  const type = TYPE_MAP[item.recommendationType] ?? TYPE_MAP[item.recommendationType?.toUpperCase()] ?? "balance";

  const BADGE_MAP = { quality: "QUALITY PICK", balance: "BALANCE PICK", value: "VALUE PICK" };
  const TAG_MAP   = { quality: "퀄리티 픽",    balance: "밸런스 픽",    value: "가성비 픽" };

  const avgPrice = item.averagePrice ?? 0;
  const priceStr = avgPrice > 0 ? `${avgPrice.toLocaleString()}원` : "가격 미제공";

  const rawRating = item.rating ?? 0;
  const stars = Math.round(rawRating);
  const starStr = "★".repeat(stars) + "☆".repeat(5 - stars);

  const distanceKm = item.distanceKm ?? 0;
  const walkingMinutes = Math.round((distanceKm / 4) * 60);
  const carMinutes     = Math.round((distanceKm / 30) * 60) || 1;

  return {
    type,
    badge:    BADGE_MAP[type],
    tag:      TAG_MAP[type],

    name:     item.placeName ?? "",
    image:    item.imageUrl  ?? "",
    category: item.menuType  ?? "",
    phone:    item.phone     ?? "",
    address:  item.address   ?? item.roadAddress ?? "",
    hours:    item.businessHours ?? "",
    placeUrl: item.placeUrl  ?? "",

    price:        priceStr,
    minPrice:     item.minPrice ?? 0,
    maxPrice:     item.maxPrice ?? 0,
    averagePrice: avgPrice,

    rating:  `${starStr} ${rawRating.toFixed(1)}`,
    reviews: item.reviewCount ?? 0,

    distance:       distanceKm >= 1 ? `${distanceKm.toFixed(1)}km` : `${Math.round(distanceKm * 1000)}m`,
    distanceKm,
    walkingMinutes,
    carMinutes,

    lat: item.latitude  ?? 0,
    lng: item.longitude ?? 0,

    tags:         item.moodTags ?? [],
    selectedTags: (item.moodTags ?? []).slice(0, 3),

    desc:     item.recommendationDescription ?? "",
    status:   item.parkingAvailable ? "영업중 · 주차 가능" : "영업중",
    features: item.parkingAvailable ? ["주차 가능"] : [],

    menus: [],

    kakaoPlaceId: item.kakaoPlaceId ?? "",
  };
}

function mapToRestaurantMap(recommendations = []) {
  const result = {};
  recommendations.forEach((item) => {
    const restaurant = mapToRestaurant(item);
    result[restaurant.type] = restaurant;
  });
  return result;
}

export function useRecommendations() {
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const fetch = useCallback(async (answers) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecommendations(answers);
      setRestaurants(mapToRestaurantMap(data.recommendations));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const reroll = useCallback(async (answers, excludedKakaoPlaceIds = []) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRerollRecommendations(answers, excludedKakaoPlaceIds);
      setRestaurants(mapToRestaurantMap(data.recommendations));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { restaurants, loading, error, fetch, reroll };
}