import { useState, useCallback } from "react";
import { fetchRecommendations } from "../apis/recommendationApi";

// recommendationType → key 매핑
const TYPE_MAP = {
  QUALITY: "quality",
  BALANCE: "balance",
  VALUE: "value",
};

// API 응답 1개 → 기존 restaurant 객체 구조로 변환
function mapToRestaurant(item) {
  const type = TYPE_MAP[item.recommendationType?.toUpperCase()] ?? "balance";

  const BADGE_MAP = { quality: "QUALITY PICK", balance: "BALANCE PICK", value: "VALUE PICK" };
  const TAG_MAP   = { quality: "퀄리티 픽",    balance: "밸런스 픽",    value: "가성비 픽" };

  const avgPrice = item.averagePrice ?? 0;
  const priceStr = avgPrice > 0 ? `${avgPrice.toLocaleString()}원` : "가격 미제공";

  const rawRating = item.rating ?? 0;
  const stars = Math.round(rawRating);
  const starStr = "★".repeat(stars) + "☆".repeat(5 - stars);

  // distanceKm → 도보/차 소요시간 추정
  const distanceKm = item.distanceKm ?? 0;
  const walkingMinutes = Math.round((distanceKm / 4) * 60);
  const carMinutes     = Math.round((distanceKm / 30) * 60) || 1;

  return {
    // 식별
    type,
    badge:    BADGE_MAP[type],
    tag:      TAG_MAP[type],

    // 기본 정보
    name:     item.placeName ?? "",
    image:    item.imageUrl  ?? "",
    category: item.menuType  ?? "",
    phone:    item.phone     ?? "",
    address:  item.address   ?? item.roadAddress ?? "",
    hours:    item.businessHours ?? "",
    placeUrl: item.placeUrl  ?? "",

    // 가격
    price:        priceStr,
    minPrice:     item.minPrice ?? 0,
    maxPrice:     item.maxPrice ?? 0,
    averagePrice: avgPrice,

    // 평점
    rating:  `${starStr} ${rawRating.toFixed(1)}`,
    reviews: item.reviewCount ?? 0,

    // 거리
    distance:       distanceKm >= 1 ? `${distanceKm.toFixed(1)}km` : `${Math.round(distanceKm * 1000)}m`,
    distanceKm,
    walkingMinutes,
    carMinutes,

    // 위치 (지도용)
    lat: item.latitude  ?? 0,
    lng: item.longitude ?? 0,

    // 태그
    tags:         item.moodTags ?? [],
    selectedTags: (item.moodTags ?? []).slice(0, 3),

    // 설명
    desc:     item.recommendationDescription ?? "",
    status:   item.parkingAvailable ? "영업중 · 주차 가능" : "영업중",
    features: item.parkingAvailable ? ["주차 가능"] : [],

    // 메뉴 (API 미제공 → 빈 배열)
    menus: [],

    // 카카오 ID
    kakaoPlaceId: item.kakaoPlaceId ?? "",
  };
}

// recommendations 배열 → { quality, balance, value } 객체로 변환
function mapToRestaurantMap(recommendations = []) {
  const result = {};
  recommendations.forEach((item) => {
    const restaurant = mapToRestaurant(item);
    result[restaurant.type] = restaurant;
  });
  return result;
}

export function useRecommendations() {
  const [restaurants, setRestaurants] = useState(null); // { quality, balance, value }
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

  return { restaurants, loading, error, fetch };
}