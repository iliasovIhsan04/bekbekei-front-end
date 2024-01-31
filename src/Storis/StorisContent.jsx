import React, { useEffect, useState } from "react";
import "./Storis.css";
import Stories from "react-insta-stories";

const StorisContent = ({ data }) => {
  
  const [status, setStatus] = useState(false);
  const [view, setView] = useState(false);

  return (
    <div>
      <>
        <div
          onClick={() => setStatus(true) || setView(true)}
          className="storis_content"
        >
          <img src={data.img} alt="" />
        </div>
        {status ? (
          data ? (
            <div className="status">
              <Stories
                stories={data.stories}
                width={"100%"}
                height={"100vh"}
                onAllStoriesEnd={() => setStatus(false)}
              />
            </div>
          ) : (
            <div onClick={() => setStatus(false)} className="not_status"></div>
          )
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default StorisContent;
