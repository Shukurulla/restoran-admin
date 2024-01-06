import moment from "moment/moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import musicService from "../../service/music";
import OrderService from "../../service/order";
import SavedService from "../../service/saved-service";
import TradeTableService from "../../service/tradeTable";
import "./orders.scss";
const MusicOrders = () => {
  const { tables } = useSelector((state) => state.table);
  const { musics } = useSelector((state) => state.music);
  const { saved } = useSelector((state) => state.saved);
  const f = new Intl.NumberFormat("es-sp");
  const dispatch = useDispatch();

  const submitHandler = (item) => {
    if (saved.filter((c) => c.tableId === item.tableId).length > 0) {
      const data = {
        savedOrder: item,
        tableId: item.tableId,
        orderType: "music",
        tableNumber: tables.filter((c) => c._id == item.tableId)[0].tableNumber,
      };
      try {
        SavedService.postSaved(dispatch, data);
        musicService.deleteMusic(dispatch, item._id);
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
        musicService.deleteMusic(dispatch, item._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="scroll-bar">
      <h2>Musiqalar uchun buyurtmalar</h2>
      {musics.map((item) => (
        <div className="order-box">
          <div className="row">
            <div className="col-lg-5 col-md-4 col-sm-12">
              <iframe
                width="300"
                height="250"
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${item.agent.lat},${
                  item.agent.lon
                }&z=${16}&output=embed`}
                title="google map"
              ></iframe>
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12 py-3 pr-3">
              <div className="top-box">
                <div>
                  <div className="title-box d-flex align-items-center justify-content-between">
                    <h2 className="tableName ">
                      {tables?.filter((c) => c._id == item.tableId)[0].title}
                    </h2>
                    <h5>{f.format(item.price)}so'm</h5>
                  </div>
                  <div className="orders">
                    <ul>
                      {item.music.musics.map((music) => (
                        <li>{music.musicName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="btn-and-info">
                  <button
                    className="btn btn-primary"
                    onClick={() => submitHandler(item)}
                  >
                    Qabul Qilish
                  </button>
                  <p>{`${moment(item.orderedAt).format(
                    "DD.MM.YYYY"
                  )}, ${new Date(item.orderedAt).getHours()}:${new Date(
                    item.orderedAt
                  ).getMinutes()}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicOrders;
