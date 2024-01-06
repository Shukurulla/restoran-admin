import moment from "moment/moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../service/order";
import SavedService from "../../service/saved-service";
import "./orders.scss";
const FoodOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { tables } = useSelector((state) => state.table);
  const { saved } = useSelector((state) => state.saved);
  const f = new Intl.NumberFormat("es-sp");
  const dispatch = useDispatch(0);

  const submitHandler = (item) => {
    if (saved.filter((c) => c.tableId === item.tableId).length > 0) {
      const data = {
        savedOrder: item,
        tableId: item.tableId,
        orderType: "food",
        tableNumber: tables.filter((c) => c._id == item.tableId)[0].tableNumber,
        numberOfPeople,
      };
      try {
        SavedService.postSaved(dispatch, data);
        OrderService.deleteOrder(dispatch, item._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      const data = {
        savedOrder: item,
        tableId: item.tableId,
        orderType: "food",
        tableNumber: tables.filter((c) => c._id == item.tableId)[0].tableNumber,
        place: "first",
        numberOfPeople,
      };
      try {
        SavedService.postSaved(dispatch, data);
        OrderService.deleteOrder(dispatch, item._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="scroll-bar">
      <h2>Taom uchun buyurtmalar</h2>
      {orders.map((item) => (
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
                    <h2 className="tableName ">{item.tableName}</h2>
                    <h5>{f.format(item.totalPrice)}so'm</h5>
                  </div>
                  <div className="orders">
                    <ul>
                      {item.selectFoods.map((food) => (
                        <li>
                          {
                            item.allOrders.filter((c) => c._id == food._id)
                              .length
                          }{" "}
                          {food.foodName}
                        </li>
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

export default FoodOrders;
