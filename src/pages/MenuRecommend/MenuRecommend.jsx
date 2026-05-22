import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Settings/Settings.module.scss';
import value from '../../assets/value.png';
import example1 from '../../assets/example1.png';
import example2 from '../../assets/example2.png';
import ForkKnifeIcon from '../../assets/icons/fork-knife.png';
import HomeInactiveIcon from '../../assets/icons/home-inactive.svg';
import SettingsInactiveIcon from '../../assets/icons/settings-inactive.svg';
import './MenuRecommend.scss';

const FOOD_IMAGES = [value, example1, example2];

export default function MenuRecommend() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  if (!restaurant) return null;

  return (
    <div className="mr-page">
      <div className="mr-header">
        <button className="mr-back-btn" onClick={() => navigate(-1)}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
        <h1 className="mr-logo">Choice Eat</h1>
      </div>

      <div className="mr-intro">
        <div className="mr-badge-wrap">
          <div className="mr-badge">
            <span>{restaurant.name}의 인기 메뉴들이에요!</span>
          </div>
        </div>
        <img className="mr-mascot" src="/char-vibe.svg" alt="" />
      </div>

      <div className="mr-list">
        {restaurant.menus.map((menu, i) => (
          <div className="mr-card" key={i}>
            <div className="mr-card-img-wrap">
              <img
                className="mr-card-img"
                src={FOOD_IMAGES[i] ?? '/empty-food.svg'}
                alt={menu.name}
                onError={e => { e.currentTarget.src = '/empty-food.svg'; }}
              />
            </div>
            <div className="mr-card-info">
              <p className="mr-card-name">{menu.name}</p>
              <p className="mr-card-price">{menu.price}</p>
            </div>
          </div>
        ))}
      </div>

      <nav className={styles.nav}>
        <div className={styles.navBar}>
          <button className={styles.navTab} onClick={() => navigate('/home')}>
            <img src={HomeInactiveIcon} alt="홈" className={styles.navTabIcon} />
            <span className={styles.navTabLabel}>홈</span>
          </button>
          <button className={styles.navTab} onClick={() => navigate('/settings')}>
            <img src={SettingsInactiveIcon} alt="설정" className={styles.navTabIcon} />
            <span className={styles.navTabLabel}>설정</span>
          </button>
        </div>
        <div className={styles.navFab} onClick={() => navigate('/step1')} style={{ cursor: 'pointer' }}>
          <img src={ForkKnifeIcon} alt="" className={styles.navFabIcon} />
        </div>
      </nav>
    </div>
  );
}
