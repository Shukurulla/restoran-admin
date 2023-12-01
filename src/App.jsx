import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/header/header";
import SideBar from "./components/side-bar/side-bar";
import Dashboard from "./page/dashboard/dashboard";
import Foods from "./page/foods/foods";
import AddFood from "./page/addFood/add-food";
import EditFood from "./components/food-edit/edit-food";
import Category from "./page/category/category";
import Dosage from "./page/dosage/dosage";
import Table from "./page/table/table";
import { getOrdersFailure, getOrdersSuccess } from "./redux/slice/orders";
import OrderService from "./service/order";
import Order from "./page/order/order";
import Report from "./page/report/report";

import {
  getCategory,
  getDebt,
  getDosage,
  getFoods,
  getOrders,
  getPayments,
  getTables,
} from "./hooks";
import Debt from "./page/report/debt";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/orders");
    }
    getFoods(dispatch);
    getCategory(dispatch);
    getDosage(dispatch);
    getTables(dispatch);
    getOrders(dispatch);
    getPayments(dispatch);
    getDebt(dispatch);
  }, []);

  setInterval(() => {
    const getOrders = async () => {
      try {
        const { data } = await OrderService.getOrders();
        dispatch(getOrdersSuccess(data));
      } catch (error) {
        dispatch(getOrdersFailure());
      }
    };
    getOrders();
  }, 3000);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12">
            <SideBar />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12">
            <Header />
            <div className="py-4 relative  px-3">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/foods" element={<Foods />} />
                  <Route path="/add-food" element={<AddFood />} />
                  <Route path="/edit-food/:id" element={<EditFood />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/dosage" element={<Dosage />} />
                  <Route path="/tables" element={<Table />} />
                  <Route path="/orders" element={<Order />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/report/debt" element={<Debt />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
