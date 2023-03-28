import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice';

export default configureStore({
  refucer: {
    user: userReducer,
  },
});