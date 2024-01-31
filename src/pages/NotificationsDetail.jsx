import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { url } from "../Api";
import { RiCloseLine } from "react-icons/ri";

const NotificationsDetail = () => {
  const navigate = useNavigate();
  const [notifyDetail, setNotifyDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(url + `/notifications/${id}`)
      .then((response) => {
        setNotifyDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div id="modal">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center">
          <div></div>
          <h4 className="noti_title_detail">{notifyDetail.title}</h4>
          <RiCloseLine className="fi" onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="container">
        <div className="noti_details_block">
          {notifyDetail.img &&
            notifyDetail.img.map((el) => (
              <div className="noti_img">
                <img src={el.img} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsDetail;
