import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableOrder from "../../components/table-order/table-order";
import { changePage } from "../../redux/slice/ui";
import AddOrder from "./addOrder";
import "./order.scss";
import Payment from "./payment";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [isPayment, setIsPayment] = useState(false);
  const [isAddOrder, setIsAddOrder] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    dispatch(changePage("Buyurtmalar"));
  }, []);

  return (
    <div className="order ">
      {isPayment && <Payment item={item} setState={setIsPayment} />}
      {isAddOrder && <AddOrder />}
      <div className="order-header">
        <h2>Buyurtmalar ({orders.length})</h2>
      </div>

      <div className="table-order scroll-bar">
        {orders
          ?.slice(0)
          .reverse()
          .map((item) => (
            <TableOrder
              item={item}
              setItem={setItem}
              setIsPayment={setIsPayment}
            />
          ))}
      </div>
    </div>
  );
};

export default Order;
