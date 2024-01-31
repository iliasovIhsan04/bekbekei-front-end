import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/authReducer";
import activationReduser from "./slice/activationReduser";
import UserSlice from "./slice/UserSlice";
import myReducer from "./slice/mySlice"
import userInfo from "./slice/userInfo"
import storis from "./slice/Storis/StorisSlice"
import products from "./slice/ProducSlice"
export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            code: activationReduser,
            user: UserSlice,
            myData: myReducer,
            users: userInfo,
            stosis:storis,
            products:products,
        }
    }
)