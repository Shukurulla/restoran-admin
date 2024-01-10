import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const Call = () => {
  const { calls } = useSelector((state) => state.call);
  return (
    <div className="scroll-bar">
      <h2>Ofitsiyan chaqiruvlar</h2>
      {calls.map((item) => (
        <div className="order-box ">
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
                    <h2 className="tableName ">{item.tableName}</h2>
                  </div>
                  <div className="orders">
                    <h5>
                      Buyurtma vaqti:{" "}
                      {`${moment(item.orderedAt).format(
                        "DD.MM.YYYY"
                      )}, ${new Date(item.orderedAt).getHours()}:${
                        new Date(item.orderedAt).getMinutes() < 10 ? "0" : ""
                      }${new Date(item.orderedAt).getMinutes()}`}
                    </h5>
                  </div>
                </div>
                <div className="btn-and-info">
                  <button className="btn btn-primary">Qabul Qilish</button>
                  <p>{`${moment(item.orderedAt).format(
                    "DD.MM.YYYY"
                  )}, ${new Date(item.orderedAt).getHours()}:${
                    new Date(item.orderedAt).getMinutes() < 10 ? "0" : ""
                  }${new Date(item.orderedAt).getMinutes()}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Call;
