import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoIosMegaphone } from "react-icons/io";
import { url } from "../Api";
import { useNavigate } from "react-router";
import korzina from "../img/korzina.jpeg";

const Notifications = () => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/notifications/")
      .then((response) => {
        setLoading(false);
        setNotify(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div id="modal">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center">
          <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
          <h4 className="title_h5 all_title">Уведомление</h4>
          <div />
        </div>
      </div>
      {loading ? (
        ""
      ) : (
        <>
          {notify.length > 0 ? (
            <div className="notificatios_block">
              {notify.map((el) => (
                <div
                  className="notifications_box"
                  key={el.id}
                  onClick={() => navigate(`/notifications-details/${el.id}`)}
                >
                  <div className="container notification_index">
                    <div className="notify">
                      <IoIosMegaphone size={25} className="megap_icons" />
                    </div>
                    <h4 className="megap_title">{el.title}</h4>
                    <p className="magap_date">{el.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container">
              <div className="ionic ionic_block">
                <div></div>
                <div className="ionic_box1">
                  <img src={korzina} alt="" />
                  <h3>Бул жер азырынча бош</h3>
                  <p>Бул жерде сизге жаны жаңылыктар көрсөтүлөт</p>
                </div>
                <button className="ionic_button">
                  <h5 className="ionic_button_text">Тарыхты көрсөтүү</h5>
                  <p className="ionic_button_date">
                    01.10.2023 дан 31.10.2023 чейин
                  </p>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
