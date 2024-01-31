import React, { useEffect } from "react";
import "../style/css/main.css";
import { useNavigate } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/reduser/fetchData";

const GetShotDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.myData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div id="modal">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <HiArrowLongLeft
            className="fi"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
            size={20}
          />
          <p className="header_name">Все акции</p>
          <span></span>
        </div>
      </div>
      <div className="get_shot_details top">
        <div className="container">
          <div className="get_details_block_all top_all">
            {data.map((el, id) => (
              <div
                key={id}
                onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
                className="special_details_box"
              >
                <img className="special_image" src={el.img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetShotDetails;
