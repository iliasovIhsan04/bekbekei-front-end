import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { TbCalendar } from "react-icons/tb";
import korzina from "../../src/img/korzina.jpeg";

const BuyHistory = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="buy_history">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center">
            <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
            <p className="header_name">Сатып алуулардын тарыхы</p>
            <TbCalendar className="fi" />
          </div>
        </div>
        <div className="container">
          <div className="ionic buy_block">
            <div className="ionic_box1">
              <div className="block_border">
                <img src={korzina} alt="" />
              </div>
              <h3>Бул жер азырынча бош</h3>
              <p>Сатып алган нерселериниз бул жерде көрсөтүлөт</p>
            </div>
            <button className="ionic_button">
              <h5 className="ionic_button_text">Тарыхты көрсөтүү</h5>
              <p className="ionic_button_date">
                01.10.2023 дан 31.10.2023 чейин
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyHistory;
