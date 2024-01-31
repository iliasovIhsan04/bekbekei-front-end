import React, { useState, useEffect } from "react";
import "../style/css/main.css";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import icons from "../img/39ecb5044ff738dd9a74c9174b026b8e.jpg";
import IMask from "imask";

const MessagePage = () => {
  useEffect(() => {
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      const masked = IMask(phoneInput, {
        mask: "+996 (000) 00-00-00",
      });
    }
  }, []);

  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCheckboxChange = (value) => {
    if (selectedOption === value) {
      setSelectedOption("");
    } else {
      setSelectedOption(value);
    }
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && file.size <= 5000000) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Пожалуйста, выберите корректное изображение (не более 5 МБ).");
      e.target.value = null;
    }
  };

  return (
    <div id="modal">
      <div className="message_page">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <HiArrowLongLeft
              className="fi"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/promotion")}
              size={20}
            />
            <p className="header_name">Кайтарым байланыш</p>
            <span></span>
          </div>
        </div>
        <div className="container row_two">
          <div className="message_title">
            <p
              className={one ? "active_page" : ""}
              onClick={() => setOne(true) || setTwo(false)}
            >
              Жазуу
            </p>
            <p
              className={two ? "active_page" : ""}
              onClick={() => setOne(false) || setTwo(true)}
            >
              Тарыхы
            </p>
          </div>
          {one === true && (
            <form className="input_block">
              <div className="input_box">
                <label>
                  Аты<span>*</span>
                </label>
                <input className="input_form" type="text" />
              </div>
              <div className="input_box">
                <label>
                  Телефон <span>*</span>
                </label>
                <input
                  id="phone"
                  className="input_form"
                  placeholder="Введите номер"
                />
              </div>
              <div className="input_box">
                <label>
                  Электрондук дарек<span>*</span>
                </label>
                <input className="input_form" type="text" />
              </div>
              <div className="input_box_modal" onClick={openModal}>
                <label>
                  Билдиүүнүн темасы<span>*</span>
                </label>
                <div className="input_arrow">
                  <input type="button" value={selectedOption} />
                  <MdKeyboardArrowDown
                    onClick={openModal}
                    className="right_icons"
                    style={{ cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
              {isModalOpen === true && (
                <div className="filters_oll">
                  <div className="order">
                    <div className="modal_content">
                      <h3> Тема сообщения </h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeModal}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Жалоба"
                        checked={selectedOption === "Жалоба"}
                        onChange={() => handleCheckboxChange("Жалоба")}
                        onClick={closeModal}
                      />
                      <p>Жалоба</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Пожелание"
                        checked={selectedOption === "Пожелание"}
                        onChange={() => handleCheckboxChange("Пожелание")}
                        onClick={closeModal}
                      />
                      <p>Пожелание</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Отзыв"
                        checked={selectedOption === "Отзыв"}
                        onChange={() => handleCheckboxChange("Отзыв")}
                        onClick={closeModal}
                      />
                      <p>Отзыв</p>
                    </label>
                  </div>
                </div>
              )}
              <div className="input_box">
                <label className="photo_span" htmlFor="">
                  Фото тирөө <span>макс 5, 10 МБ чейин </span>
                </label>
                <label>
                  <div className="input_arrow">
                    <MdKeyboardArrowRight
                      className="right_icons"
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                      size={30}
                    />
                    Фото тирөө
                  </div>
                  <input
                    className="input_form"
                    style={{ display: "none" }}
                    id="photoInput"
                    type="file"
                    onChange={handlePhotoChange}
                    accept="image/*"
                  />
                </label>
                {photo && (
                  <img src={photo} alt="selected" className="preview_image" />
                )}
              </div>
              <div className="input_box">
                <label htmlFor="">Билдирүүнүн тексти* </label>
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="text_ares"
                  placeholder="Билдирүүңүздү жазыныз"
                  required
                ></textarea>
              </div>
              <button className="message_btn">Билдирүү жиберүү</button>
            </form>
          )}
          {two === true && (
            <div className="ionic">
              <img src={icons} alt="" />
              <h3>Бул жер азырынча бош</h3>
              <p>
                Бул жер дүкөндөгү белгиленген <br /> товарлар көрсөтүлөт
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
