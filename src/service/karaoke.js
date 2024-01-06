import {
  getKaraokeFailure,
  getKaraokeStart,
  getKaraokeSuccess,
} from "../redux/slice/karaoke";
import axios from "./api";

const KaraokeService = {
  async getKaraoke(dispatch) {
    dispatch(getKaraokeStart());
    try {
      const { data } = await axios.get("/karaoke");
      dispatch(getKaraokeSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getKaraokeFailure());
    }
  },

  async postKaraoke(dispatch, karaoke) {
    dispatch(getKaraokeStart());
    try {
      const { data } = await axios.post("/karaoke", karaoke);
      dispatch(getKaraokeSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getKaraokeFailure());
    }
  },
  async editKaraoke(dispatch, id, karaoke) {
    dispatch(getKaraokeStart());
    try {
      const { data } = await axios.post(`/edit-karaoke/${id}`, karaoke);
      dispatch(getKaraokeSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getKaraokeFailure());
    }
  },
  async deleteKaraoke(dispatch, id) {
    dispatch(getKaraokeStart());
    try {
      const { data } = await axios.post(`/delete-karaoke/${id}`);
      dispatch(getKaraokeSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getKaraokeFailure());
    }
  },
};

export default KaraokeService;
