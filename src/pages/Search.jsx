import React, { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Search = ({ fetchData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div id="modal_one">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center">
          <HiArrowLongLeft className="fi" onClick={() => navigate(-1)} />
          <h4 className="title_h5 all_title">Издоо</h4>
          <div />
        </div>
        <div className="container">
          <input
            className="input_form_all mt-4"
            type="search"
            placeholder="Товарларды табуу"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="search-button" onClick={fetchData}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
