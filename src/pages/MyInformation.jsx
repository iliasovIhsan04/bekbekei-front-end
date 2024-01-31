import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { TbFileSettings } from "react-icons/tb";
import IMask from "imask";
import axios from "axios";
import { url } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const dataSelect = {
  language: [
    {
      leng: "--",
    },
    {
      leng: "Кыргызча",
    },
    {
      leng: "Русский",
    },
  ],
  gender: [
    {
      gen: "--",
    },
    {
      gen: "Мужской",
    },
    {
      gen: "Женский",
    },
  ],
  married: [
    {
      family: "--",
    },
    {
      family: "Холост/не замужем",
    },
    {
      family: "Женат/замужем",
    },
  ],
  social_status: [
    {
      status: "--",
    },
    {
      status: "Студент",
    },
    {
      status: "Пенсионер",
    },
    {
      status: "Сотрудник частной компании",
    },
    {
      status: "Безработный",
    },
    {
      status: "Частный предприниматель",
    },
    {
      status: "Другое",
    },
  ],
  city_accommodation: [
    {
      city: "--",
    },
    {
      city: "Бишкек",
    },
    {
      city: "Кант",
    },
    {
      city: "Токмок",
    },
    {
      city: "Чолпон-ата",
    },
    {
      city: "Кара-Балта",
    },
    {
      city: "Сокулук",
    },
    {
      city: "Бостери",
    },
    {
      city: "Балыкчы",
    },
    {
      city: "Белеводское",
    },
    {
      city: "Ош",
    },
    {
      city: "Каракол",
    },
    {
      city: "Базар-Коргон",
    },
    {
      city: "Другой город",
    },
  ],
};

