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
  getSavedFailure,
  getSavedStart,
  getSavedSuccess,
} from "../redux/slice/saved-orders";
import {
  getServicesStart,
  getServiceSuccess,
} from "../redux/slice/service-slice";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../redux/slice/table";
import { addUnpaid } from "../redux/slice/ui";
import CategoryService from "../service/category";
import DebtService from "../service/debt";
import DosageService from "../service/dosage";
import FoodService from "../service/foodSerive";
import OrderService from "../service/order";
import PaymentService from "../service/payment";
import SavedService from "../service/saved-service";
import ServiceApi from "../service/service";
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

    const orders = await SavedService.deleteSaved(item._id);
    dispatch(getSavedSuccess(orders.data));
  } catch (error) {
    console.log(error);
    dispatch(getDebtFailure());
  }
};

export const addUnpaidFunction = (dispatch, val) => {
  dispatch(addUnpaid(val));
};

export const getServices = async (dispatch) => {
  dispatch(getServicesStart());
  try {
    const { data } = await ServiceApi.getSerives();
    dispatch(getServiceSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

// Saved Orders
export const getSavedOrders = async (dispatch) => {
  dispatch(getSavedStart());
  try {
    const { data } = await SavedService.getSaved();
    dispatch(getSavedSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getSavedFailure());
  }
};

export const submitSaved = async (dispatch, val) => {
  dispatch(getSavedStart());
  try {
    const { data } = await SavedService.postSaved(val);
    dispatch(getSavedSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getSavedFailure());
  }
};

export const editSaved = async (dispatch, id, val) => {
  dispatch(getSavedStart());
  try {
    const { data } = await SavedService.editSaved(id, val);
    dispatch(getSavedSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getSavedFailure());
  }
};

export const deleteSaved = async (dispatch, id) => {
  dispatch(getSavedStart());
  try {
    const { data } = await SavedService.deleteSaved(id);
    dispatch(getSavedSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getSavedFailure());
  }
};
