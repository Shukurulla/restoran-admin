import {
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
} from "../redux/slice/orders";
import axios from "./api";

const OrderService = {
  async getOrders(dispatch) {
    dispatch(getOrdersStart());
    try {
      const { data } = await axios.get("/orders");
      dispatch(getOrdersSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure());
    }
  },
  async postOrders(dispatch, order) {
    dispatch(getOrdersStart());
    try {
      const { data } = await axios.post("/orders", order);
      dispatch(getOrdersSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure());
    }
  },
  async editOrder(dispatch, id, order) {
    dispatch(getOrdersStart());
    try {
      const { data } = await axios.post(`/edit-order/${id}`, order);
      dispatch(getOrdersSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure());
    }
  },
  async deleteOrder(dispatch, id) {
    dispatch(getOrdersStart());
    try {
      const { data } = await axios.post(`/delete-order/${id}`);
      dispatch(getOrdersSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure());
    }
  },
};

export default OrderService;
