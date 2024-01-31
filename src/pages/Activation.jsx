import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import bekbekei from "../img/bekbekei-h-logo.svg";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { useNavigate } from "react-router";
import { useState } from "react";
import Loading from "../UI/Loading/Loading";
import {
  registerFailure,
  registerSuccess,
} from "../Redux/slice/activationReduser";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../Api";

const Activation = ({ Alert }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const phone = localStorage.getItem("phone");
  let repeatActivationCredential = {
    phone,
  };
  const handleCode = () => {
    axios.post(url + "/auth/send-code", repeatActivationCredential);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (code == "") {
      Alert("Введите код подтверждения", "error");
      setLoading(false);
    } else {
      const phone = localStorage.getItem("phone");

      let activationCredential = {
        phone,
        code,
      };
      try {
        const response = await axios.post(
          url + "/auth/verify-phone",
          activationCredential
        );
        dispatch(registerSuccess(response.data));
        if (response.data.response === false) {
          Alert(response.data.message, "error");
        }
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("tokens", response.data.token);
        }
        if (response.data.response === true) {
          Alert(response.data.message, "success");
          navigate("/");
        }
        if (response.data.code) {
          setError(response.data);
        }
        setLoading(false);
      } catch (error) {
        dispatch(registerFailure(error.message));
      }
      setLoading(false);
    }
  };

  return (
    <div id="modal">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
          <img className="images" src={bekbekei} alt="Бекбекей" />
          <LiaQuestionCircleSolid
            className="fi"
            onClick={() => navigate("/personal/to-help-page")}
          />
        </div>
      </div>
      <div className="container">
        <div className="activation">
          <p>Введитe код подтверждения из CMC</p>
          <form onSubmit={handleSubmit}>
            <input
              style={{ textAlign: "center" }}
              className="input_form"
              value={code}
              type="number"
              placeholder="Введите код"
              onChange={(e) => setCode(e.target.value)}
            />
            {error.code && <p className="red">{error.code}</p>}
            <button
              disabled={loading}
              style={{ marginTop: 20 }}
              className="registr_btn"
              type="submit"
            >
              {loading ? <Loading /> : "Подтвердить"}
            </button>
            <button onClick={handleCode} className="repeat_the_code_btn">
              Отправить снова код
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Activation;
