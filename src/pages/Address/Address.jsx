import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Address.module.scss";
import {
  searchDestinations,
  saveSelectedDestination,
} from "../../apis/destinationApi";

export default function Address() {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const results = await searchDestinations(q);
      setFilteredResults(results);
      setHasSearched(true);
    } catch (err) {
      console.error("목적지 검색 실패:", err);
      alert("검색에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSelectAddress = async (item) => {
    try {
      const result = await saveSelectedDestination({
        kakaoPlaceId: item.kakaoPlaceId,
        placeName: item.placeName,
        address: item.address,
        roadAddress: item.roadAddress,
        latitude: item.latitude,
        longitude: item.longitude,
        placeUrl: item.placeUrl ?? "",
      });
      console.log("목적지 저장 성공:", result);

      // 로컬에도 저장 (MainHome에서 표시용)
      localStorage.setItem(
        "savedAddress",
        JSON.stringify({ name: item.placeName, address: item.address }),
      );

      navigate(locationState?.next ?? "/home");
    } catch (err) {
      console.error("목적지 저장 실패:", err);
      alert("목적지 저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  const handleBack = () => {
    if (hasSearched) {
      setHasSearched(false);
    } else {
      navigate(-1);
    }
  };

  if (hasSearched) {
    return (
      <div className={`${styles.container} ${styles.resultsView}`}>
        <div className={styles.pillWrap}>
          <button
            className={styles.pillBack}
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <img
              className={styles.backIcon}
              src="/icons/backToaddress.svg"
              alt="뒤로가기"
            />
          </button>
          <input
            className={styles.pillInput}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예) 성북구, 강남역"
            autoFocus
          />
          <button
            className={styles.pillSearch}
            onClick={handleSearch}
            aria-label="검색"
          >
            <img
              src="/icons/address-search.svg"
              alt="검색"
              className={styles.searchIcon}
            />
          </button>
        </div>

        <ul className={styles.results}>
          {loading ? (
            <li className={styles.noResults}>검색 중...</li>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <li
                key={item.kakaoPlaceId}
                className={styles.resultItem}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectAddress(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleSelectAddress(item);
                }}
              >
                <img
                  src="/icons/location.svg"
                  alt="위치"
                  className={styles.resultPin}
                />
                <div className={styles.resultText}>
                  <p className={styles.resultName}>{item.placeName}</p>
                  <p className={styles.resultAddress}>{item.address}</p>
                </div>
              </li>
            ))
          ) : (
            <li className={styles.noResults}>검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.back}
        onClick={handleBack}
        aria-label="뒤로가기"
      >
        <img src="/icons/backG.svg" alt="뒤로가기" />
      </button>

      <h1 className={styles.title}>
        초이스잇에 저장할
        <br />
        주소를 입력해주세요.
      </h1>

      <div className={styles.searchWrap}>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예) 성북구, 강남역"
          />
          <div className={styles.searchLine} />
        </div>
        <button
          className={styles.searchBtn}
          onClick={handleSearch}
          aria-label="검색"
        >
          <img
            src="/icons/address-search.svg"
            alt="검색"
            className={styles.searchIcon}
          />
        </button>
      </div>

      <div className={styles.guide}>
        <div className={styles.guideRow}>
          <span className={styles.guideLabel}>도로명</span>
          <span className={styles.guideEx}>예)</span>
          <span className={styles.guideText}>무학로 33, 도산대로 8길 23</span>
        </div>
        <div className={styles.guideRow}>
          <span className={styles.guideLabel}>동주소</span>
          <span className={styles.guideEx}>예)</span>
          <span className={styles.guideText}>연희동 42-18</span>
        </div>
        <div className={styles.guideRow}>
          <span className={styles.guideLabel}>건물명</span>
          <span className={styles.guideEx}>예)</span>
          <span className={styles.guideText}>역삼동 푸르지오, 텐즈힐</span>
        </div>
      </div>
    </div>
  );
}
