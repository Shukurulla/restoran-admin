import { getDebtStart, getDebtSuccess } from "../redux/slice/debt";
import { getDosageFailure } from "../redux/slice/dosage";
import axios from "./api";

const DebtService = {
  async getDebt(dispatch) {
    dispatch(getDebtStart());
    try {
      const { data } = await axios.get("/debt");
      dispatch(getDebtSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure());
    }
  },
  async postDebt(dispatch, debt) {
    dispatch(getDebtStart());
    try {
      const { data } = await axios.post("/debt", debt);
      dispatch(getDebtSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure());
    }
  },
  async editDebt(dispatch, id, debt) {
    dispatch(getDebtStart());
    try {
      const { data } = await axios.post(`/edit-debt/${id}`, debt);
      dispatch(getDebtSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure());
    }
  },
  async deleteDebt(dispatch, id) {
    dispatch(getDebtStart());
    try {
      const { data } = await axios.post(`/delete-debt/${id}`);
      dispatch(getDebtSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure());
    }
  },
};

export default DebtService;
