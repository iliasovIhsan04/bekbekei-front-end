import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiArrowLongLeft, HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsSearch } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { url } from "../../Api";
import Slider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../UI/Modal/Modal";
const MIN = 40;
const MAX = 500;
const WhoShopDetail = ({
  data,
  setData,
  handlePlus,
  handleMinus,
  modalSorting,
  setmodalSorting,
}) => {
  const [tabs, setTabs] = useState([]);
  const { cat, name } = useParams();
  const [query, setQuery] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastClicked, setLastClicked] = useState("dataClicks");
  const navigate = useNavigate();
  const [sub_cat, setSubCat] = useState(0);
  const [filters, setFilters] = useState(false);
  const [search, setSearch] = useState(false);
  const [all, setAll] = useState(0);
  const [storedSales, setStoredSales] = useState([]);
  const [price, setPrice] = useState([]);
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const [requests, setRequests] = useState({
    budget: [MIN, MAX],
  });

  const dispatch = useDispatch();
  const dataContr = useSelector((state) => state.users);

  const api = "product/list";
  useEffect(() => {
    axios
      .get(`${url}/${api}?cat=${cat}`, { headers })
      .then((response) => setData(response.data));
  }, []);
  const dataClick = async (dataID) => {
    try {
      const response = await axios.get(`${url}/${api}?cat=${dataID}`, {
        headers,
      });
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
      setSearch(false);
    }
  };
  const fetchData = async (subCatId) => {
    try {
      const response = await axios.get(`${url}/${api}?sub_cat=${subCatId}`, {
        headers,
      });
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
      setSearch(false);
      setRequests({
        budget: [MIN, MAX],
      });
    }
  };
  const filtersData = async () => {
    try {
      const response = await axios.get(
        `${url}/${api}?pricefrom=${requests.budget[0]}&priceto=${requests.budget[1]}`
      );
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
      setSearch(false);
    }
  };

  const handleSearchButtonClick = async () => {
    try {
      const response = await axios.get(`${url}/${api}?search=${query}`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
      setSearch(false);
    }
  };
  const dataClicks = () => {
    setAll(cat);
    setSelectedIndex(tabs.findIndex((el) => el.id === cat));
    dataClick(cat);
    setLastClicked("dataClicks");
  };

  const handleTabClick = (selectedId) => {
    setSubCat(selectedId);
    setSelectedIndex(tabs.findIndex((el) => el.id === selectedId));
    fetchData(selectedId);
    setLastClicked("handleTabClick");
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    axios
      .get(url + `/product/sub-categories/${cat}`)
      .then((response) => {
        const categoryProducts = response.data;
        setTabs(categoryProducts);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [cat]);

  const handleTitleMinus = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=-title`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handleTitle = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=title`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handlePrice = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=price`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handlePriceMinus = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=-price`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handleSales = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=-sales`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };

  useEffect(() => {
    const salesFromLocalStorage = localStorage.getItem("storedSales");
    if (salesFromLocalStorage) {
      setStoredSales(JSON.parse(salesFromLocalStorage));
    }
  }, []);
  useEffect(() => {
    const salesFromLocalStorage = localStorage.getItem("price");
    if (salesFromLocalStorage) {
      setPrice(JSON.parse(salesFromLocalStorage));
    }
  }, []);
  const plusData = JSON.parse(localStorage.getItem("plus"));
  const sum = Object.values(plusData || {}).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <>
      <div id="modal">
        <div className="nav_line">
          <div>
            <div className="container d-flex justify-content-between align-items-center ner">
              <HiArrowLongLeft
                className="fi"
                onClick={() => navigate("/who-router/who-shop")}
              />
              <h4 className="title_h5 all_title_one">Каталог, товары</h4>
              <BsSearch className="fi" onClick={() => setSearch(true)} />
            </div>
            <div
              style={{ padding: "18px", borderBottom: "0.5px solid #f4f4f4" }}
              className="container d-flex align-items-center scroll"
            >
              <div className="from_btn">
                <div
                  className={
                    lastClicked === "handleTabClick"
                      ? "btn_tabs"
                      : "btn_tabs_active"
                  }
                  onClick={dataClicks}
                >
                  Все
                </div>
              </div>
              {tabs.map((el, index) => (
                <div className="from_btn" key={el.id}>
                  <div
                    key={el.id}
                    className={
                      lastClicked === "dataClicks"
                        ? "btn_tabs"
                        : index === selectedIndex
                        ? "btn_tabs_active"
                        : "btn_tabs"
                    }
                    onClick={() => handleTabClick(el.id)}
                  >
                    {el.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="container">
              <div className="filter">
                <div
                  className="dnow d-flex align-items-center justify-content-center"
                  onClick={() => setFilters(true)}
                >
                  <FiFilter className="icons" />
                  <h6 className="title_one mt_one">Фильтр</h6>
                </div>
                <div className="dnow_one" />
                <div
                  className="dnow d-flex align-items-center justify-content-center"
                  onClick={() => setmodalSorting(true)}
                >
                  <HiOutlineArrowsUpDown className="icons" />
                  <h6 className="title_one mt_one">Сортировка</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {search === true && (
          <div id="modal_one">
            <div className="nav">
              <div className="container d-flex justify-content-between align-items-center">
                <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
                <h4 className="title_h5 all_title">Поиск</h4>
                <div />
              </div>
            </div>
            <div className="container search_in">
              <input
                className="input_form_all mt-4"
                type="text"
                placeholder="Поиск..."
                value={query}
                onChange={handleInputChange}
              />
              <button
                className="search-button"
                onClick={handleSearchButtonClick}
              >
                Поиск
              </button>
            </div>
          </div>
        )}
        {filters === true && (
          <div id="modal_one">
            <div className="nav_line">
              <div className="">
                <div className=" d-flex justify-content-between align-items-center ner">
                  <HiArrowLongLeft
                    className="fi"
                    onClick={() => navigate(-1)}
                  />
                  <h4 className="title_h5 all_title_one">Сортировка</h4>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="container iner">
              <h3 className="title_h4 mt-5" style={{ color: "#000" }}>
                Цена
              </h3>
              <div className="renge mt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="value">
                      <span className="values">{requests.budget[0]}</span>
                    </div>
                    <h6 className="title_h6 nava">От</h6>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="value">
                      <span className="values"> {requests.budget[1]}</span>
                    </div>
                    <h6 className="title_h6 nava">До</h6>
                  </div>
                </div>
                <Slider
                  className="slider mt-4"
                  onChange={(newBudget) =>
                    setRequests({ ...requests, budget: newBudget })
                  }
                  value={requests.budget}
                  min={MIN}
                  max={MAX}
                />
              </div>
            </div>
            <div className="container">
              <button className="btn_button all_btn" onClick={filtersData}>
                Применить
              </button>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row row_one pb-detail">
            {data &&
              data.length > 0 &&
              data.map((el, index) => (
                <div className="col-6 mt-4" key={el.id}>
                  <div
                    className="blocks"
                    onClick={() => navigate(`/shop-all/product/${el.id}`)}
                  >
                    <img src={el.img} alt="" />
                    {localStorage.getItem(`activePlus_${el.id}`) ===
                    `${el.id}` ? (
                      <div className="hover_blocks">
                        {localStorage.getItem(`plus`) &&
                        JSON.parse(localStorage.getItem(`plus`))[el.id] ? (
                          <h1>
                            {JSON.parse(localStorage.getItem(`plus`))[el.id]}
                          </h1>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="all">
                    <h3 className="title_one mt">{el.title}</h3>
                    <div className="product-info">
                      {dataContr?.user?.user_roll === "2" ? (
                        <div className="product-column">
                          <span>1 {el.price_for}</span>
                          <h2 className="price old">
                            {el.old_price ? el.old_price : el.old_price} сом
                          </h2>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {dataContr?.user?.user_roll === "1" ? (
                      <div className="product-info">
                        <div className="product-column">
                          <span>1 {el.price_for}</span>
                          <h2 className="price old">
                            {el.old_price ? el.old_price : el.price} сом
                          </h2>
                        </div>
                        {el.old_price && (
                          <div className="product-column">
                            <span className="card-text">
                              <IoCardOutline className="io5" /> По карте
                            </span>
                            <h2 className="price">{el.price} сом</h2>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex mt-2">
                    <div
                      className={
                        localStorage.getItem(`activePlus_${el.id}`) ===
                        `${el.id}`
                          ? "active_plus"
                          : "plus"
                      }
                    >
                      {localStorage.getItem(`activePlus_${el.id}`) ===
                      `${el.id}` ? (
                        <AiOutlineMinus
                          className={
                            localStorage.getItem(`activePlus_${el.id}`) ===
                            `${el.id}`
                              ? "active_minus"
                              : "fi_ones"
                          }
                          onClick={() => {
                            handleMinus(el.id);
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {localStorage.getItem(`plus`) &&
                      JSON.parse(localStorage.getItem(`plus`))[el.id] ? (
                        <p
                          className={
                            localStorage.getItem(`activePlus_${el.id}`) ===
                            `${el.id}`
                              ? "active_minus fonts"
                              : "fi_ones "
                          }
                        >
                          <span key={el.id}>
                            {JSON.parse(localStorage.getItem(`plus`))[el.id]}
                          </span>
                          <span style={{ margin: "0 3px" }}>
                            {el.price_for}
                          </span>
                        </p>
                      ) : (
                        <p className="title_one font">Добавить </p>
                      )}
                      <AiOutlinePlus
                        className={
                          localStorage.getItem(`activePlus_${el.id}`) ===
                          `${el.id}`
                            ? "active_minus"
                            : "fi_ones"
                        }
                        onClick={() => {
                          handlePlus(el.id);
                        }}
                      />
                    </div>
                    {localStorage.getItem(`activePlus_${el.id}`) ===
                    `${el.id}` ? (
                      <button
                        className="button shop_btn"
                        onClick={() => navigate("/who-router/basket")}
                      >
                        Продолжить
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {data &&
        data.length > 0 &&
        data.map((el) => (
          <div>
            {modalSorting && (
              <Modal setModal={setmodalSorting}>
                <div className="order" onClick={(e) => e.stopPropagation()}>
                  <div className="container">
                    <div className="d-flex justify-content-between">
                      <h6 className="title_h3 orders">Сортировка</h6>
                    </div>
                    <div className="sort-wrap">
                      <input
                        id="wp-comment-cookies-consent"
                        name="wp-comment-cookies-consent"
                        type="checkbox"
                        value="yes"
                        onClick={() => setmodalSorting(false)}
                      />
                      <h6 className="title_one m-lg-2">По умолчение</h6>
                    </div>
                    <div className="sort-wrap" onClick={() => handleSales()}>
                      <input
                        id="popular-checkbox"
                        name="popular-sort"
                        type="checkbox"
                        value="yes"
                        onClick={() => setmodalSorting(false)}
                      />
                      <label
                        htmlFor="popular-checkbox"
                        className="title_one m-lg-2"
                      >
                        Сначала популярные
                      </label>
                    </div>
                    <div
                      className="sort-wrap"
                      onClick={handlePrice || setmodalSorting(false)}
                    >
                      <input
                        id="wp-comment-cookies-consent"
                        name="wp-comment-cookies-consent"
                        type="checkbox"
                        value="yes"
                        onClick={() => setmodalSorting(false)}
                      />
                      <label
                        htmlFor="popular-checkbox"
                        className="title_one m-lg-2"
                      >
                        Сначала дешевые
                      </label>
                    </div>
                    <div
                      className="sort-wrap"
                      onClick={handlePriceMinus || setmodalSorting(false)}
                    >
                      <input
                        id="wp-comment-cookies-consent"
                        name="wp-comment-cookies-consent"
                        type="checkbox"
                        value="yes"
                        onClick={() => setmodalSorting(false)}
                      />
                      <label
                        htmlFor="popular-checkbox"
                        className="title_one m-lg-2"
                      >
                        Сначала дорогие
                      </label>
                    </div>
                    <div
                      className="sort-wrap"
                      onClick={handleTitle || setmodalSorting(false)}
                    >
                      <input
                        id="wp-comment-cookies-consent"
                        name="wp-comment-cookies-consent"
                        type="checkbox"
                        value="yes"
                        onClick={() => setmodalSorting(false)}
                      />
                      <label
                        htmlFor="popular-checkbox"
                        className="title_one m-lg-2"
                      >
                        По алфавиту от А до Я
                      </label>
                    </div>
                    <div
                      className="sort-wrap"
                      onClick={handleTitleMinus || setmodalSorting(false)}
                    >
                      <input
                        id="wp-comment-cookies-consent"
                        name="wp-comment-cookies-consent"
                        type="checkbox"
                        value={el.title}
                        onClick={() => setmodalSorting(false)}
                      />
                      <label
                        htmlFor="popular-checkbox"
                        className="title_one m-lg-2"
                      >
                        По алфавиту от Я до А
                      </label>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        ))}
    </>
  );
};

export default WhoShopDetail;
