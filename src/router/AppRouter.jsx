import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "../pages/Splash/Splash";
import Welcome from "../pages/Welcome/Welcome";
import Step1Budget from "../pages/Step1Budget/Step1Budget";
import Step2Vibe from "../pages/Step2Vibe/Step2Vibe";
import Step3Menu from "../pages/Step3Menu/Step3Menu";
import Loading from "../pages/Loading/Loading";
import PickList from "../pages/PickList/PickList";
import SelectCardPage from "../pages/SelectCardPages/SelectCardPage";
import DirectionsView from "../pages/DirectionsView/DirectionsView";
import ConfirmComplete from "../pages/ConfirmComplete/ConfirmComplete";
import DetailOverlay from "../pages/DetailOverlay/DetailOverlay";
import MainHome from "../pages/MainHome/MainHome";
import Address from "../pages/Address/Address";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/step1" element={<Step1Budget />} />
      <Route path="/step2" element={<Step2Vibe />} />
      <Route path="/step3" element={<Step3Menu />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/pick" element={<PickList />} />
      <Route path="/result" element={<SelectCardPage />} />
      <Route path="/directions" element={<DirectionsView />} />
      <Route path="/confirm" element={<ConfirmComplete />} />
      <Route path="/detail" element={<DetailOverlay />} />
      <Route path="/home" element={<MainHome />} />
      <Route path="/address" element={<Address />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
