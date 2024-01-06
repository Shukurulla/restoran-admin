import {
  getMusicFailure,
  getMusicStart,
  getMusicSuccess,
} from "../redux/slice/music";
import axios from "./api";

const musicService = {
  async getMusic(dispatch) {
    dispatch(getMusicStart());
    try {
      const { data } = await axios.get("/musics");
      dispatch(getMusicSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getMusicFailure());
    }
  },
  async postMusic(dispatch, music) {
    dispatch(getMusicStart());
    try {
      const { data } = await axios.post("/musics", music);
      dispatch(getMusicSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getMusicFailure());
    }
  },
  async editMusic(dispatch, id, music) {
    dispatch(getMusicStart());
    try {
      const { data } = await axios.post(`/musics-edit/${id}`, music);
      dispatch(getMusicSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getMusicFailure());
    }
  },
  async deleteMusic(dispatch, id) {
    dispatch(getMusicStart());
    try {
      const { data } = await axios.post(`/musics-remove/${id}`);
      dispatch(getMusicSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getMusicFailure());
    }
  },
};

export default musicService;
