import React from "react";
import Slider from "react-slick";
import slide from "../img/slide1.svg";
import slides from "../img/slide2.svg";
import slid from "../img/slide3.svg";
import { useNavigate } from "react-router";

const ToComeIn = () => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="background_register_login">
        <div className="container">
          <Slider {...settings}>
            <div className="mobile">
              <img src={slide} alt="" />
              <h5>Накопительная карта</h5>
              <p>
                Это возможность экономить на покупках, получать скидки, подарки
                и многое другое...
              </p>
            </div>
            <div className="mobile">
              <img src={slides} alt="" />
              <h5>Будь в курсе всех акции</h5>
              <p>
                Выбирайте свои скидки и акции на любимые товары и заглядывайте к
                нам чаще за покупками
              </p>
            </div>
            <div className="mobile">
              <img src={slid} alt="" />
              <h5>Большой ассортимент товаров</h5>
              <p>
                В приложении Вы найдете весь ассортимент Bekbekei, а каталог
                товаров сможете листать всего одним прикосновением пальца
              </p>
            </div>
          </Slider>
          <div>
            <div className="register_login">
              <div>
                <button
                  onClick={() => navigate("/personal/registration")}
                  className="registr_btn all_register_btn"
                >
                  Регистрация
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate("/personal/login")}
                  className="registr_btn"
                >
                  Войти
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToComeIn;
