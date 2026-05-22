import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "../pages/Splash/Splash";
import Welcome from "../pages/Welcome/Welcome";
import Step1Menu from "../pages/Step1Menu/Step1Menu";
import Step2Vibe from "../pages/Step2Vibe/Step2Vibe";
import Step3Budget from "../pages/Step3Budget/Step3Budget";
import Loading from "../pages/Loading/Loading";
import PickList from "../pages/PickList/PickList";
import SelectCardPage from "../pages/SelectCardPages/SelectCardPage";
import DirectionsView from "../pages/DirectionsView/DirectionsView";
import ConfirmComplete from "../pages/ConfirmComplete/ConfirmComplete";
import DetailOverlay from "../pages/DetailOverlay/DetailOverlay";
import LocationError from "../pages/LocationError/LocationError";
import NetworkError from "../pages/NetworkError/NetworkError";
import SearchError from "../pages/SearchError/SearchError";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/step1" element={<Step1Menu />} />
      <Route path="/step2" element={<Step2Vibe />} />
      <Route path="/step3" element={<Step3Budget />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/pick" element={<PickList />} />
      <Route path="/result" element={<SelectCardPage />} />
      <Route path="/directions" element={<DirectionsView />} />
      <Route path="/confirm" element={<ConfirmComplete />} />
      <Route path="/detail" element={<DetailOverlay />} />
      <Route path="/location-error" element={<LocationError />} />
      <Route path="/network-error" element={<NetworkError />} />
      <Route path="/search-error" element={<SearchError />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
