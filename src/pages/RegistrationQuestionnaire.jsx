import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const RegistrationQuestionnaire = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [floorModalOpen, setFloorModalOpen] = useState(false);
  const [openlanguage, setOpenLanguage] = useState(false);
  const [openMaritalStatus, setOpenMaritalStatus] = useState(false);
  const [openSocialStatus, setopenSocialStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [option, setOption] = useState("");
  const [floor, setFloor] = useState("");
  const [language, setLanguage] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [socialStatus, setSocialStatus] = useState("");

  const openSocial = () => {
    setopenSocialStatus(true);
  };
  const closeSocial = () => {
    setopenSocialStatus(false);
  };

  const handleCheckboxSocial = (value) => {
    if (socialStatus === value) {
      setSocialStatus("");
    } else {
      setSocialStatus(value);
    }
  };
  // Семейное положения

  const openMarital = () => {
    setOpenMaritalStatus(true);
  };

  const closeMarital = () => {
    setOpenMaritalStatus(false);
  };

  const handleCheckboxMarital = (value) => {
    if (maritalStatus === value) {
      setMaritalStatus("");
    } else {
      setMaritalStatus(value);
    }
  };
  // Язык интерфейса
  const openlanguageModal = () => {
    setOpenLanguage(true);
  };
  const closeLanguageModal = () => {
    setOpenLanguage(false);
  };

  const handleCheckboxLanguage = (value) => {
    if (language === value) {
      setLanguage("");
    } else {
      setLanguage(value);
    }
  };

  //Жынысы
  const openFloor = () => {
    setFloorModalOpen(true);
  };

  const closeFloor = () => {
    setFloorModalOpen(false);
  };

  const handleCheckboxFloor = (value) => {
    if (floor === value) {
      setFloor("");
    } else {
      setFloor(value);
    }
  };

  //   Жашаган шаары
  const openCityModal = () => {
    setCityModal(true);
  };

  const closeCityModal = () => {
    setCityModal(false);
  };

  const checkboxChange = (value) => {
    if (option === value) {
      setOption("");
    } else {
      setOption(value);
    }
  };

  // язык
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

  return (
    <div className="registration">
      <div id="modal">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <span></span>
            <p className="header_name">Каттоо</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="top">
            <h2>Анкета толтуруу</h2>
            <form>
              <div className="input_box">
                <label>
                  Фaмилия <span>*</span>
                </label>
                <input className="input_form new_add_input" type="text" />
              </div>
              <div className="input_box">
                <label>
                  Имя <span>*</span>
                </label>
                <input className="input_form new_add_input" type="text" />
              </div>
              <div className="input_box" onClick={openModal}>
                <label>Родной язык</label>
                <div className="toggle_block infor_block">
                  <input
                    style={{}}
                    className="input_option"
                    type="button"
                    value={selectedOption}
                  />
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
                      <h3>Родной язык</h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeModal}
                        size={20}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Кыргыз"
                        checked={selectedOption === "Кыргыз"}
                        onChange={() => handleCheckboxChange("Кыргыз")}
                        onClick={closeModal}
                      />
                      <p>Кыргыз</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Орус"
                        checked={selectedOption === "Орус"}
                        onChange={() => handleCheckboxChange("Орус")}
                        onClick={closeModal}
                      />
                      <p>Орус</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Англисче"
                        checked={selectedOption === "Англисче"}
                        onChange={() => handleCheckboxChange("Англисче")}
                        onClick={closeModal}
                      />
                      <p>Англисче</p>
                    </label>
                  </div>
                </div>
              )}
              <div className="input_box ">
                <label>
                  Дата рождения <span>*</span>
                </label>
                <input className="input_form new_add_input" type="date" />
              </div>
              <div className="input_box" onClick={openFloor}>
                <label>
                  Пол <span>*</span>
                </label>
                <div className="toggle_block infor_block">
                  <input
                    style={{}}
                    className="input_option"
                    type="button"
                    value={floor}
                  />
                  <MdKeyboardArrowDown
                    onClick={openFloor}
                    className="right_icons"
                    style={{ cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
              {floorModalOpen === true && (
                <div className="filters_oll">
                  <div className="order">
                    <div className="modal_content">
                      <h3>Пол</h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeFloor}
                        size={20}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Эркек"
                        checked={floor === "Эркек"}
                        onChange={() => handleCheckboxFloor("Эркек")}
                        onClick={closeFloor}
                      />
                      <p>Эркек</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Аял"
                        checked={floor === "Аял"}
                        onChange={() => handleCheckboxFloor("Аял")}
                        onClick={closeFloor}
                      />
                      <p>Аял</p>
                    </label>
                  </div>
                </div>
              )}

              <div className="input_box" onClick={openMarital}>
                <label>
                  Семейное положение <span>*</span>
                </label>
                <div className="toggle_block infor_block">
                  <input
                    style={{}}
                    className="input_option"
                    type="button"
                    value={maritalStatus}
                  />
                  <MdKeyboardArrowDown
                    onClick={openFloor}
                    className="right_icons"
                    style={{ cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
              {openMaritalStatus === true && (
                <div className="filters_oll">
                  <div className="order">
                    <div className="modal_content">
                      <h3>Семейное положение</h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeMarital}
                        size={20}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Бойдок"
                        checked={maritalStatus === "Бойдок"}
                        onChange={() => handleCheckboxMarital("Бойдок")}
                        onClick={closeMarital}
                      />
                      <p>Бойдок</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Уй-булолуу"
                        checked={maritalStatus === "Уй-булолуу"}
                        onChange={() => handleCheckboxMarital("Уй-булолуу")}
                        onClick={closeMarital}
                      />
                      <p>Уй-булолуу</p>
                    </label>
                  </div>
                </div>
              )}

              <div className="input_box" onClick={openSocial}>
                <label>
                  Социалный статус <span>*</span>
                </label>
                <div className="toggle_block infor_block">
                  <input
                    style={{}}
                    className="input_option"
                    type="button"
                    value={socialStatus}
                  />
                  <MdKeyboardArrowDown
                    onClick={openSocial}
                    className="right_icons"
                    style={{ cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
              {openSocialStatus === true && (
                <div className="filters_oll">
                  <div className="order">
                    <div className="modal_content">
                      <h3>Социалный статус</h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeSocial}
                        size={20}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Уй кожойкеси"
                        checked={socialStatus === "Уй кожойкеси"}
                        onChange={() => handleCheckboxSocial("Уй кожойкеси")}
                        onClick={closeSocial}
                      />
                      <p>Уй кожойкеси</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Студент"
                        checked={socialStatus === "Студент"}
                        onChange={() => handleCheckboxSocial("Студент")}
                        onClick={closeSocial}
                      />
                      <p>Студент</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Пенсионер"
                        checked={socialStatus === "Пенсионер"}
                        onChange={() => handleCheckboxSocial("Пенсионер")}
                        onClick={closeSocial}
                      />
                      <p>Пенсионер</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Государственный служащий"
                        checked={socialStatus === "Государственный служащий"}
                        onChange={() =>
                          handleCheckboxSocial("Государственный служащий")
                        }
                        onClick={closeSocial}
                      />
                      <p>Государственный служащий</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Сотрудник частной компании"
                        checked={socialStatus === "Сотрудник частной компании"}
                        onChange={() =>
                          handleCheckboxSocial("Сотрудник частной компании")
                        }
                        onClick={closeSocial}
                      />
                      <p>Сотрудник частной компании</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Жумушсуз"
                        checked={socialStatus === "Жумушсуз"}
                        onChange={() => handleCheckboxSocial("Жумушсуз")}
                        onClick={closeSocial}
                      />
                      <p>Жумушсуз</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Частный педприниматель"
                        checked={socialStatus === "Частный педприниматель"}
                        onChange={() =>
                          handleCheckboxSocial("Частный педприниматель")
                        }
                        onClick={closeSocial}
                      />
                      <p>Частный педприниматель</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Башка"
                        checked={socialStatus === "Башка"}
                        onChange={() => handleCheckboxSocial("Башка")}
                        onClick={closeSocial}
                      />
                      <p>Башка</p>
                    </label>
                  </div>
                </div>
              )}

              <div className="input_box" onClick={openCityModal}>
                <label>
                  Город проживания <span>*</span>
                </label>
                <div className="toggle_block infor_block">
                  <input
                    style={{}}
                    className="input_option"
                    type="button"
                    value={option}
                  />
                  <MdKeyboardArrowDown
                    onClick={openCityModal}
                    className="right_icons"
                    style={{ cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
              {cityModal === true && (
                <div className="filters_oll">
                  <div className="order">
                    <div className="modal_content">
                      <h3>Жашаган шаары</h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeCityModal}
                        size={20}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Бишкек"
                        checked={option === "Бишкек"}
                        onChange={() => checkboxChange("Бишкек")}
                        onClick={closeCityModal}
                      />
                      <p>Бишкек</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Кант"
                        checked={option === "Кант"}
                        onChange={() => checkboxChange("Кант")}
                        onClick={closeCityModal}
                      />
                      <p>Кант</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Токмок"
                        checked={option === "Токмок"}
                        onChange={() => checkboxChange("Токмок")}
                        onClick={closeCityModal}
                      />
                      <p>Токмок</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Чолпон-Ата"
                        checked={option === "Чолпон-Ата"}
                        onChange={() => checkboxChange("Чолпон-Ата")}
                        onClick={closeCityModal}
                      />
                      <p>Чолпон-Ата</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Кара_Балта"
                        checked={option === "Кара_Балта"}
                        onChange={() => checkboxChange("Кара_Балта")}
                        onClick={closeCityModal}
                      />
                      <p>Кара_Балта</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Сокулук"
                        checked={option === "Сокулук"}
                        onChange={() => checkboxChange("Сокулук")}
                        onClick={closeCityModal}
                      />
                      <p>Сокулук</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Бостери"
                        checked={option === "Бостери"}
                        onChange={() => checkboxChange("Бостери")}
                        onClick={closeCityModal}
                      />
                      <p>Бостери</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Балыкчы"
                        checked={option === "Балыкчы"}
                        onChange={() => checkboxChange("Балыкчы")}
                        onClick={closeCityModal}
                      />
                      <p>Балыкчы</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Беловодское"
                        checked={option === "Беловодское"}
                        onChange={() => checkboxChange("Беловодское")}
                        onClick={closeCityModal}
                      />
                      <p>Беловодское</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Ош"
                        checked={option === "Ош"}
                        onChange={() => checkboxChange("Ош")}
                        onClick={closeCityModal}
                      />
                      <p>Ош</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Каракол"
                        checked={option === "Каракол"}
                        onChange={() => checkboxChange("Каракол")}
                        onClick={closeCityModal}
                      />
                      <p>Каракол</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Базар-Коргон"
                        checked={option === "Базар-Коргон"}
                        onChange={() => checkboxChange("Базар-Коргон")}
                        onClick={closeCityModal}
                      />
                      <p>Базар-Коргон</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Башка"
                        checked={option === "Башка"}
                        onChange={() => checkboxChange("Башка")}
                        onClick={closeCityModal}
                      />
                      <p>Башка</p>
                    </label>
                  </div>
                </div>
              )}
              <div className="input_box" onClick={openlanguageModal}>
                <label>
                  Язык интерфейса <span>*</span>
                </label>
                <div className="toggle_block infor_block">
                  <input
                    style={{}}
                    className="input_option"
                    type="button"
                    value={language}
                  />
                  <MdKeyboardArrowDown
                    onClick={openlanguage}
                    className="right_icons"
                    style={{ cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
              {openlanguage === true && (
                <div className="filters_oll">
                  <div className="order">
                    <div className="modal_content">
                      <h3>Язык интерфейса</h3>
                      <AiOutlineClose
                        className="close"
                        style={{ border: "none", background: "none" }}
                        onClick={closeLanguageModal}
                        size={20}
                      />
                    </div>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Кыргыз"
                        checked={language === "Кыргыз"}
                        onChange={() => handleCheckboxLanguage("Кыргыз")}
                        onClick={closeLanguageModal}
                      />
                      <p>Кыргыз</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Орус"
                        checked={language === "Орус"}
                        onChange={() => handleCheckboxLanguage("Орус")}
                        onClick={closeLanguageModal}
                      />
                      <p>Орус</p>
                    </label>
                    <label className="detial">
                      <input
                        type="radio"
                        value="Англисче"
                        checked={language === "Англисче"}
                        onChange={() => handleCheckboxLanguage("Англисче")}
                        onClick={closeLanguageModal}
                      />
                      <p>Англисче</p>
                    </label>
                  </div>
                </div>
              )}
              <div className="input_checkbox_block">
                <input type="checkbox" />
                <p>Жеке маалыматтардын иштелишине макулмун</p>
              </div>
              <div className="input_checkbox_block">
                <input type="checkbox" />
                <p>
                  Шарттар менен макулмун
                  <h6>Лоялдуулук программасы</h6>
                </p>
              </div>
              <button className="phone_btn phone_add">Улантуу</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationQuestionnaire;
