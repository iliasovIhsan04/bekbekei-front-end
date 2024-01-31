import { fetchDataSuccess } from "../slice/mySlice";
import { url } from "../../Api";

export const fetchData = () => async (dispatch) => {
  try {
    const response = await fetch(url + "/card/type/one");
    const data = await response.json();
    dispatch(fetchDataSuccess(data));
  } catch (error) {}
};
