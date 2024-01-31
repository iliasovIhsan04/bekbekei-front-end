import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import icons from "../img/39ecb5044ff738dd9a74c9174b026b8e.jpg";
import axios from "axios";
import { url } from "../Api";

const MyOrders = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeOpenModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [deletedProductId, setProductId] = useState();
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const ordering = async () => {
    try {
      const response = await axios.get(url + "/order/list", { headers });
      setOrder(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    ordering();
  }, []);

  const sum = order[0]?.key;
  const delite = async (id) => {
    try {
      await axios.get(url + `/order/cancel/${id}`, { headers });
    } catch (error) {
      console.log("Ошибка при удалении:", error);
    }
  };

  return (
    <div id="modal">
      <div className="my_orders">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center">
            <HiArrowLongLeft
              className="fi"
              onClick={() => navigate("/dashboard")}
            />
            <p className="header_name">Мои заказы</p>
            <div></div>
          </div>
        </div>
        {sum === true ? (
          <>
            {order &&
              order.map((el, id) => (
                <div key={id} className="order_list" id={"order-" + el.id}>
                  <div className="container">
                    <div className="order_address_block1">
                      <div
                        className="order_box"
                        onClick={() => navigate(`/my-orders-details/${el.id}`)}
                      >
                        <p>{el.address}</p>
                        <span className="order_date">{el.datetime}</span>
                      </div>
                      <div className="date_delete_block">
                        <h4>{el.sum} сом</h4>
                        <span
                          className="order_date"
                          style={{
                            textDecoration: "underline",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                          onClick={() => {
                            setProductId(el.id);
                            setOpenModal(!openModal);
                          }}
                        >
                          Отменить
                        </span>
                      </div>
                    </div>
                    {openModal === true && (
                      <div className="filters_oll" onClick={closeOpenModal}>
                        <div className="order">
                          <div className="acaunt_block_modal">
                            <h3>Вы дейстивтельно хотите отменить заказ?</h3>
                            <button
                              onClick={() => {
                                delite(deletedProductId);
                                document
                                  .getElementById("order-" + deletedProductId)
                                  .remove();
                              }}
                            >
                              Да
                            </button>
                            <h4>Нет</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </>
        ) : (
          <div className="container">
            <div className="ionic ionic_block">
              <div className="ionic_box1">
                <img src={icons} alt="" />
                <h3>Здесь пока пусто</h3>
                <p>Здесь будут отображаеться сделанные вами заказы</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
