import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { url } from "../Api";
import Loading from "../UI/Loading/Loading";
import { MdDelete } from "react-icons/md";

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = JSON.parse(localStorage.getItem(`address`));
  const [address, setAddress] = useState([]);
  const [orderDelete, setOrderDelete] = useState([]);
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [addressAll, setAddressAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const headers = {
    Authorization: `Token ${local}`,
  };
  const ordering = async () => {
    try {
      const response = await axios.get(url + "/order/address/list/", {
        headers,
      });
      setData(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    ordering();
  }, []);

  const delite = async (id) => {
    try {
      const response = await axios.get(url + `/order/address/delete/${id}`, {
        headers,
      });
      setOrderDelete(response.data);
      localStorage.removeItem("address");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const datas = data[0]?.status;
  const item = localStorage.getItem(`addres`);
  return (
    <div id="modal">
      <div className="delivery_address">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <HiArrowLongLeft onClick={() => navigate(-1)} className="fi" />
            <p className="header_name">Адрес доставки</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="delivery_block">
            <div
              className="address_add"
              onClick={() => navigate("/new-address")}
            >
              <h6>Адрес доставки</h6>
              <p className="add_block">
                <span className="add">+ </span> Добавить
              </p>
            </div>
            {datas === true ? (
              <div
                className="position_address_relt"
                style={{ width: "100%", margin: "30px 0 0 0" }}
              >
                {data.map((el) => (
                  <div className="addres_all" key={el.id}>
                    <div
                      className="radius_block"
                      onClick={() => {
                        localStorage.setItem(`address`, JSON.stringify(el));
                        localStorage.setItem(`addres`, JSON.stringify(true));
                        <div className="block_lean"></div>;
                        navigate("/payment");
                      }}
                    >
                      <div className="border_leans ">
                        <div
                          className={
                            el.active
                              ? "block_lean"
                              : getData?.id == el.id
                              ? "block_lean"
                              : "leans"
                          }
                        ></div>
                      </div>
                      <p className="project" style={{ margin: "0 10px" }}>
                        {el.address}
                      </p>
                    </div>
                    <div className="icons_block">
                      <MdDelete
                        className="icon_delt"
                        onClick={async () => {
                          await delite(el.id);
                          ordering();
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              (
                <div className="loading_delivery">
                  <Loading />
                </div>
              ) && (
                <div className="page_empty mt-5">
                  <h2>Здесь пока пусто</h2>
                  <p>Здесь будут храниться ваши адреса</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
