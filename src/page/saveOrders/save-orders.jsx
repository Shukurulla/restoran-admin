import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/slice/ui";
import Payment from "../order/payment";
import FoodList from "./food-list";
import "./saved.scss";

const SaveOrders = () => {
  const { saved } = useSelector((state) => state.saved);
  const f = new Intl.NumberFormat("es-ps");
  const [item, setItem] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage("Saqlanganlar"));
  }, []);

  const onPayment = (item) => {
    setItem(item);
    setShowPayment(true);
  };

  return (
    <div className="scroll-bar">
      {showPayment && (
        <Payment
          item={item}
          setState={setShowPayment}
          debt={true}
          submitType={"report"}
        />
      )}
      <h2>Saqlangan Buyurtmalar</h2>
      {saved
        .slice(0)
        .reverse()
        .map((item) => {
          return (
            <div className="saved-order">
              <div className="saved-order-info">
                <div>
                  {" "}
                  <h4>{item.savedOrder.tableName}</h4>
                  <FoodList item={item} />
                </div>
                <div>
                  <p>{f.format(item.savedOrder.totalPrice)} so'm</p>
                </div>
              </div>
              <div className="buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => onPayment(item)}
                >
                  To'lash
                </button>
                <p>{`${new Date(
                  item.savedOrder.orderedAt
                ).getDate()}.${new Date(
                  item.savedOrder.orderedAt
                ).getMonth()}.${new Date(
                  item.savedOrder.orderedAt
                ).getFullYear()}, ${new Date(
                  item.savedOrder.orderedAt
                ).getHours()}:${new Date(
                  item.savedOrder.orderedAt
                ).getMinutes()}`}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SaveOrders;
