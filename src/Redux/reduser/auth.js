import { authUser } from "../slice/userInfo";
import { url } from "../../Api";
import axios from "axios";

export const auth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("tokens");
    const response = await axios(url + "/auth/user-info", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    dispatch(authUser(response.data));
  } catch (error) {}
};
