import { getCategoryStart, getCategorySuccess } from "../redux/slice/category";
import {
  getDebtFailure,
  getDebtStart,
  getDebtSuccess,
} from "../redux/slice/debt";
import {
  getDosageFailure,
  getDosageStart,
  getDosageSuccess,
} from "../redux/slice/dosage";
import {
  getFoodsFailure,
  getFoodsStart,
  getFoodsSuccess,
} from "../redux/slice/foods";
import {
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
} from "../redux/slice/orders";
import {
  getPaymentsFailure,
  getPaymentsStart,
  getPaymentsSuccess,
} from "../redux/slice/payment";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../redux/slice/table";
import CategoryService from "../service/category";
import DebtService from "../service/debt";
import DosageService from "../service/dosage";
import FoodService from "../service/foodSerive";
import OrderService from "../service/order";
import PaymentService from "../service/payment";
import TableService from "../service/table";

export const getFoods = async (dispatch) => {
  dispatch(getFoodsStart());
  try {
    const { data } = await FoodService.getFoods();
    dispatch(getFoodsSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getFoodsFailure());
  }
};

export const getCategory = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const { data } = await CategoryService.getCategory();
    dispatch(getCategorySuccess(data));
  } catch (error) {
    console.log(error);
  }
};

export const getDosage = async (dispatch) => {
  dispatch(getDosageStart());
  try {
    const { data } = await DosageService.getDosage();
    dispatch(getDosageSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getDosageFailure());
  }
};

export const getTables = async (dispatch) => {
  dispatch(getTableStart());
  try {
    const { data } = await TableService.getTables();
    dispatch(getTableSuccess(data));
  } catch (error) {
    dispatch(getTableFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrdersStart());
  try {
    const { data } = await OrderService.getOrders();
    dispatch(getOrdersSuccess(data));
  } catch (error) {
    dispatch(getOrdersFailure());
  }
};

export const getPayments = async (dispatch) => {
  dispatch(getPaymentsStart());
  try {
    const { data } = await PaymentService.getPayments();
    dispatch(getPaymentsSuccess(data));
  } catch (error) {
    dispatch(getPaymentsFailure());
  }
};

// DEBT FUNCTIONS
export const getDebt = async (dispatch) => {
  dispatch(getDebtStart());
  try {
    const { data } = await DebtService.getDebt();
    dispatch(getDebtSuccess(data));
  } catch (error) {
    dispatch(getDebtFailure());
  }
};

export const postDebt = async (dispatch, debt, item) => {
  dispatch(getDebtStart());
  try {
    const { data } = await DebtService.postDebt(debt);
    dispatch(getDebtSuccess(data));

    const orders = await OrderService.deleteOrder(item._id);
    dispatch(getOrdersSuccess(orders.data));
  } catch (error) {
    console.log(error);
    dispatch(getDebtFailure());
  }
};
