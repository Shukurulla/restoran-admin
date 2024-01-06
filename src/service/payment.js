import {
  getPaymentsFailure,
  getPaymentsStart,
  getPaymentsSuccess,
} from "../redux/slice/payment";
import axios from "./api";
const PaymentService = {
  async getPayments(dispatch) {
    dispatch(getPaymentsStart());
    try {
      const { data } = await axios.get("/save-orders");
      dispatch(getPaymentsSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getPaymentsFailure());
    }
  },

  async postPayment(dispatch, payment) {
    dispatch(getPaymentsStart());
    try {
      const { data } = await axios.post("/save-orders", payment);
      dispatch(getPaymentsSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getPaymentsFailure());
    }
  },
  async editPayment(dispatch, id, payment) {
    dispatch(getPaymentsStart());
    try {
      const { data } = await axios.post(`/edit-save-orders/${id}`, payment);
      dispatch(getPaymentsSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getPaymentsFailure());
    }
  },
  async deletePayment(dispatch, id) {
    dispatch(getPaymentsStart());
    try {
      const { data } = await axios.post(`/delete-save-orders/${id}`);
      dispatch(getPaymentsSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getPaymentsFailure());
    }
  },
};

export default PaymentService;
