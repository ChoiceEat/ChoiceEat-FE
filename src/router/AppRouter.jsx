import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "../pages/Splash/Splash";
import Step1Budget from "../pages/Step1Budget/Step1Budget";
import Step2Vibe from "../pages/Step2Vibe/Step2Vibe";
import Step3Menu from "../pages/Step3Menu/Step3Menu";
import Loading from "../pages/Loading/Loading";
import PickList from "../pages/PickList/PickList";
import SelectCardPage from "../pages/SelectCardPage";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/step1" element={<Step1Budget />} />
      <Route path="/step2" element={<Step2Vibe />} />
      <Route path="/step3" element={<Step3Menu />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/pick" element={<PickList />} />
      <Route path="/result" element={<SelectCardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
