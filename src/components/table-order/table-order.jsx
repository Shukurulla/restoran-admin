import React from "react";
import { useSelector } from "react-redux";

const TableOrder = ({ item }) => {
  const { tables } = useSelector((state) => state.table);
  const table = tables.filter((c) => c._id === item.tableId)[0];
  return (
    <div className="order-box">
      <div className="map">
        <iframe
          width="300"
          height="200"
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
        <div className="order-table">{table.title}</div>
        <ul>
          {item.selectFoods.map((order) => {
            const equalOrder = item.allOrders.filter((c) => c._id == order._id);
            return (
              <li>
                {order.foodName} {equalOrder.length}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TableOrder;
