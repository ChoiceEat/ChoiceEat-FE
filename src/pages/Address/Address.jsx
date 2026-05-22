import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.scss";
import { MOCK_LOCATIONS, SAMPLE_ADDRESSES } from "../../data/locations";

export default function Address() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  if (!localStorage.getItem("savedAddresses")) {
    localStorage.setItem("savedAddresses", JSON.stringify(SAMPLE_ADDRESSES));
  }
  if (!localStorage.getItem("savedAddress")) {
    localStorage.setItem("savedAddress", JSON.stringify(SAMPLE_ADDRESSES[0]));
  }

  const savedAddresses = JSON.parse(
    localStorage.getItem("savedAddresses") || "[]",
  );
  const activeAddress = JSON.parse(
    localStorage.getItem("savedAddress") || "null",
  );

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

  // ── 검색 결과 화면 ──
  if (hasSearched) {
    return (
      <div className="addr-container addr-results-view">
        <div className="addr-pill-wrap">
          <button
            className="addr-pill-back"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <img src="/icons/back.svg" alt="뒤로가기" />
          </button>
          <input
            className="addr-pill-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예) 부기동 123, 부기대로 33"
            autoFocus
          />
          <button
            className="addr-pill-search"
            onClick={handleSearch}
            aria-label="검색"
          >
            <img
              src="/icons/address-search.svg"
              alt="검색"
              className="addr-search-icon"
            />
          </button>
        </div>

        <ul className="addr-results">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <li
                key={item.id}
                className="addr-result-item"
                onClick={() => handleSelectAddress(item)}
              >
                <img
                  src="/icons/location.svg"
                  alt="위치"
                  className="addr-result-pin"
                />
                <div className="addr-result-text">
                  <p className="addr-result-name">{item.name}</p>
                  <p className="addr-result-address">{item.address}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="addr-no-results">검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>
    );
  }

  // ── 초기 입력 화면 ──
  return (
    <div className="addr-container">
      <button className="addr-back" onClick={handleBack} aria-label="뒤로가기">
        <img src="/icons/back.svg" alt="뒤로가기" />
      </button>

      <h1 className="addr-title">
        초이스잇에 저장할
        <br />
        주소를 입력해주세요.
      </h1>

      <div className="addr-search-wrap">
        <div className="addr-input-area">
          <input
            className="addr-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예) 부기동 123, 부기대로 33"
          />
          <div className="addr-search-line" />
        </div>
        <button
          className="addr-search-btn"
          onClick={handleSearch}
          aria-label="검색"
        >
          <img
            src="/icons/address-search.svg"
            alt="검색"
            className="addr-search-icon"
          />
        </button>
      </div>

      <div className="addr-guide">
        <div className="addr-guide-row">
          <span className="addr-guide-label">도로명</span>
          <span className="addr-guide-ex">예)</span>
          <span className="addr-guide-text">무학로 33, 도산대로 8길 23</span>
        </div>
        <div className="addr-guide-row">
          <span className="addr-guide-label">동주소</span>
          <span className="addr-guide-ex">예)</span>
          <span className="addr-guide-text">연희동 42-18</span>
        </div>
        <div className="addr-guide-row">
          <span className="addr-guide-label">건물명</span>
          <span className="addr-guide-ex">예)</span>
          <span className="addr-guide-text">역삼동 푸르지오, 텐즈힐</span>
        </div>
      </div>

      {savedAddresses.length > 0 && (
        <div className="addr-saved-section">
          <p className="addr-saved-title">저장된 주소</p>
          <ul className="addr-results">
            {savedAddresses.map((item, index) => (
              <li
                key={index}
                className={`addr-result-item${activeAddress?.address === item.address ? " addr-result-active" : ""}`}
                onClick={() => handleSelectAddress(item)}
              >
                <img
                  src="/icons/location.svg"
                  alt="위치"
                  className="addr-result-pin"
                />
                <div className="addr-result-text">
                  <p className="addr-result-name">{item.name}</p>
                  <p className="addr-result-address">{item.address}</p>
                </div>
                {activeAddress?.address === item.address && (
                  <span className="addr-result-active-badge">현재</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
