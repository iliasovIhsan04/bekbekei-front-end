import { products } from "../slice/ProducSlice";
import { url } from "../../Api";
import axios from "axios";

export const ProducRedux = () => async (dispatch) => {
  try {
    const response = await axios(url + "/product/categories");
    dispatch(products(response.data));
  } catch (error) {}
};

