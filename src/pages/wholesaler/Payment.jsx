import React, { useState, useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { url } from "../../Api";
import Loading from "../../UI/Loading/Loading";

export const Payment = ({ Alert }) => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const getData = JSON.parse(localStorage.getItem(`address`));
  const [address, setAddress] = useState({
    address: "",
    product: "",
    count: "",
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    Authorization: `Token ${local}`,
  };
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const plusData = JSON.parse(localStorage.getItem("plus"));
  const shopCart = JSON.parse(localStorage.getItem("shopCart"));

  if (shopCart) {
    const cartIds = shopCart.map((el) => el.id);

    const idCount = cartIds.reduce((acc, id) => {
      if (acc[id]) {
        acc[id] += 1;
      } else {
        acc[id] = 1;
      }
      return acc;
    }, {});
    const result = Object.keys(idCount).map((id) => ({
      productId: parseInt(id),
      count: idCount[id],
    }));
  } else {
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shopCart = JSON.parse(localStorage.getItem("shopCart"));
      const cartIds = shopCart.map((el) => el.id);
      const idCount = cartIds.reduce((acc, id) => {
        if (acc[id]) {
          acc[id] += 1;
        } else {
          acc[id] = 1;
        }
        return acc;
      }, {});
      const productsForOrder = Object.keys(idCount).map((id) => ({
        product: parseInt(id),
        count: idCount[id],
      }));

      const dataToSend = {
        address: getData?.id ? getData?.id : null,
        product_for_order: productsForOrder,
      };
      const response = await axios.post(url + "/order/order", dataToSend, {
        headers,
      });
      if (response.data.response === true) {
        setIsLoading(false);
        shopCart.map((el) => localStorage.removeItem(`activePlus_${el.id}`));
        localStorage.removeItem("myData");
        localStorage.removeItem("cart");
        localStorage.removeItem("updatedOldPrice");
        localStorage.removeItem("address");
        localStorage.removeItem("plus");
        localStorage.removeItem("shopCart");
        navigate("/success");
      }
    } catch (error) {
      if (!localStorage.getItem("address")) {
        Alert("Добавьте адрес прежде чем заказать!", "error");
      }
      setIsLoading(false);
    }
  };
  let count;

  const Cout = () => {
    const shopCart = JSON.parse(localStorage.getItem("shopCart"));
    if (shopCart && Array.isArray(shopCart)) {
      count = shopCart.reduce(
        (acc, item) => (acc += parseFloat(item.old_price || 0)),
        0
      );
    } else {
      count = 0;
    }
  };

  Cout();

  return (
    <div id="modal">
      <div className="nav nav_line">
        <div className="container d-flex justify-content-between align-items-center">
          <HiArrowLongLeft onClick={() => navigate(-1)} className="fi" />
          <h4 className="title_h5 all_title_one">Способ оплаты</h4>
          <div />
        </div>
      </div>
      <div className="orders">
        <div className="container">
          <h2>Адрес доставки</h2>
          <div
            className="select_address"
            onClick={() => navigate("/delivery-address")}
          >
            <div className="d-flex align-items-center">
              <LuMapPin size={24} />
              <span style={{ margin: "0 10px" }} className="project">
                {getData?.status === true ? (
                  <span>{getData?.address}</span>
                ) : (
                  <span>Выберите адрес доставки</span>
                )}
              </span>
            </div>
            <MdKeyboardArrowRight className="fi" />
          </div>
          <div>
            <h2>Заказ</h2>
            <div className="order_payment">
              <div className="d-flex justify-content-between mt-2">
                <p className="pro_payment">Сумма</p>
                <h6 className="mt-1 costs">{count} сом</h6>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <p className="pro_payment">Доставка</p>
                <h6 className="mt-1 costs"> Бесплатно</h6>
              </div>
              <div className="line mt-3" />
              <div className="d-flex justify-content-between mt-3">
                <p className="pro_payment">Итого</p>
                <h6 className="mt-1 cost">{count} сом</h6>
              </div>
            </div>
            <button
              disabled={isLoading}
              className="btn_butto mt-5"
              onClick={handleSubmit}
            >
              {isLoading ? <Loading /> : "Подтвердить заказ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
