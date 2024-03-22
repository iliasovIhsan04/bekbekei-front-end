import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { TbFileSettings } from "react-icons/tb";
import axios from "axios";
import { url } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";

const Settings = ({ Alert }) => {
  const [openModalSetting, setOpenModalSetting] = useState(false);
  const isOpenModal1 = () => {
    setOpenModalSetting(true);
  };

  const closeOpenModal = () => {
    setOpenModalSetting(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [inputChanged, setInputChanged] = useState(false);
  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    email: "",
    notification: true,
    auto_brightness: true,
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  useEffect(() => {
    if (user) {
      setInputInfo({
        ...inputInfo,
        email: user.email,
        notification: user.notification,
        auto_brightness: user.auto_brightness,
      });
    }
  }, [user]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const data = {
    email: inputInfo.email,
    notification: inputInfo.notification,
    auto_brightness: inputInfo.auto_brightness,
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(url + "/auth/notification", data, {
        headers,
      });
      if (response.data.response === true) {
        Alert("Успешно изменен", "success");
      }
      setInputChanged(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.get(url + "/auth/delete-account", {
        headers,
      });
      if (response.data.response === true) {
        Alert(response.data.message, "success");
        localStorage.removeItem("token");
        localStorage.removeItem("tokens");
        localStorage.removeItem("token_block");
        navigate("/personal/to-come-in");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div id="modal">
      <div className="settings">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <HiArrowLongLeft onClick={() => navigate(-1)} className="fi" />
            <p className="header_name">Настройки</p>
            <TbFileSettings className="fi" onClick={handleSubmit} />
            <div className={`hover_btn ${inputChanged ? "active" : ""}`}></div>
          </div>
        </div>
        <div className="container">
          <div className="settings_block">
            <h5 className="settings_title">Уведомления</h5>
            <div className="toggle_block">
              <p>Получать уведомления</p>
              <label className="switch">
                <input
                  onClick={() =>
                    setInputInfo({
                      ...inputInfo,
                      notification: !inputInfo.notification,
                    }) || setInputChanged(true)
                  }
                  type="checkbox"
                  checked={inputInfo.notification}
                />
                <span className="slider_toggle round"></span>
              </label>
            </div>
            <div className="toggle_block">
              <p>Получать письма на email</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={receiveEmails}
                  onChange={() => {
                    setReceiveEmails(!receiveEmails);
                    setInputChanged(true);
                  }}
                />
                <span className="slider_toggle round"></span>
              </label>
            </div>
            <div>
              {receiveEmails && (
                <div>
                  <input
                    className="toggle_block"
                    style={{ outline: "none", border: "none" }}
                    type="text"
                    placeholder="email"
                    value={inputInfo.email}
                    onChange={(e) =>
                      setInputInfo({
                        ...inputInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>
            <h5 className="settings_title">Настройки приложения</h5>
            <p className="settings_kart">
              Автояркость нужна для корректного считывания штрихкода
            </p>
            <div className="toggle_block">
              <p>Включить автояркость</p>
              <label className="switch">
                <input
                  onClick={() =>
                    setInputInfo({
                      ...inputInfo,
                      auto_brightness: !inputInfo.auto_brightness,
                    }) || setInputChanged(true)
                  }
                  type="checkbox"
                  checked={inputInfo.auto_brightness}
                />
                <span className="slider_toggle round"></span>
              </label>
            </div>
            {/*// <div className="input_box_modal" onClick={openModal}>*/}
            {/*//     <label className="language">Интерфейстин тили</label>*/}
            {/*//     <div className="toggle_block">*/}
            {/*//         <input*/}
            {/*//             style={{}}*/}
            {/*//             className="input_option"*/}
            {/*            type="button"*/}
            {/*            value={selectedOption}*/}
            {/*        />*/}
            {/*        <MdKeyboardArrowDown*/}
            {/*            onClick={openModal}*/}
            {/*            className="right_icons"*/}
            {/*            style={{cursor: "pointer"}}*/}
            {/*            size={30}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*{isModalOpen === true && (*/}
            {/*    <div className="filters_oll">*/}
            {/*        <div className="order">*/}
            {/*            <div className="modal_content">*/}
            {/*                <h3>Настройка приложения</h3>*/}
            {/*                <AiOutlineClose*/}
            {/*                    className="close"*/}
            {/*                    style={{border: "none", background: "none"}}*/}
            {/*                    onClick={closeModal}*/}
            {/*                    size={20}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <label className="detial">*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    value="Кыргыз"*/}
            {/*                    checked={selectedOption === "Кыргыз"}*/}
            {/*                    onChange={() => handleCheckboxChange("Кыргыз")}*/}
            {/*                    onClick={closeModal}*/}
            {/*                />*/}
            {/*                <p>Кыргыз</p>*/}
            {/*            </label>*/}
            {/*            <label className="detial">*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    value="Орус"*/}
            {/*                    checked={selectedOption === "Орус"}*/}
            {/*                    onChange={() => handleCheckboxChange("Орус")}*/}
            {/*                    onClick={closeModal}*/}
            {/*                />*/}
            {/*                <p>Орус</p>*/}
            {/*            </label>*/}
            {/*            <label className="detial">*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    value="Англисче"*/}
            {/*                    checked={selectedOption === "Англисче"}*/}
            {/*                    onChange={() => handleCheckboxChange("Англисче")}*/}
            {/*                    onClick={closeModal}*/}
            {/*                />*/}
            {/*                <p>Англисче</p>*/}
            {/*            </label>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <h5
              className="settings_title akaunt_remove"
              onClick={() => isOpenModal1()}
            >
              Удалить аккаунт
            </h5>
            {openModalSetting === true && (
              <div className="filters_oll" onClick={closeOpenModal}>
                <div className="order">
                  <div className="acaunt_block_modal">
                    <h3>Вы действительно хотите удалить?</h3>
                    <button onClick={deleteAccount}>Да</button>
                    <h4>Нет</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
