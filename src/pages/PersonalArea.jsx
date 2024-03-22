import React, { useEffect, useState } from "react";
import "../style/css/main.css";
import "../style/css/App.css";
import "../style/css/modal.css";
import { HiArrowLongLeft, HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LuTruck } from "react-icons/lu";
import { LuScrollText } from "react-icons/lu";
import bekbekei from "../../src/img/bekbekei-h-logo.svg";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const PersonalArea = () => {
  const [openModal, setOpenModal] = useState(false);
  const isOpenModal = () => {
    setOpenModal(true);
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);

  const closeOpenModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <>
      <div id="modal">
        <div className="nav">
          <div className="container nav_content">
            <HiArrowLongLeft className="fi" onClick={() => navigate("/")} />
            <img src={bekbekei} alt="" />
            <HiMiniArrowRightOnRectangle
              className="fi"
              onClick={() => isOpenModal()}
            />
          </div>
          {openModal === true && (
            <div className="filters_oll" onClick={closeOpenModal}>
              <div className="order">
                <div className="acaunt_block_modal">
                  <h3>Выйти из аккаунта?</h3>
                  <button
                    onClick={() =>
                      localStorage.removeItem("token") ||
                      navigate("/to-come-in")
                    }
                  >
                    Да, я выйду
                  </button>
                  <h4>Нет, я останусь</h4>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="container">
          <div className="top_one one">
            <div
              className="area_all"
              onClick={() => navigate("/my-information")}
            >
              <div className="bell">
                <div className="bi">
                  <FiUser className="be" />
                </div>
                <h3 className="mt-2">Мои данные </h3>
              </div>
              <div className="lo">
                <IoIosArrowForward className="be" />
              </div>
            </div>
            <div className="area_all" onClick={() => navigate(`/settings`)}>
              <div className="bell">
                <div className="bi">
                  <IoSettingsOutline className="be" />
                </div>
                <h3 className="mt-2">Настройка</h3>
              </div>
              <div className="lo">
                <IoIosArrowForward className="be" />
              </div>
            </div>
            <div onClick={() => navigate(`/to-help-page`)} className="area_all">
              <div className="bell">
                <div className="bi">
                  <BsQuestionCircle className="be" />
                </div>
                <h3 className="mt-2">Помощь</h3>
              </div>
              <div className="lo">
                <IoIosArrowForward className="be" />
              </div>
            </div>
            <div onClick={() => navigate(`/my-orders`)} className="area_all">
              <div className="bell">
                <div className="bi">
                  <LuScrollText className="be" />
                </div>
                <h3 className="mt-2">Мои заказы</h3>
              </div>
              <div className="lo">
                <IoIosArrowForward className="be" />
              </div>
            </div>
            <div
              onClick={() => navigate(`/delivery-address`)}
              className="area_all"
            >
              <div className="bell">
                <div className="bi">
                  <MdOutlineAddLocationAlt className="be" />
                </div>
                <h3 className="mt-2">Адрес доставки</h3>
              </div>
              <div className="lo">
                <IoIosArrowForward className="be" />
              </div>
            </div>
            <div onClick={() => navigate(`/application`)} className="area_all">
              <div className="bell">
                <div className="bi">
                  <RiErrorWarningLine className="be" />
                </div>
                <h3 className="mt-2">О приложении</h3>
              </div>
              <div className="lo">
                <IoIosArrowForward className="be" />
              </div>
            </div>
            {data?.user?.user_roll === "1" ? (
              <div
                onClick={() =>
                  data.user.roll_request === false
                    ? navigate(`/counterparty-request`)
                    : navigate("/counter-success")
                }
                className="area_all"
              >
                <div className="bell">
                  <div className="bi">
                    <LuTruck className="be" />
                  </div>
                  <h3 className="mt-2">Стать контрагентом</h3>
                </div>
                <div className="lo">
                  <IoIosArrowForward className="be" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalArea;
