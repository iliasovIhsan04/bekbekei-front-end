import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import RegistrationQuestionnaire from "./RegistrationQuestionnaire";
import Login from "./Login";
import ResetThePassword from "./ResetThePassword";
import Activation from "./Activation";
import ActivationCode from "./ActivationCode";
import NewResetThePassword from "./NewResetThePassword";
import ToComeIn from "../components/ToComeIn";
import ToHelpPage from "./ToHelpPage";
import { AlertData } from "../UI/Alert/Alert";

const AllProject = () => {
  const [openAlert, setOpenAlert] = useState({
    open: false,
    props: "",
    text: "",
  });

  function FuncAlert(text, props) {
    setTimeout(() => {
      setOpenAlert({
        ...openAlert,
        open: true,
        text: text,
        props: props,
      });
    }, 200);
    setOpenAlert({ ...openAlert, open: false });
  }

  useEffect(() => {
    if (openAlert.open) {
      const timeoutId = setTimeout(() => {
        setOpenAlert({ ...openAlert, open: false });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [openAlert.open]);

  return (
    <>
      <div>
        {openAlert.open && (
          <AlertData
            state={openAlert}
            setState={setOpenAlert}
            propsData={openAlert.props}
            text={openAlert.text}
          />
        )}
        <div>
          <Routes>
            <Route path="to-come-in" element={<ToComeIn />} />
            <Route
              path="/activation"
              element={<Activation Alert={FuncAlert} />}
            />
            <Route
              path="/registration"
              element={<Registration Alert={FuncAlert} />}
            />
            <Route
              path="/registration-questionnare"
              element={<RegistrationQuestionnaire />}
            />
            <Route path="/login" element={<Login Alert={FuncAlert} />} />
            <Route
              path="/reset-the-password"
              element={<ResetThePassword Alert={FuncAlert} />}
            />
            <Route
              path="/activation-code"
              element={<ActivationCode Alert={FuncAlert} />}
            />
            <Route path="/to-help-page" element={<ToHelpPage />} />
            <Route
              path="/reset-password"
              element={<NewResetThePassword Alert={FuncAlert} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AllProject;
