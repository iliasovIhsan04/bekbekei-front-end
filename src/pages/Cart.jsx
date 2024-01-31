import React, { useState, useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import icons from "../img/39ecb5044ff738dd9a74c9174b026b8e.jpg";
import { IoCardOutline } from "react-icons/io5";

const Cart = ({}) => {
  const navigate = useNavigate();
  const plusCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [plus, setPlus] = useState({});

  const saveToLocalStorage = (id) => {
    const itemToAdd = data.find((item) => item.id === id);
    if (itemToAdd) {
      const updatedCart = [...cart];
      if (!updatedCart.includes(itemToAdd)) {
        updatedCart.push(itemToAdd);
        localStorage.setItem(`activeItem_${itemToAdd.id}`, "active");
      } else {
        updatedCart.splice(updatedCart.indexOf(itemToAdd), 1);
        localStorage.removeItem(`activeItem_${itemToAdd.id}`);
      }
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Cart updated:", updatedCart);
    }
  };

  const handlePlus = (id) => {
    const itemTo = data.find((el) => el.id === id);
    if (itemTo) {
      setShopCart((prevShopCart) => {
        const updatedCart = [...prevShopCart, itemTo];
        localStorage.setItem("shopCart", JSON.stringify(updatedCart));
        localStorage.setItem(`activePlus_${itemTo.id}`, `${itemTo.id}`);
        return updatedCart;
      });
      setPlus((prevPlus) => {
        const newPlus = { ...prevPlus, [id]: (prevPlus[id] || 0) + 1 };
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
    }
  };
  const mun = JSON.parse(localStorage.getItem("plus"));
  const plusData = JSON.parse(localStorage.getItem("plus"));
  const sum = Object.values(plusData || {}).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const handleMinus = (id) => {
    const itemIndex = shopCart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      setShopCart((prevShopCart) => {
        const updatedCart = [...prevShopCart];
        updatedCart.splice(itemIndex, 1);
        localStorage.setItem("shopCart", JSON.stringify(updatedCart));
        const isItemStillInCart = updatedCart.some((item) => item.id === id);
        if (!isItemStillInCart) {
          localStorage.removeItem(`activePlus_${id}`);
        }
        return updatedCart;
      });
      setPlus((prevPlus) => {
        const newPlus = { ...prevPlus, [id]: (prevPlus[id] || 0) - 1 };
        if (newPlus[id] < 0) {
          newPlus[id] = 0;
        }
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
    }
  };
  const handleOldPrice = () => {
    const shopCart = JSON.parse(localStorage.getItem("shopCart"));
    const updatedOldPrice = shopCart
      .map((item) => Number(item.old_price))
      .reduce((acc, curr) => acc + curr, 0);
    localStorage.setItem("updatedOldPrice", updatedOldPrice);
  };
  return (
    <div>
      <>
        <div id="modal">
          <div className="nav">
            <div className="container d-flex justify-content-between align-items-center">
              <HiArrowLongLeft
                className="fi"
                onClick={() => navigate("/dashboard")}
              />
              <h4 className="title_h5 all_title_one">Избранные тавары</h4>
              <div />
            </div>
          </div>
          {plusCartFromLocalStorage && plusCartFromLocalStorage.length > 0 ? (
            <div className="container">
              <div className="row mt-5">
                {plusCartFromLocalStorage &&
                  plusCartFromLocalStorage.length > 0 &&
                  plusCartFromLocalStorage.map((el, index) => (
                    <div className="col-6 mt-4" key={el.id}>
                      <div
                        className="blocks"
                        onClick={() => navigate(`/shop-all/product/${el.id}`)}
                      >
                        <img src={el.img} alt="" />
                        {localStorage.getItem(`activePlus_${el.id}`) ===
                        `${el.id}` ? (
                          <div className="hover_blocks">
                            {localStorage.getItem(`plus`) &&
                            JSON.parse(localStorage.getItem(`plus`))[el.id] ? (
                              <h1>
                                {
                                  JSON.parse(localStorage.getItem(`plus`))[
                                    el.id
                                  ]
                                }
                              </h1>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="all">
                        <h3 className="title_one mt">{el.title}</h3>
                        <div className="product-info">
                          <div className="product-column">
                            <span>1 {el.price_for}</span>
                            <h2 className="price old">
                              {el.old_price ? el.old_price : el.price} сом
                            </h2>
                          </div>
                          {el.old_price && (
                            <div className="product-column">
                              <span className="card-text">
                                <IoCardOutline className="io5" /> По карте
                              </span>
                              <h2 className="price">{el.price} сом</h2>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-2">
                        <div
                          className={
                            localStorage.getItem(`activeItem_${el.id}`) ===
                            `active`
                              ? "active_marks"
                              : "marks"
                          }
                          onClick={() => saveToLocalStorage(el.id)}
                        >
                          <BsBookmark
                            className={
                              localStorage.getItem(`activeItem_${el.id}`) ===
                              `active`
                                ? "active"
                                : ""
                            }
                          />
                        </div>
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
                                localStorage.getItem(`activePlus_${el.id}`) ===
                                `${el.id}`
                                  ? "active_minus"
                                  : "fi_ones"
                              }
                              onClick={() => {
                                handleMinus(el.id);
                              }}
                            />
                          ) : (
                            ""
                          )}
                          {localStorage.getItem(`plus`) &&
                          JSON.parse(localStorage.getItem(`plus`))[el.id] ? (
                            <p
                              className={
                                localStorage.getItem(`activePlus_${el.id}`) ===
                                `${el.id}`
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
                            <p className="title_one font">Добавить </p>
                          )}
                          {localStorage.getItem(`activePlus_${el.id}`) ===
                          `${el.id}` ? (
                            <button
                              className="button shop_btn"
                              onClick={() => navigate("/who-router/basket")}
                            >
                              {sum} за {localStorage.getItem("updatedOldPrice")}
                            </button>
                          ) : (
                            ""
                          )}
                          <AiOutlinePlus
                            className={
                              localStorage.getItem(`activePlus_${el.id}`) ===
                              `${el.id}`
                                ? "active_minus"
                                : "fi_ones"
                            }
                            onClick={() => {
                              handlePlus(el.id);
                              handleOldPrice();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="ionic">
              <img src={icons} alt="" />
              <h3>Бул жер азырынча бош</h3>
              <p>
                Бул жер дукондогу белгиленген <br /> товарлар корсотулор
              </p>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Cart;
