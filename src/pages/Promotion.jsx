import React from "react";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import bekbekei from "../../src/img/bekbekei-h-logo.svg";
import GetShot from "../components/GetShot";
import SpecialOffers from "../components/SpecialOffers";
import { useNavigate } from "react-router";

const Promotion = () => {
  const navigate = useNavigate();
  return (
    <div className="promotion">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <span></span>
          <img className="images" src={bekbekei} alt="Бекбекей" />
          <LiaQuestionCircleSolid
            className="fi"
            onClick={() => navigate("/to-help-page")}
          />
        </div>
      </div>
      <GetShot />
      <SpecialOffers />
    </div>
  );
};

export default Promotion;
