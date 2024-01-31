import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { WhoShop } from "../WhoShop";
import WhoShopDetail from "../WhoShopDetail";
import Basket from "../../Basket";
import Cart from "../../Cart";

const App = ({ count }) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [plus, setPlus] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedShopCart = JSON.parse(localStorage.getItem("shopCart")) || [];
    const storedPlus = JSON.parse(localStorage.getItem("plus")) || {};

    setCart(storedCart);
    setShopCart(storedShopCart);
    setPlus(storedPlus);
  }, []);

  const saveToLocalStorage = (id) => {
    const itemToAdd = data.find((item) => item.id === id);

    if (itemToAdd) {
      const updatedCart = cart.includes(itemToAdd)
        ? cart.filter((item) => item.id !== id)
        : [...cart, itemToAdd];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handlePlus = (id) => {
    const itemTo = data.find((el) => el.id === id);
    const itemToLocal = shopCart.find((el) => el.id === id);
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
    } else if (itemToLocal) {
      setShopCart((prevShopCart) => {
        const updatedCart = [...prevShopCart, itemToLocal];
        localStorage.setItem("shopCart", JSON.stringify(updatedCart));
        localStorage.setItem(
          `activePlus_${itemToLocal.id}`,
          `${itemToLocal.id}`
        );
        return updatedCart;
      });

      setPlus((prevPlus) => {
        const newPlus = { ...prevPlus, [id]: (prevPlus[id] || 0) + 1 };
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
    }
  };

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
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
    }
  };

  return (
    <>
      <Routes>
        <Route path="who-shop" element={<WhoShop count={count} />} />
        <Route
          path="who-shop-detail/:cat"
          element={
            <WhoShopDetail
              data={data}
              setData={setData}
              saveToLocalStorage={saveToLocalStorage}
              plus={plus}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          }
        />
        <Route
          path="basket"
          element={
            <Basket
              saveToLocalStorage={saveToLocalStorage}
              plus={plus}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          }
        />
        <Route
          path="cart"
          element={
            <Cart
              saveToLocalStorage={saveToLocalStorage}
              plus={plus}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
