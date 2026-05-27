import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MenuRecommend.module.scss";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function MenuRecommend() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

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
            <span>{restaurant.name}의 인기 메뉴들이에요!</span>
          </div>
        </div>
        <img className={styles.mascot} src="/char-vibe.png" alt="" />
      </div>

      <div className={styles.list}>
        {restaurant.menus.map((menu, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardImgWrap}>
              <img
                className={styles.cardImg}
                src={menu.image || "/empty-food.svg"}
                alt={menu.name}
                onError={(e) => {
                  e.currentTarget.src = "/empty-food.svg";
                }}
              />
            </div>
            <div className={styles.cardInfo}>
              <p className={styles.cardName}>{menu.name}</p>
              <p className={styles.cardPrice}>{menu.price}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
