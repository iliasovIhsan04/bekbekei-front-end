import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { url } from "../Api";

const NewPromotions = () => {
  const navigate = useNavigate();
  const [newPromotions, setNewPromotions] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/card/type/two")
      .then((response) => {
        setNewPromotions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="new_promotions">
      <div className="get_shot">
        <div className="container">
          <div className="title">
            <p className="text t-custom">Акции</p>
            <h4
              className="title_add t-custom"
              onClick={() => navigate("/promotion")}
            >
              Смотреть все
            </h4>
          </div>
          <div className="new_block_all">
            {newPromotions.map((el, id) => (
              <div
                key={id}
                onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
                className="special_box_blok"
              >
                <div className="div_box special_details_box">
                  <img
                    className="special_image_block"
                    src={el.img}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPromotions;
