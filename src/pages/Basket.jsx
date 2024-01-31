import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import "../style/css/App.css";
import "../style/css/main.css";
import "../style/css/modal.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Basket = ({ handlePlus, handleMinus }) => {
  const navigate = useNavigate();
  const [plusFrom, setPlusFrom] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const plusCartFromLocalStorage = JSON.parse(
      localStorage.getItem("shopCart")
    );
    if (plusCartFromLocalStorage.length) {
      setPlusFrom(plusCartFromLocalStorage);
    } else {
      setPlusFrom([]);
    }
  }, []);

  const uniqueIds = new Set();
  const idCounts = {};

  plusFrom.forEach((el) => {
    if (!idCounts[el.id]) {
      idCounts[el.id] = 1;
    } else {
      idCounts[el.id]++;
    }
  });

  const Cout = () => {
    const shopCart = JSON.parse(localStorage.getItem("shopCart"));
    if (shopCart && Array.isArray(shopCart)) {
      let counts = shopCart.reduce(
        (acc, item) => (acc += parseFloat(item.old_price)),
        0
      );
      setCount(counts);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    Cout();
  }, [count]);

  return (
    <div id="modal">
      <div className="nav nav_line">
        <div className="container d-flex justify-content-between align-items-center">
          <HiArrowLongLeft
            onClick={() => navigate("/who-router/who-shop")}
            className="fi"
          />
          <h4 className="title_h5 all_title_one">Корзина</h4>
          <div></div>
        </div>
      </div>
      <div className="container">
        <div className="mt-4 carts ">
          {count
            ? plusFrom.map((el, id) => {
                if (!uniqueIds.has(el.id)) {
                  uniqueIds.add(el.id);
                  const rowElement = document.getElementById("row-" + el.id);
                  return (
                    <div className=" mt-4" key={el.id}>
                      <div className="row" id={"row-" + el.id}>
                        <div
                          className="blocks col-4"
                          onClick={() => navigate(`/shop-all/product/${el.id}`)}
                        >
                          <img className="img_block" src={el.img} alt="" />
                        </div>
                        <div className="col-8 ml">
                          <div className="all">
                            <h3 className="title_one mt">{el.title}</h3>
                            <div className="d-flex  justify-content-between mt-2">
                              <p className="project">
                                <span>{el.pack}</span>
                              </p>
                            </div>
                          </div>
                          <div className="product-column">
                            <span>1 {el.price_for}</span>
                          </div>
                          <div className="flex mt-2">
                            <div
                              className={
                                localStorage.getItem(`activePlus_${el.id}`) ===
                                `${el.id}`
                                  ? "active_plus"
                                  : "plus"
                              }
                            >
                              {localStorage.getItem(`activePlus_${el.id}`) ===
                              `${el.id}` ? (
                                <AiOutlineMinus
                                  className={
                                    localStorage.getItem(
                                      `activePlus_${el.id}`
                                    ) === `${el.id}`
                                      ? "active_minus"
                                      : "fi_ones"
                                  }
                                  onClick={() => {
                                    handleMinus(el.id);
                                    Cout();
                                  }}
                                />
                              ) : (
                                ""
                              )}
                              {localStorage.getItem(`plus`) &&
                              JSON.parse(localStorage.getItem(`plus`))[
                                el.id
                              ] ? (
                                <p
                                  className={
                                    localStorage.getItem(
                                      `activePlus_${el.id}`
                                    ) === `${el.id}`
                                      ? "active_minus fonts"
                                      : "fi_ones "
                                  }
                                >
                                  <span key={el.id}>
                                    {
                                      JSON.parse(localStorage.getItem(`plus`))[
                                        el.id
                                      ]
                                    }
                                  </span>
                                  <span style={{ margin: "0 3px" }}>
                                    {el.price_for}
                                  </span>
                                </p>
                              ) : (
                                rowElement && rowElement.remove()
                              )}
                              <AiOutlinePlus
                                className={
                                  localStorage.getItem(
                                    `activePlus_${el.id}`
                                  ) === `${el.id}`
                                    ? "active_minus"
                                    : "fi_ones"
                                }
                                onClick={() => {
                                  handlePlus(el.id);
                                  Cout();
                                }}
                              />
                            </div>
                            <div className="all">
                              <h2>{el.old_price} сом</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cart_price">
                        <div className="container">
                          <div className="d-flex justify-content-between mt-5">
                            <p>Сумма</p>
                            <h6 className="mt-1 costs"> {count} сом</h6>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <p>Доставка</p>
                            <h6 className="mt-1 costs">Бесплатно</h6>
                          </div>
                          <div className="line mt-3" />
                          <div className="d-flex justify-content-between mt-3">
                            <p>Итого</p>
                            <h6 className="mt-1 cost"> {count} сом</h6>
                          </div>
                          <button
                            className="btn_butto mt-3"
                            onClick={() => navigate("/payment/")}
                          >
                            Оформить заказ
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            : "" || navigate("/who-router/who-shop")}
        </div>
      </div>
    </div>
  );
};

export default Basket;
