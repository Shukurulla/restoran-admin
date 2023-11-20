import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import SideBar from "./components/side-bar/side-bar";
import Dashboard from "./page/dashboard/dashboard";
import {
  getFoodsFailure,
  getFoodsStart,
  getFoodsSuccess,
} from "./redux/slice/foods";
import FoodService from "./service/foodSerive";
import Foods from "./page/foods/foods";
import AddFood from "./page/addFood/add-food";
import { getCategoryStart, getCategorySuccess } from "./redux/slice/category";
import CategoryService from "./service/category";
import EditFood from "./components/food-edit/edit-food";
import Category from "./page/category/category";
import Dosage from "./page/dosage/dosage";
import {
  getDosageFailure,
  getDosageStart,
  getDosageSuccess,
} from "./redux/slice/dosage";
import DosageService from "./service/dosage";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "./redux/slice/table";
import TableService from "./service/table";
import Table from "./page/table/table";
import {
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
} from "./redux/slice/orders";
import OrderService from "./service/order";
import Order from "./page/order/order";
function App() {
  const dispatch = useDispatch();

  const getFoods = async () => {
    dispatch(getFoodsStart());
    try {
      const { data } = await FoodService.getFoods();
      dispatch(getFoodsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getFoodsFailure());
    }
  };
  const getCategory = async () => {
    dispatch(getCategoryStart());
    try {
      const { data } = await CategoryService.getCategory();
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getDosage = async () => {
    dispatch(getDosageStart());
    try {
      const { data } = await DosageService.getDosage();
      dispatch(getDosageSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure);
    }
  };

  const getTables = async () => {
    dispatch(getTableStart());
    try {
      const { data } = await TableService.getTables();
      dispatch(getTableSuccess(data));
    } catch (error) {
      dispatch(getTableFailure());
    }
  };
  const getOrders = async () => {
    dispatch(getOrdersStart());
    try {
      const { data } = await OrderService.getOrders();
      dispatch(getOrdersSuccess(data));
    } catch (error) {
      dispatch(getOrdersFailure());
    }
  };

  useEffect(() => {
    getFoods();
    getCategory();
    getDosage();
    getTables();
    getOrders();
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-12">
            <SideBar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-12">
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
