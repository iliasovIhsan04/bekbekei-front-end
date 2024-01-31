import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../Api";
import { HiArrowLongLeft } from "react-icons/hi2";

const MyOrdersDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    axios
      .get(url + `/order/${id}`, { headers })
      .then((response) => setOrderDetail(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const forOrder = orderDetail?.product_for_order

  return (
    <div id="modal">
      <div className="my_orders">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center">
            <HiArrowLongLeft
              className="fi"
              onClick={() => navigate("/my-orders")}
            />
            <p className="header_name">Заказ № {orderDetail.id}</p>
            <div></div>
          </div>
        </div>
        {forOrder?.map((el, id) => (
          <div key={id} className="order_list">
            <div className="container">
              <div className="order_address">
                <p> {el.product} </p>
                <h4 className="details_price">{el.price} сом</h4>
              </div>
              <span className="order_date">
                {el.count} {el.price_for}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersDetails;
