import React from "react";
import bekbekei from "../../img/bekbekei-h-logo.svg";
import { useNavigate } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";

const WhoHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="who_header">
      <div className="nav">
        <div className="container nav_content">
          <HiArrowLongLeft className="fi" onClick={() => navigate("/")} />
          <img src={bekbekei} alt="" />
          <div />
        </div>
      </div>
      ;
    </div>
  );
};

export default WhoHeader;
