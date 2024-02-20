import React from "react";
import { Routes, Route } from "react-router-dom";
import Login2 from "./Login2";
import LandingPage from "./LandingPage";
import Signup2 from "./Signup2";
import HomePage from "./HomePage";
import LoginPopup from "./LoginPopup";
import TestHomePage from "./TestHomePage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/signup" element={<Signup2 />} />
        <Route path="/home" element={<TestHomePage />} />
        <Route path="/loginpopup" element={<LoginPopup />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
