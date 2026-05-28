import { Map, MapMarker } from "react-kakao-maps-sdk";

function KakaoMap({ lat, lng }) {
  const markerPos = { lat: lat ?? 37.5665, lng: lng ?? 126.968 };

  const center = { lat: (lat ?? 37.5665) - 0.003, lng: lng ?? 126.968 };

  return (
    <Map center={center} style={{ width: "100%", height: "100%" }} level={3}>
      <MapMarker position={markerPos} />
    </Map>
  );
}

export default KakaoMap;
