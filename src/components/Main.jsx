import React, { useState, useEffect } from "react";
import "../style/css/main.css";
import "../style/css/App.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import Storis from "../Storis/Storis";
import GetShot from "./GetShot";
import logo from "../img/bekbekei-icon.svg";
import NewPromotions from "../pages/NewPromotions";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";
import ReactPullToRefresh from "react-simple-pull-to-refresh";
const Main = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  const data = useSelector((state) => state.users);

  const handleRefresh = async () => {
    try {
      await dispatch(auth());
    } catch (error) {
      console.error("Ошибка инициализации Pull to refresh:", error);
    }
  };
  const users = data?.user;
  return (
    <div className="main-block">
      <Header users={users} />
      <div className="margin_top">
        <div className="container">
          <Storis token={token} />
        </div>
      </div>
      <ReactPullToRefresh
        onRefresh={handleRefresh}
        resistance={3}
        pullDownThreshold={95}
        maxPullDownDistance={110}
        backgroundColor="#ff640d"
        className="pull-on-refresh"
        pullingContent="Потяните вниз, чтобы обновить..."
      >
        <div className="swiper">
          <h1></h1>
          <h1></h1>
          <h1></h1>
          <div className="container">
            {token ? (
              <div className="pt-5">
                <div className="margin_top_all">
                  <div className="margin_top_log">
                    <img src={logo} alt="" className="dio" />
                  </div>
                </div>
                <div
                  className="bonus_block_all"
                  onClick={() => navigate("/qr-code")}
                >
                  <div className="bonus-wrap">
                    <h4 className="title_h">Бонусная карта</h4>
                    <h1 className="title_ha">
                      {data.user.bonus}
                      <span>бонусов</span>
                    </h1>
                  </div>
                  <div className="bonus_img">
                    <img src={data.user.qrimg} alt="" />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <GetShot token={token} user={user} />
          <NewPromotions />
        </div>
      </ReactPullToRefresh>
    </div>
  );
};

export default Main;
