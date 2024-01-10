import {
  getCallFailure,
  getCallStart,
  getCallSuccess,
} from "../redux/slice/call";
import axios from "./api";

const CallService = {
  async getCalls(dispatch) {
    dispatch(getCallStart());
    try {
      const { data } = await axios.get("/call");
      console.log(data);
      dispatch(getCallSuccess(data));
    } catch (error) {
      dispatch(getCallFailure());
    }
  },
  async deleteCall(dispatch, id) {
    dispatch(getCallStart());
    try {
      const { data } = await axios.post(`/delete-call/${id}`);
      dispatch(getCallSuccess(data));
    } catch (error) {
      dispatch(getCallFailure());
    }
  },
};

export default CallService;
