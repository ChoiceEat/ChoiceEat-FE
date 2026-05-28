import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MenuRecommend.module.scss";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useAuth } from "../../hooks/useAuth";
import { fetchMenuRecommendations } from "../../apis/Menupickapi";

export default function MenuRecommend() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const { user } = useAuth();
  const nickname = user?.nickname ?? "멋사";

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurant?.kakaoPlaceId) return;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuRecommendations(restaurant.kakaoPlaceId);
        setMenus(data.menus);
      } catch (e) {
        setError("메뉴를 불러오지 못했어요." + e.toString());
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [restaurant?.kakaoPlaceId]);

  if (!restaurant) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
        <h1 className={styles.logo}>Choice Eat</h1>
      </div>

      <div className={styles.intro}>
        <div className={styles.badgeWrap}>
          <div className={styles.badge}>
            <span>
              {nickname}님, {restaurant.placeName ?? restaurant.name}의 인기
              메뉴들이에요!
            </span>
          </div>
        </div>
        <img className={styles.mascot} src="/char-vibe.png" alt="" />
      </div>

      <div className={styles.list}>
        {loading && <p className={styles.status}>불러오는 중...</p>}
        {error && <p className={styles.status}>{error}</p>}
        {!loading &&
          !error &&
          menus.map((menu, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.cardImgWrap}>
                <img
                  className={styles.cardImg}
                  src={menu.imageUrl || "/empty-food.svg"}
                  alt={menu.menuName}
                  onError={(e) => {
                    e.currentTarget.src = "/empty-food.svg";
                  }}
                />
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.cardName}>{menu.menuName}</p>
                <p className={styles.cardPrice}>
                  {menu.price
                    ? `${menu.price.toLocaleString()}원`
                    : "가격 미정"}
                </p>
              </div>
            </div>
          ))}
      </div>

      <BottomNav />
    </div>
  );
}
