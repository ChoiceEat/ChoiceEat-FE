import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
import MainHome from "../pages/MainHome/MainHome";
import Address from "../pages/Address/Address";
import LocationError from "../pages/LocationError/LocationError";
import NetworkError from "../pages/NetworkError/NetworkError";
import SearchError from "../pages/SearchError/SearchError";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import MenuRecommend from "../pages/MenuRecommend/MenuRecommend";
import MenuHistory from "../pages/MenuHistory/MenuHistory";

const P = ({ children }) => <PrivateRoute>{children}</PrivateRoute>;

export default function AppRouter() {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 보호 라우트 (로그인 필요) */}
      <Route
        path="/home"
        element={
          <P>
            <MainHome />
          </P>
        }
      />
      <Route
        path="/welcome"
        element={
          <P>
            <Welcome />
          </P>
        }
      />
      <Route
        path="/step1"
        element={
          <P>
            <Step1Menu />
          </P>
        }
      />
      <Route
        path="/step2"
        element={
          <P>
            <Step2Vibe />
          </P>
        }
      />
      <Route
        path="/step3"
        element={
          <P>
            <Step3Budget />
          </P>
        }
      />
      <Route
        path="/loading"
        element={
          <P>
            <Loading />
          </P>
        }
      />
      <Route
        path="/pick"
        element={
          <P>
            <PickList />
          </P>
        }
      />
      <Route
        path="/result"
        element={
          <P>
            <SelectCardPage />
          </P>
        }
      />
      <Route
        path="/directions"
        element={
          <P>
            <DirectionsView />
          </P>
        }
      />
      <Route
        path="/confirm"
        element={
          <P>
            <ConfirmComplete />
          </P>
        }
      />
      <Route
        path="/detail"
        element={
          <P>
            <DetailOverlay />
          </P>
        }
      />
      <Route
        path="/address"
        element={
          <P>
            <Address />
          </P>
        }
      />
      <Route
        path="/settings"
        element={
          <P>
            <Settings />
          </P>
        }
      />
      <Route
        path="/menu-recommend"
        element={
          <P>
            <MenuRecommend />
          </P>
        }
      />
      <Route
        path="/menu-history"
        element={
          <P>
            <MenuHistory />
          </P>
        }
      />
      <Route
        path="/location-error"
        element={
          <P>
            <LocationError />
          </P>
        }
      />
      <Route
        path="/network-error"
        element={
          <P>
            <NetworkError />
          </P>
        }
      />
      <Route
        path="/search-error"
        element={
          <P>
            <SearchError />
          </P>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
