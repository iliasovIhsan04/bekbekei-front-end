import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import bekbekei from "../img/bekbekei-h-logo.svg";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { useNavigate } from "react-router";
import Loading from "../UI/Loading/Loading";
import {
  registerFailure,
  registerSuccess,
} from "../Redux/slice/activationReduser";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../Api";
import OtpInput from "otp-input-react";

const ActivationCode = ({ Alert }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState([]);

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    if (code.length === 6) {
      const storedPhone = JSON.parse(localStorage.getItem("phone"));
      setIsLoading(true);
      let activationCodeCredential = {
        phone: storedPhone,
        code,
      };
      try {
        const response = await axios.post(
          url + "/auth/reset-password-verify",
          activationCodeCredential
        );
        dispatch(registerSuccess(response.data));
        if (response.data.response === true) {
          navigate("/personal/reset-password");
        }
        setIsLoading(false);
        if (response.data.response === false) {
          Alert(response.data.message, "error");
        }
        if (response.data.code) {
          setError(response.data);
        }
        if (response.data.token) {
          localStorage.setItem("token_block", response.data.token);
        }
      } catch (error) {
        dispatch(registerFailure(error.message));
        setIsLoading(false);
      }
    } else {
      Alert("Заполните все поля!", "error");
    }
  };

  useEffect(() => {
    if (error.code) {
      Alert("Ведите только цифры!", "error");
    }
  }, [error.code]);

  return (
    <div id="modal">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
          <img className="images" src={bekbekei} alt="Бекбекей" />
          <LiaQuestionCircleSolid
            className="fi"
            onClick={() => navigate("/to-help-page")}
          />
        </div>
      </div>
      <div className="container">
        <div className="activation">
          <p>Введите код, который мы вам отправили на сообщение</p>
          <form onSubmit={handleCodeSubmit}>
            <OtpInput
              value={code}
              onChange={(value) => setCode(value)}
              OTPLength={6}
              OtpType="number"
              disabled={false}
              autoFocus
              className="otp_container"
            ></OtpInput>
            <button
              disabled={isloading}
              style={{ marginTop: 20 }}
              className="registr_btn"
              type="submit"
            >
              {isloading ? <Loading /> : "Подтвердить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivationCode;
