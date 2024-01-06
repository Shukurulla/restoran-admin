import {
  getSavedFailure,
  getSavedStart,
  getSavedSuccess,
} from "../redux/slice/saved-orders";
import axios from "./api";

const SavedService = {
  async getSaved(dispatch) {
    dispatch(getSavedStart());
    try {
      const { data } = await axios.get("/saved");
      dispatch(getSavedSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getSavedFailure());
    }
  },
  async postSaved(dispatch, saved) {
    dispatch(getSavedStart());
    try {
      const { data } = await axios.post("/saved", saved);
      dispatch(getSavedSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getSavedFailure());
    }
  },
  async editSaved(dispatch, id, saved) {
    dispatch(getSavedStart());
    try {
      const { data } = await axios.post(`/edit-saved/${id}`, saved);
      dispatch(getSavedSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getSavedFailure());
    }
  },
  async deleteSaved(dispatch, id) {
    dispatch(getSavedStart());
    try {
      const { data } = await axios.post(`/delete-saved/${id}`);
      dispatch(getSavedSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getSavedFailure());
    }
  },
};

export default SavedService;
