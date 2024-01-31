import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/css/App.css";
import "../style/css/main.css";
import "../style/css/modal.css";
import { url } from "../Api";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);

  useEffect(() => {
    axios
      .get(url + `/product/detail/${id}`)
      .then((response) => setDatas(response.data))
      .catch();
  }, [id]);
  const mun = JSON.parse(localStorage.getItem("plus"));
  return (
    <div id="modal" className="modal-wrap">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center">
          <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
          <h4 className="title_h5 all_title_one">Товар</h4>
          <div />
          <div />
        </div>
      </div>
      <div className="container">
        <div className="block_shop">
          <div className="blocks">
            <img className="date_img" src={datas.img} alt={datas.title} />
          </div>
          <h3 className="product_title my-4">{datas.title}</h3>
          <div className="all_alls mb-0 overflow-hidden">
            <p className="project_product">Номер товара</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="old_price old_price_one">{datas.barrcode}</span>
            </div>
          </div>
          {data?.user?.user_roll === "2" ? (
            <div className="all_alls mb-0 overflow-hidden">
              <p className="project_product">Цена</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="old_price old_price_one datas_price">
                  {datas.wholesale_price
                    ? datas.wholesale_price
                    : datas.wholesale_price} cом
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {data?.user?.user_roll === "1" ? (
            <>
              <div className="all_alls mb-0 overflow-hidden">
                <p className="project_product">Цена</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="old_price old_price_one">
                    {datas.old_price ? datas.old_price : datas.price} сом
                  </span>
                </div>
              </div>
              {datas.old_price && (
                <div className="all_alls mb-0 overflow-hidden">
                  <p className="project_product">
                    <IoCardOutline className="io5" /> По карте
                  </p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="price_data">{datas.price} сом</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
