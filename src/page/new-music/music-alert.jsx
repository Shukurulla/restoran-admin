import React from "react";
import { useDispatch, useSelector } from "react-redux";
import musicService from "../../service/music";
import SavedService from "../../service/saved-service";
import "./new-music.scss";

const MusicAlert = ({ item, state, setState, id }) => {
  const { musics } = item.music;
  const { saved } = useSelector((state) => state.saved);
  const { tables } = useSelector((state) => state.table);
  const equalMusic = musics[id];
  const unequalMusic = musics.filter((c, idx) => idx !== id);
  const dispatch = useDispatch();

  const playingSchema = {
    ...item,
    music: {
      musics: [
        ...unequalMusic,
        { ...equalMusic, isPlaying: true, isEnding: false, complaint: false },
      ],
    },
  };

  const playingHandler = async () => {
    musicService.editMusic(dispatch, item._id, playingSchema);
    setState(false);
  };

  const endingSchema = {
    ...item,
    music: {
      musics: [
        ...unequalMusic,
        { ...equalMusic, isPlaying: false, isEnding: true, complaint: false },
      ],
    },
  };

  const endingHandler = async () => {
    musicService.editMusic(dispatch, item._id, endingSchema);
    setState(false);
    if (saved.filter((c) => c.tableId === item.tableId).length > 0) {
      const data = {
        savedOrder: item,
        tableId: item.tableId,
        orderType: "music",
        tableNumber: tables.filter((c) => c._id == item.tableId)[0].tableNumber,
      };
      try {
        SavedService.postSaved(dispatch, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      const data = {
        savedOrder: item,
        tableId: item.tableId,
        orderType: "music",
        tableNumber: tables.filter((c) => c._id == item.tableId)[0].tableNumber,
        place: "first",
      };
      try {
        SavedService.postSaved(dispatch, data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const complaintSchema = {
    ...item,
    music: {
      musics: [
        ...unequalMusic,
        { ...equalMusic, isPlaying: false, isEnding: false, complaint: true },
      ],
    },
  };

  const complaintHandler = async () => {
    musicService.editMusic(dispatch, item._id, complaintSchema);
    setState(false);
  };

  return (
    <div className="music-alert">
      <div className="alert-box">
        <div className="alert-header">
          <h3>
            <b>{equalMusic.musicName}</b>.mp3
          </h3>
          <i className="bi bi-x-lg" onClick={() => setState(false)}></i>
        </div>
        <div className="config">
          <div className="div">
            <button
              className="btn btn-outline-primary"
              onClick={() => endingHandler()}
            >
              Tugatildi
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => playingHandler()}
            >
              Boshlandi
            </button>
          </div>
          <button className="btn btn-danger" onClick={() => complaintHandler()}>
            <i className="bi bi-exclamation-circle"></i> Shikoyat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicAlert;
