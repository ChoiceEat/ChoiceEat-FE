import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Address.module.scss";
import { MOCK_LOCATIONS, SAMPLE_ADDRESSES } from "../../data/locations";

export default function Address() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const [savedAddresses] = useState(() => {
    const stored = localStorage.getItem("savedAddresses");
    if (!stored) {
      localStorage.setItem("savedAddresses", JSON.stringify(SAMPLE_ADDRESSES));
      return SAMPLE_ADDRESSES;
    }
    return JSON.parse(stored);
  });

  const [activeAddress] = useState(() => {
    const stored = localStorage.getItem("savedAddress");
    if (!stored) {
      localStorage.setItem("savedAddress", JSON.stringify(SAMPLE_ADDRESSES[0]));
      return SAMPLE_ADDRESSES[0];
    }
    return JSON.parse(stored);
  });

  const handleSearch = () => {
    const q = query.trim();
    const results = q
      ? MOCK_LOCATIONS.filter(
          (item) => item.name.includes(q) || item.address.includes(q),
        )
      : MOCK_LOCATIONS;
    setFilteredResults(results);
    setHasSearched(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSelectAddress = (item) => {
    const selected = { name: item.name, address: item.address };
    localStorage.setItem("savedAddress", JSON.stringify(selected));

    const existing = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
    const deduped = existing.filter((a) => a.address !== item.address);
    localStorage.setItem(
      "savedAddresses",
      JSON.stringify([selected, ...deduped]),
    );

    navigate("/home");
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
            placeholder="예) 부기동 123, 부기대로 33"
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
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <li
                key={item.id}
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
                  <p className={styles.resultName}>{item.name}</p>
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
            placeholder="예) 부기동 123, 부기대로 33"
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

      {savedAddresses.length > 0 && (
        <div className={styles.savedSection}>
          <p className={styles.savedTitle}>저장된 주소</p>
          <ul className={styles.results}>
            {savedAddresses.map((item, index) => (
              <li
                key={index}
                className={`${styles.resultItem}${activeAddress?.address === item.address ? ` ${styles.resultActive}` : ""}`}
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
                  <p className={styles.resultName}>{item.name}</p>
                  <p className={styles.resultAddress}>{item.address}</p>
                </div>
                {activeAddress?.address === item.address && (
                  <span className={styles.resultActiveBadge}>현재</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
