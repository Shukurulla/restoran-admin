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
import SavedService from "../../service/saved-service";
import { getSavedSuccess } from "../../redux/slice/saved-orders";

const TableOrder = ({ item }) => {
  const { tables } = useSelector((state) => state.table);
  const table = tables.filter((c) => c._id === item.tableId)[0];
  const dispatch = useDispatch();
  const f = new Intl.NumberFormat("es-sp");
  const { saved } = useSelector((state) => state.saved);
  const isTable = saved.filter((c) => c.tableId === item.tableId);
  let totalPrice = +item.totalPrice;

  const submitSavedOrder = async () => {
    dispatch(getOrdersStart());

    try {
      if (isTable.length == 0) {
        const saved = await SavedService.postSaved({
          savedOrder: item,
          tableId: item.tableId,
        });

        dispatch(getSavedSuccess(saved.data));
        const { data } = await OrderService.deleteOrder(item._id);
        dispatch(getOrdersSuccess(data));
      } else {
        const itemOrder = item?.allOrders;
        const itemMusic = item?.musicOrder;
        const tableOrder = isTable[0].savedOrder?.allOrders;
        const musicOrder = isTable[0].savedOrder?.musicOrder;
        const { musics } = musicOrder;

        const mix = itemOrder?.concat(tableOrder);
        isTable[0].savedOrder.allOrders?.map(
          (item) => (totalPrice += +item.price)
        );
        const val = {
          ...isTable[0],
          savedOrder: {
            ...isTable[0].savedOrder,
            allOrders: mix,
            totalPrice,
            musicOrder: {
              ...musicOrder,
              musics: [...musics, itemMusic.musics.forEach((item) => item)],
            },
          },
        };
        console.log(val);
        const { data } = await SavedService.editSaved(isTable[0]._id, val);

        dispatch(getSavedSuccess(data));
        const order = await OrderService.deleteOrder(item._id);
        dispatch(getOrdersSuccess(order.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure());
    }
  };

  return (
    <div className={`order-box ${item.isNew == "true" ? "new" : ""}`}>
      <div className="map">
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
      <div className="info">
        <div className="order-info">
          <div>
            <div className="order-table">
              <h3>{table?.title}</h3>
              <p>{f.format(item.totalPrice)} so'm</p>
            </div>
            <div className="orders d-flex gap-3">
              {item.selectFoods && (
                <div>
                  <ul className="row">
                    <h4 className="text-primary fw-600">Ovqatlar</h4>
                    {item.selectFoods?.map((order) => {
                      const equalOrder = item.allOrders?.filter(
                        (c) => c._id == order._id
                      );
                      return (
                        <li>
                          {equalOrder.length} {order.foodName}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {item.musicOrder && (
                <ul>
                  <h4 className="text-primary">Musiqalar</h4>
                  {item.musicOrder.musics.map((music) => (
                    <li>{music.musicName}.mp3</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="buttons">
            <button
              className="btn btn-primary "
              onClick={() => submitSavedOrder()}
            >
              Qabul qilish
            </button>
            <div className="">
              {moment(item.orderedAt).format("D.M.YYYY, HH:mm ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOrder;
