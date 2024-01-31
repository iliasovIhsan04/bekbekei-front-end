import { allPromotions } from "../slice/mySlice";
import { url } from "../../Api";

export const allPromotionList = () => async (dispatch) => {
  try {
    const response = await fetch(url + "/card/all");
    const data = await response.json();
    dispatch(allPromotions(data));
  } catch (error) {}
};
