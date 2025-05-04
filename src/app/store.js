import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./adminApi";
import roomAllocationReducer from "../reducers/roomAllocationReducer";

export const store = configureStore({
  reducer: {
    floorRooms: roomAllocationReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});
 