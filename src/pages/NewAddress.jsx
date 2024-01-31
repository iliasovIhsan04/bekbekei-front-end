import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../Api";
import Loading from "../UI/Loading/Loading";
const NewAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    address: "",
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    Authorization: `Token ${local}`,
  };
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(url + "/order/address/add", address, { headers })
      .then((response) => {
        if (response.data.response === true) {
          setIsLoading(true);
          navigate("/delivery-address");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };
  return (
    <div id="modal">
      <div className="new_address">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <HiArrowLongLeft onClick={() => navigate(-1)} className="fi" />
            <p className="header_name">Адрес доставки</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <form className="input_block new_block" onSubmit={handleSubmit}>
            <div className="input_box">
              <label>
                Адрес <span>*</span>
              </label>
              <input
                className="input_form new_add_input"
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn_butto mt-4">
              {isLoading ? <Loading /> : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
