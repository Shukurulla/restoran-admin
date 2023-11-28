import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./table-order.scss";
import moment from "moment/moment";
import {
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
} from "../../redux/slice/orders";
import OrderService from "../../service/order";

const TableOrder = ({ item, setItem, setIsPayment }) => {
  const { tables } = useSelector((state) => state.table);
  const table = tables.filter((c) => c._id === item.tableId)[0];
  const dispatch = useDispatch();

  const response = { ...item, isNew: false };

  const editOrder = async (id) => {
    dispatch(getOrdersStart());
    try {
      const { data } = await OrderService.editOrder(id, response);
      dispatch(getOrdersSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure());
    }
  };

  return (
    <div className={`order-box ${item.isNew ? "new" : ""}`}>
      <div className="map">
        <iframe
          width="400"
          height="300"
          style={{ border: "none" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${item.location.lat},${
            item.location.lon
          }&z=${16}&output=embed`}
          title="google map"
        ></iframe>
      </div>
      <div className="order-info">
        <div className="order-table">
          <h3>{table?.title}</h3>
          <p>{item.totalPrice} so'm</p>
        </div>
        <ul className="row">
          {item.selectFoods.map((order) => {
            const equalOrder = item.allOrders.filter((c) => c._id == order._id);
            return (
              <li>
                {equalOrder.length} {order.foodName}
              </li>
            );
          })}
        </ul>
        <div className="buttons">
          <button
            className="btn btn-primary m-2"
            onClick={() => editOrder(item._id)}
          >
            Qabul qilish
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setIsPayment(true);
              setItem(item);
            }}
          >
            To'lash
          </button>
        </div>
      </div>
      <div className="date">
        {moment(item.orderedAt).format("D.M.YYYY, HH:mm ")}
      </div>
    </div>
  );
};

export default TableOrder;
