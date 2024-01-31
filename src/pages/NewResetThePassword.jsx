import React, { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { url } from "../Api";
import { useDispatch } from "react-redux";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../Redux/slice/authReducer";
import Loading from "../UI/Loading/Loading";

const NewResetThePassword = ({ Alert }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [local, setLocal] = useState(localStorage.getItem("token_block"));

  const headers = {
    Authorization: `Token ${local}`,
  };
  const handleNewSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newPasswordCredential = {
      password,
      confirm_password,
    };
    dispatch(registerStart());
    try {
      const response = await axios.post(
        `${url}/auth/change-password`,
        newPasswordCredential,
        { headers }
      );
      if (response.data.response === true) {
        Alert(response.data.message, "success");
        navigate("/personal/login");
      }
      if (response.data.password || response.data.confirm_password) {
        setError(response.data);
      }
      if (response.data.response === false) {
        Alert(response.data.message, "error");
      }
      dispatch(registerSuccess(response.data));
    } catch (error) {
      dispatch(registerFailure(error.message));
      Alert("Ошибка", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div id="modal">
      <div className="new_reset_the_password">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
            <p className="header_name">Новый пароль</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleNewSubmit}>
            <div className="input_box">
              <label>
                Пароль <span>*</span>
              </label>
              <input
                className="input_form new_add_input"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="span-icon" onClick={() => setVisible(!visible)}>
                {visible ? <FaEye /> : <FaEyeSlash />}
              </span>
              {error.password && <p className="red">{error.password}</p>}
            </div>
            <div className="input_box">
              <label>
                Повторите пароль <span>*</span>
              </label>
              <input
                className="input_form new_add_input"
                type={visible2 ? "text" : "password"}
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="span-icon"
                onClick={() => setVisible2(!visible2)}
              >
                {visible2 ? <FaEye /> : <FaEyeSlash />}
              </span>
              {error.confirm_password && (
                <p className="red">{error.confirm_password}</p>
              )}
            </div>
            <button
              disabled={isLoading}
              style={{ marginTop: 20 }}
              className="registr_btn new_btn"
              type="submit"
            >
              {isLoading ? <Loading /> : "Отправить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewResetThePassword;
