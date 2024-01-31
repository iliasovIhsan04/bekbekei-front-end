import React, { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import bekbekei from "../../img/shipped-truck-svgrepo-com.svg";
import axios from "axios";
import { url } from "../../Api";
import Loading from "../../UI/Loading/Loading";
const Counterparty = () => {
  const navigate = useNavigate();
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    Authorization: `Token ${local}`,
  };
  const headleCounter = () => {
    setIsLoading(true);
    axios
      .get(url + "/auth/roll-request/", { headers })
      .then((response) => {
        if (response.data.response === true) {
          setIsLoading(false);
          navigate("/counter-success");
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div id="modal">
      <div className="сounter_party">
        <div className="nav">
          <div className="container nav_content">
            <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
            <p className="title_h5 all_title_one">Контрагент Бекбекей</p>
            <div />
          </div>
        </div>
        <div className="container">
          <div className="nav_img">
            <img src={bekbekei} alt="" />
          </div>
          <p className="counterparty-text">
            Здесь вы можете отправить запрос на Контрагент, преимущество
            контрагентов:
            <br />
            <br />
            - Заказ онлайн
            <br />
            - Оптовые цены
            <br />- Бесплатная доставка
          </p>
          <button className="button search-button" onClick={headleCounter}>
            {isLoading ? <Loading /> : "Отправить заявку"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counterparty;
