import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import SavedService from "../../service/saved-service";
import KaraokeService from "../../service/karaoke";

const Karaoke = () => {
  const { karaoke } = useSelector((state) => state.karaoke);
  const { saved } = useSelector((state) => state.saved);
  const { tables } = useSelector((state) => state.table);
  const dispatch = useDispatch();

  const submitHandler = async (item) => {
    const equalTrade = saved?.filter((c) => c.tableId == item.tableId);
    const firstOrder = equalTrade?.filter((c) => c.place == "first");

    const schema = {
      savedOrder: {
        item,
      },
      tableId: item.tableId,
      orderType: "karaoke",
      tableNumber: tables.filter((c) => c._id == item.tableId)[0].tableNumber,
      place: firstOrder?.length > 0 ? "" : "first",
    };
    try {
      SavedService.postSaved(dispatch, schema);
      KaraokeService.deleteKaraoke(dispatch, item._id);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Karaoke uchun buyurtmalar</h2>
      {karaoke.map((item) => (
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
                  </div>
                  <div className="orders">
                    <h5>
                      Buyurtma vaqti:{" "}
                      {`${moment(item.orderedAt).format(
                        "DD.MM.YYYY"
                      )}, ${new Date(item.orderedAt).getHours()}:${new Date(
                        item.orderedAt
                      ).getMinutes()}`}
                    </h5>
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

export default Karaoke;
