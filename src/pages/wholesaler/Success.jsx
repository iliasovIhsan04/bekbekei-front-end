import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import bekbekei from "../../img/bekbekei-h-logo.svg";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="nav">
        <div className="container nav_content">
          <HiArrowLongLeft className="fi" onClick={() => navigate("/")} />
          <img src={bekbekei} alt="" />
          <div />
        </div>
      </div>
      <div className="container">
        <div className="success_block">
          <div className="success_box">
            <h3>Заказ успешно оформлен</h3>
            <p>Наш оператор свяжется с Вами для подтверждения заказа</p>
          </div>
          <button className="button btn_success" onClick={() => navigate("/")}>
            Хорошо
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
