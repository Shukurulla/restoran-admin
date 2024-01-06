import axios from "../../service/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./new-music.scss";
import { getMusicSuccess } from "../../redux/slice/music";
import MusicAlert from "./music-alert";

const NewMusic = () => {
  const { musics } = useSelector((state) => state.music);
  const { tables } = useSelector((state) => state.table);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [item, setItem] = useState([]);
  const [id, setId] = useState(0);
  useEffect(() => {
    localStorage.setItem("pageName", "newMusic");
  }, []);

  const getMusic = async () => {
    const { data } = await axios.get("/musics");
    dispatch(getMusicSuccess(data.data));
  };

  const editMusic = (music, id) => {
    setItem(music);
    setId(id);
    setShowAlert(true);
  };

  return (
    <div className="new-music">
      {showAlert == true && (
        <MusicAlert
          item={item}
          state={showAlert}
          id={id}
          setState={setShowAlert}
        />
      )}
      <div className="music-box">
        <div className="music-header-box">
          <h5>Musiqalar</h5>
          <i
            className="bi bi-arrow-clockwise fs-3 text-primary"
            onClick={() => getMusic()}
          ></i>
        </div>
        <div className="music-items scroll-bar">
          {musics.map((item) => (
            <div className="music-item">
              <div>
                <iframe
                  width="250"
                  height="200"
                  style={{ border: "none" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${item.agent.lat},${
                    item.agent.lon
                  }&z=${16}&output=embed`}
                  title="google map"
                ></iframe>
              </div>
              <div className="music-info">
                <div className="head">
                  <p className="table-name text-primary">
                    {
                      tables.filter((table) => table._id == item.tableId)[0]
                        ?.title
                    }
                  </p>
                  {new Date(item.orderedAt).toLocaleString()}
                </div>
                {item.music.musics.map((music, idx) => (
                  <div
                    className={`music ${music.isEnding == true && "end"} ${
                      music.complaint == true ? "text-danger" : ""
                    }`}
                    onClick={() => editMusic(item, idx)}
                  >
                    <div className="title">
                      {music.complaint ? (
                        <i className="bi bi-exclamation-circle"></i>
                      ) : (
                        <i className="bi bi-music-note-beamed"></i>
                      )}{" "}
                      {music.musicName}
                    </div>
                    <div>
                      {music.isPlaying !== true ? (
                        <div>
                          {music.isEnding == true ? (
                            <i className="bi bi-check-lg"></i>
                          ) : (
                            <i className="bi bi-clock"></i>
                          )}
                        </div>
                      ) : (
                        <div className={"animation-line"}>
                          <span />
                          <span />
                          <span />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewMusic;
