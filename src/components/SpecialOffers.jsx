import React, { useEffect } from "react";
import "../style/css/main.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { allPromotionList } from "../Redux/reduser/AllPromotions";

const SpecialOffers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.myData);

  useEffect(() => {
    dispatch(allPromotionList());
  }, [dispatch]);

  return (
    <div className="special_offers">
      <div className="container">
        <div className="special_block_all">
          {data.map((el, id) => (
            <div
              key={id}
              onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
              className="special_box special_details_box"
            >
              <div className="div_box">
                <img
                  className="special_image"
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
  );
};

export default SpecialOffers;
