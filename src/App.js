import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NotFound from './NotFound';

import { Header, Footer, PrivateRoute } from './components';
import Main from './pages/main/Main';
import Info from './pages/info/Info';
import LoginPage from './pages/account/LoginPage/LoginPage';
import SignupPage from './pages/account/SignupPage/SignupPage';
import RankPage from './pages/rank/RankPage';
import MyInfo from './pages/account/MyPage/MyInfo';
import Profile from './pages/account/MyPage/Profile';
import InfoUpdate from './pages/account/MyPage/InfoUpdate';
import ProfileUpdate from './pages/account/MyPage/ProfileUpdate';
import Board from './pages/board';
import KakaoRedirection from './pages/account/LoginPage/KakaoRedirection';
import NaverRedirection from './pages/account/LoginPage/NaverRedirection';
import Developers from './pages/info/Developers';
import Notice from './pages/notice';


function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.aivle19_username !== undefined) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <div className="App">
      <NextUIProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />

        <Routes>
          {/* 로그인 O -> Main, 로그인 X -> Info(소개페이지) */}
          <Route path="/" element={<PrivateRoute isThatTrue={isLogin} isTrue={<Main />} isFalse={<Info />} />}></Route>
          <Route path="/quiz/:key" element={<PrivateRoute isThatTrue={isLogin} isTrue={<Main />} isFalse={<Info />} />}></Route>
          <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/we" element={<Developers />} />
          <Route path="/home" element={<Main />} />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/myinfo" element={<PrivateRoute isThatTrue={isLogin} isTrue={<MyInfo />} isFalse={<LoginPage />} />} />
          <Route path="/profile" element={<PrivateRoute isThatTrue={isLogin} isTrue={<Profile />} isFalse={<LoginPage />} />} />
          <Route path="/infoUpdate" element={<PrivateRoute isThatTrue={isLogin} isTrue={<InfoUpdate />} isFalse={<LoginPage />} />} />
          <Route path="/profileUpdate" element={<PrivateRoute isThatTrue={isLogin} isTrue={<ProfileUpdate />} isFalse={<LoginPage />} />} />
          <Route path="/board/*" element={<PrivateRoute isThatTrue={isLogin} isTrue={<Board />} isFalse={<LoginPage />} />} />
          <Route path="/notice/*" element={<Notice />} />
          <Route path="/accounts/kakao/callback/" element={<KakaoRedirection setIsLogin={setIsLogin} />} />
          <Route path="/accounts/naver/callback/" element={<NaverRedirection setIsLogin={setIsLogin} />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      </NextUIProvider>
    </div>
  );
}

export default App;
