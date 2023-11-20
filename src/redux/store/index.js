import { configureStore } from "@reduxjs/toolkit";
import FoodReducer from "../slice/foods";
import UiReducer from "../slice/ui";
import CategoryReducer from "../slice/category";
import DosageReducer from "../slice/dosage";
import TableReducer from "../slice/table";
import OrderReducer from "../slice/orders";

const store = configureStore({
  reducer: {
    dosage: DosageReducer,
    food: FoodReducer,
    ui: UiReducer,
    category: CategoryReducer,
    table: TableReducer,
    order: OrderReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export default store;
