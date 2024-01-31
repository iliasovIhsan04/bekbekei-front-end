import React, { useEffect, useState } from "react";
import "../style/css/main.css";
import { useNavigate, useParams } from "react-router";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { url } from "../Api";

const GetShotDetailsId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState([]);
  useEffect(() => {
    axios
      .get(url + `/card/${id}`)
      .then((response) => setCard(response.data))
      .catch();
  }, []);
  return (
    <div id="modal">
      <div className="get_shot_details_id">
        <div className="get_details_block_alls">
          <div className="special_details_box">
            <div className="fff_block">
              <IoMdClose
                className="fi"
                onClick={() => navigate(-1)}
                size={22}
                style={{ cursor: "pointer" }}
              />
            </div>
            <img className="special_image_id" src={card.img} alt="" />
            <div className="dolor">
              <div className="container">
                <h5 className="card_title">{card.title}</h5>
                <p className="card_item">{card.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetShotDetailsId;
