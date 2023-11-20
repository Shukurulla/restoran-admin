import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableOrder from "../../components/table-order/table-order";
import { changePage } from "../../redux/slice/ui";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(changePage("Buyurtmalar"));
  }, []);
  return (
    <div className="order">
      <div className="order-header">
        <h2>Buyurtmalar</h2>
      </div>

      <div className="table-order">
        {orders.map((item) => (
          <TableOrder item={item} />
        ))}
      </div>
    </div>
  );
};

export default Order;
