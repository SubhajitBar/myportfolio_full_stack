import {configureStore} from "@reduxjs/toolkit";
import { loginReducer, updateReducer, userReducer } from "./reducer/userReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        login: loginReducer,
        update: updateReducer,
    },
});

export const server = "https://subhaportfilio-server.onrender.com";

export default store;