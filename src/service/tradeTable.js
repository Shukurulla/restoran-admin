import { getTableSuccess } from "../redux/slice/table";
import {
  getTradeTableFailure,
  getTradeTableStart,
  getTradeTableSuccess,
} from "../redux/slice/trade-table";
import axios from "./api";

const TradeTableService = {
  async getTradeTable(dispatch) {
    dispatch(getTradeTableStart());
    try {
      const { data } = await axios.get("/trade-table");
      dispatch(getTradeTableSuccess(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(getTradeTableFailure());
    }
  },
  async postTradeTable(dispatch, table) {
    dispatch(getTradeTableStart());
    try {
      const { data } = await axios.post("/trade-table", table);
      dispatch(getTradeTableSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTradeTableFailure());
    }
  },
  async editTradeTable(dispatch, id, table) {
    dispatch(getTradeTableStart());
    try {
      const { data } = await axios.post(`/edit-trade-table/${id}`, table);
      dispatch(getTradeTableSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTradeTableFailure());
    }
  },
  async delete(dispatch, id) {
    dispatch(getTradeTableStart());
    try {
      const { data } = await axios.post(`/edit-trade-table/${id}`);
      dispatch(getTradeTableSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTradeTableFailure());
    }
  },
};

export default TradeTableService;