const MyInformation = ({ Alert }) => {
  const navigate = useNavigate();
  const [inputChanged, setInputChanged] = useState(false);
  const [info, setInfo] = useState({
    phone: "",
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    language: "",
    married: "",
    status: "",
    city: "",
    children: true,
    animal: false,
    car: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");
  const [list, setList] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Token ${local}`,
  };

  useEffect(() => {
    dispatch(auth());
  }, []);

  useEffect(() => {
    if (user) {
      setInfo({
        ...info,
        phone: user.phone,
        last_name: user.last_name,
        first_name: user.first_name,
        language: user.language,
        birthday: user.birthday,
        married: user.married,
        gender: user.gender,
        status: user.status,
        city: user.city,
        animal: user.animal,
        car: user.car,
      });
    }
  }, [user]);

  useEffect(() => {
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      const masked = IMask(phoneInput, {
        mask: "+996 (000) 00-00-00",
      });
    }
  });
  const createPerson = async (e) => {
    e.preventDefault();
    if (local) {
      setLoading(true);

      const post = {
        phone: info.phone,
        first_name: info.first_name,
        last_name: info.last_name,
        birthday: info.birthday,
        gender: info.gender,
        language: info.language,
        married: info.married,
        status: info.status,
        city: info.city,
        car: info.car,
        animal: info.animal,
      };
      try {
        const newTourResponse = await axios.post(
          url + "/auth/update-user-detail",
          post,
          {
            headers,
          }
        );
        setLoading(false);
        setInputChanged(false);
        if (newTourResponse.data.response === true) {
          Alert("Успешно изменен", "success");
        }
      } catch (error) {
        Alert("Ошибка");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && info.car == !user.car) {
      setInputChanged(true);
    } else if (info.first_name !== user.first_name) {
      setInputChanged(true);
    } else if (info.last_name !== user.last_name) {
      setInputChanged(true);
    } else if (info.language !== user.language) {
      setInputChanged(true);
    } else if (info.city !== user.city) {
      setInputChanged(true);
    } else if (info.married !== user.married) {
      setInputChanged(true);
    } else if (info.status !== user.status) {
      setInputChanged(true);
    } else if (info.gender !== user.gender) {
      setInputChanged(true);
    } else if (info.birthday !== user.birthday) {
      setInputChanged(true);
    } else if (info.animal == !user.animal) {
      setInputChanged(true);
    } else {
      setInputChanged(false);
    }
  }, [info]);

  return (
    <div className="my_information">
      {user.last_name ? (
        <div id="modal">
          <div className="nav">
            <div className="container d-flex justify-content-between align-items-center ">
              <HiArrowLongLeft
                className="fi"
                onClick={() => navigate("/dashboard")}
              />
              <p className="header_name">Персональные данные</p>
              <TbFileSettings onClick={createPerson} className="fi" />
            </div>
            <div className={`hover_btn ${inputChanged ? "active" : ""}`}></div>
          </div>
          <div className="form_alls">
            <div className="container">
              <form onSubmit={createPerson}>
                <>
                  <div className="input_form_block top">
                    <div className="input_box">
                      <label>Номер телефона</label>
                      <input
                        disabled={true}
                        id="phone"
                        className="input_form new_add_input"
                        placeholder="996"
                        value={info.phone}
                        onChange={(e) =>
                          setInfo({ ...info, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="input_box">
                      <label>Фaмилия</label>
                      <input
                        className="input_form new_add_input"
                        type="text"
                        value={info.last_name}
                        onChange={(e) => {
                          setInfo({ ...info, last_name: e.target.value });
                          setInputChanged(true);
                        }}
                      />
                    </div>
                    <div className="input_box">
                      <label>Имя</label>
                      <input
                        className="input_form new_add_input"
                        type="text"
                        value={info.first_name}
                        onChange={(e) =>
                          setInfo({ ...info, first_name: e.target.value }) ||
                          setInputChanged(true)
                        }
                      />
                    </div>
                    <div className="input_box ">
                      <label>Дата рождения</label>
                      <input
                        className="input_form new_add_input"
                        type="date"
                        value={info.birthday}
                        onChange={(e) =>
                          setInfo({ ...info, birthday: e.target.value }) ||
                          setInputChanged(true)
                        }
                      />
                    </div>
                    <div className="input_box">
                      <label>Пол</label>
                      <select
                        className="input_select"
                        onChange={(e) =>
                          setInfo({ ...info, gender: e.target.value }) ||
                          setInputChanged(true)
                        }
                        value={info.gender}
                      >
                        {dataSelect.gender.map((el, id) => (
                          <option key={id} value={el.gen}>
                            {el.gen}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="select_arrow" />
                    </div>
                    <div className="input_box">
                      <label>Родной язык</label>
                      <select
                        className="input_select"
                        onChange={(e) =>
                          setInfo({ ...info, language: e.target.value }) ||
                          setInputChanged(true)
                        }
                        value={info.language}
                      >
                        {dataSelect.language.map((el, id) => (
                          <option key={id} value={el.name}>
                            {el.leng}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="select_arrow" />
                    </div>
                    <div className="input_box">
                      <label>Семейное положение</label>
                      <select
                        className="input_select"
                        onChange={(e) =>
                          setInfo({ ...info, married: e.target.value }) ||
                          setInputChanged(true)
                        }
                        value={info.married}
                      >
                        {dataSelect.married.map((el) => (
                          <option value={el.family}>{el.family}</option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="select_arrow" />
                    </div>
                    <div className="input_box">
                      <label>Социальный статус</label>
                      <select
                        className="input_select"
                        onChange={(e) =>
                          setInfo({ ...info, status: e.target.value }) ||
                          setInputChanged(true) ||
                          setInputChanged(false)
                        }
                        value={info.status}
                      >
                        {dataSelect.social_status.map((el) => (
                          <option value={el.status}>{el.status}</option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="select_arrow" />
                    </div>
                    <div className="input_box">
                      <label>Город проживания</label>
                      <select
                        className="input_select"
                        onChange={(e) =>
                          setInfo({ ...info, city: e.target.value }) ||
                          setInputChanged(true)
                        }
                        value={info.city}
                      >
                        {dataSelect.city_accommodation.map((el) => (
                          <option value={el.city}>{el.city}</option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="select_arrow" />
                    </div>
                  </div>
                  <div className="toggle_block toogle_block_inform">
                    <p>Наличие домашних животных</p>
                    <label className="switch">
                      <input
                        onClick={() =>
                          setInfo({ ...info, animal: !info.animal })
                        }
                        type="checkbox"
                        checked={info.animal}
                      />
                      <span className="slider_toggle round"></span>
                    </label>
                  </div>
                  <div className="toggle_block toogle_block_inform bottom_tom">
                    <p>Наличие автомобиля</p>
                    <label className="switch">
                      <input
                        onClick={() => setInfo({ ...info, car: !info.car })}
                        type="checkbox"
                        checked={info.car}
                      />
                      <span className="slider_toggle round"></span>
                    </label>
                  </div>
                </>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyInformation;
