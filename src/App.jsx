import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Foods from "./page/foods/foods";
import AddFood from "./page/addFood/add-food";
import EditFood from "./components/food-edit/edit-food";
import Category from "./page/category/category";
import Dosage from "./page/dosage/dosage";
import Table from "./page/table/table";
import OrderService from "./service/order";
import Order from "./page/order/order";
import Report from "./page/report/report";

import {
  addUnpaidFunction,
  getCategory,
  getDebt,
  getDosage,
  getFoods,
  getServices,
  getTables,
} from "./hooks";
import Debt from "./page/report/debt";
import moment from "moment";
import RestoranLayout from "./page/layout/restoran-layout";
import Router from "./page/router/router";
import RestoranProtect from "./page/protect/restoran-protect";
import DJProtect from "./page/protect/dj-protect";
import DjLayout from "./page/layout/dj-layout";
import NewMusic from "./page/new-music/new-music";
import musicService from "./service/music";
import OldMusic from "./page/old-music/old-music";
import DjReport from "./page/dj-report/dj-report";
import KaraokeService from "./service/karaoke";
import FoodOrders from "./page/orders/food-orders";
import TradeTableService from "./service/tradeTable";
import TradeTable from "./page/tradeTable/table";
import SavedService from "./service/saved-service";
import MusicOrders from "./page/orders/music-orders";
import PaymentService from "./service/payment";
import DebtService from "./service/debt";

import io from "socket.io-client";
import Karaoke from "./page/orders/karaoke";
import CallService from "./service/call";
import Call from "./page/orders/call";

const socket = io.connect("https://restoran-service.onrender.com");

function App() {
  const dispatch = useDispatch();
  const { debt } = useSelector((state) => state.debt);

  const [unpaid, setUnpaid] = useState([]);
  useEffect(() => {
    socket.on("get_order", (data) => {
      OrderService.getOrders(dispatch);
    });
    socket.on("get_karaoke", (data) => {
      KaraokeService.getKaraoke(dispatch);
    });
    socket.on("call-info", (data) => {
      CallService.getCalls(dispatch);
    });
  }, [socket]);

  useEffect(() => {
    setUnpaid(
      debt.filter(
        (c) =>
          moment(c.paymentTerm).format("YYYYMMDD") <
          moment(new Date()).format("YYYYMMDD")
      )
    );

    CallService.getCalls(dispatch);
    musicService.getMusic(dispatch);
    getFoods(dispatch);
    getCategory(dispatch);
    getDosage(dispatch);
    getTables(dispatch);
    OrderService.getOrders(dispatch);
    PaymentService.getPayments(dispatch);
    DebtService.getDebt(dispatch);
    getServices(dispatch);
    SavedService.getSaved(dispatch);
    KaraokeService.getKaraoke(dispatch);
    TradeTableService.getTradeTable(dispatch);
    addUnpaidFunction(
      dispatch,
      debt.filter(
        (c) =>
          moment(c.paymentTerm).format("YYYYMMDD") <
          moment(new Date()).format("YYYYMMDD")
      )
    );
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Router />} />
        <Route path="/restoran/protect" element={<RestoranProtect />} />
        <Route
          path="/restoran/foods"
          element={<RestoranLayout activePage={<Foods />} />}
        />
        <Route
          path="/restoran/add-food"
          element={<RestoranLayout activePage={<AddFood />} />}
        />
        <Route
          path="/restoran/edit-food/:id"
          element={<RestoranLayout activePage={<EditFood />} />}
        />
        <Route
          path="/restoran/category"
          element={<RestoranLayout activePage={<Category />} />}
        />
        <Route
          path="/restoran/dosage"
          element={<RestoranLayout activePage={<Dosage />} />}
        />
        <Route
          path="/restoran/tables"
          element={<RestoranLayout activePage={<Table />} />}
        />
        <Route
          path="/restoran/orders/karaoke"
          element={<RestoranLayout activePage={<Karaoke />} />}
        />
        <Route
          path="/restoran/orders/call"
          element={<RestoranLayout activePage={<Call />} />}
        />
        <Route
          path="/restoran/orders"
          element={<RestoranLayout activePage={<Order />} />}
        />
        <Route
          path="/restoran/orders/food"
          element={<RestoranLayout activePage={<FoodOrders />} />}
        />
        <Route
          path="/restoran/orders/music"
          element={<RestoranLayout activePage={<MusicOrders />} />}
        />
        <Route
          path="/restoran/report"
          element={<RestoranLayout activePage={<Report />} />}
        />
        <Route
          path="/restoran/report/debt"
          element={<RestoranLayout activePage={<Debt />} />}
        />
        <Route
          path="/restoran/save-orders"
          element={<RestoranLayout activePage={<TradeTable />} />}
        />
      </Routes>
    </>
  );
}

export default App;
