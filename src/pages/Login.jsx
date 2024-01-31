import React, { useState, useEffect, useRef } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/slice/UserSlice";
import Loading from "../UI/Loading/Loading";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { url } from "../Api";
import axios from "axios";
import {
  registerFailure,
  registerSuccess,
} from "../Redux/slice/activationReduser";
import InputMask from "react-input-mask";

const Login = ({ Alert }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLoginEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let userCredential = {
      phone,
      password,
    };
    try {
      const response = await axios.post(url + "/auth/login", userCredential);
      dispatch(registerSuccess(response.data));
      if (response.data.response === true) {
        navigate("/");
        Alert(response.data.message, "success");
      }
      if (response.data.response === false) {
        Alert(response.data.message, "error");
        if (response.data.isactivated === false) {
          localStorage.setItem("phone", phone.replace(/\D/g, ""));
          navigate("/personal/activation");
        }
      }
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("tokens", response.data.token);
      }
      if (response.data.password) {
        setError(response.data);
      }
      if (response.data.phone) {
        setError(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(registerFailure(error.message));
      setIsLoading(false);
    }

    dispatch(loginUser(userCredential)).then((result) => {
      if (result.payload) {
        setPhone("");
        setPassword("");
        navigate("/");
      }
    });
  };

  return (
    <div id="modal">
      <div className="login">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
            <p className="header_name">Войти</p>
            <LiaQuestionCircleSolid
              className="fi"
              onClick={() => navigate("/personal/to-help-page")}
            />
          </div>
        </div>
        <div className="container">
          <form className="login_block pb-4" onSubmit={handleLoginEvent}>
            <div className="input_box">
              <label>
                Номер телефона <span>*</span>
              </label>
              <InputMask
                className="input_form new_add_input"
                mask="+996 (999) 99-99-99"
                maskChar={null}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    placeholder="+996 (700) 10-20-30"
                  />
                )}
              </InputMask>
            </div>
            <div className="input_box">
              <label>
                Пароль <span>*</span>
              </label>
              <input
                className="input_form new_add_input"
                type={visible ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="span-icon" onClick={() => setVisible(!visible)}>
                {visible ? <FaEye /> : <FaEyeSlash />}
              </span>
              {error.password && <p className="red">{error.password}</p>}
            </div>
            <p
              className="forgot_password"
              onClick={() => navigate("/personal/reset-the-password")}
            >
              Забыли пароль?
            </p>
            <button disabled={isLoading} type="submit" className="forgot_btn">
              {isLoading ? <Loading /> : "Войти"}
            </button>
            {error && ""}
            <p className="come_in">
              Еще нет аккаунта?
              <span onClick={() => navigate("/personal/registration")}>
                Зарегистрироваться
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
