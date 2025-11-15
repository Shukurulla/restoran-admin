import { configureStore } from "@reduxjs/toolkit";
import FoodReducer from "../slice/foods";
import UiReducer from "../slice/ui";
import CategoryReducer from "../slice/category";
import DosageReducer from "../slice/dosage";
import TableReducer from "../slice/table";
import OrderReducer from "../slice/orders";
import PaymentReducer from "../slice/payment";
import UserReducer from "../slice/user";
import DebtReducer from "../slice/debt";
import ServiceReducer from "../slice/service-slice";
import SavedOrders from "../slice/saved-orders";
import MusicReducer from "../slice/music";
import TradeTableReducer from "../slice/trade-table";
import CallReducer from "../slice/call";
import WaiterReducer from "../slice/waiter";

const store = configureStore({
  reducer: {
    dosage: DosageReducer,
    food: FoodReducer,
    ui: UiReducer,
    category: CategoryReducer,
    table: TableReducer,
    order: OrderReducer,
    payment: PaymentReducer,
    user: UserReducer,
    debt: DebtReducer,
    service: ServiceReducer,
    saved: SavedOrders,
    music: MusicReducer,
    tradeTable: TradeTableReducer,
    call: CallReducer,
    waiter: WaiterReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export default store;
