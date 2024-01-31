import React from "react";
import ReactDOM from "react-dom/client";
import "./style/css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
