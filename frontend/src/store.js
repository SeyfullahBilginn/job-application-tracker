import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./features/applicationsSlice";

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
  },
});

export default store;
