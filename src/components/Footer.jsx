import React from "react";
import { AiOutlineHome, AiOutlineQrcode } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { LuBadgePercent } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/css/main.css";

const Footer = () => {
  const data = useSelector((state) => state.users);
  const destination =
    data?.user?.user_roll === "2" ? "/who-router/who-shop" : "/shop-all/shop";
  return (
    <div id="footer">
      <div className="nav_footer">
        <div className="flex_block">
          <NavLink
            to="/"
            exact="true"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlineHome className="fi ai" />
            <span>Главная</span>
          </NavLink>
        </div>
        <div className="flex_block">
          <NavLink
            to={destination}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <BsShop className="fi ai" />
            <span>Магазин</span>
          </NavLink>
        </div>
        <div className="flex_block">
          <NavLink
            to="/qr-code"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlineQrcode className="fi code" />
            <span className="spamn">Моя карта</span>
          </NavLink>
        </div>
        <div className="flex_block">
          <NavLink
            to="/promotion"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LuBadgePercent className="fi ai" />
            <span>Акции</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
