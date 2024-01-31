import {stories} from "../slice/Storis/StorisSlice";
import {url} from "../../Api";
import axios from "axios";

export const StorisRedux = () => async (dispatch) => {
    try {
        const response = await axios(url + "/stories");
        dispatch(stories(response.data));
    } catch (error) {
    }
};