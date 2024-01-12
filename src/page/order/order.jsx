import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import microphone from "../../../public/microphone.png";
import { changePage } from "../../redux/slice/ui";
import AddOrder from "./addOrder";
import "./order.scss";
import Payment from "./payment";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { calls } = useSelector((state) => state.call);
  const { karaoke } = useSelector((state) => state.karaoke);
  const [isPayment, setIsPayment] = useState(false);
  const [isAddOrder, setIsAddOrder] = useState(false);
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changePage("Yangi Buyurtmalar"));
  }, []);

  return (
    <div className="order ">
      {isPayment && (
        <Payment
          submitType={"report"}
          debt={true}
          item={item}
          setState={setIsPayment}
        />
      )}
      {isAddOrder && <AddOrder setIsAddOrder={setIsAddOrder} />}
      <div className="order-header">
        <h2>Buyurtmalar </h2>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div
            className="order-info-box"
            onClick={() => navigate("/restoran/orders/food")}
          >
            {orders.length > 0 && <div className="msg">{orders.length}</div>}
            <div className="icon-box">
              <i className="bi bi-cup-hot"></i>
            </div>
            <div className="title">Taomlar</div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div
            className="order-info-box"
            onClick={() => navigate("/restoran/orders/call")}
          >
            {calls.length > 0 && <div className="msg">{calls.length}</div>}
            <div className="icon-box">
              <i className="bi bi-bell"></i>
            </div>
            <div className="title">Ofitsiyant Chaqiruv</div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div
            className="order-info-box"
            onClick={() => navigate("/restoran/orders/karaoke")}
          >
            {karaoke.length > 0 && <div className="msg">{karaoke.length}</div>}
            <div className="icon-box">
              <img src={microphone} alt="" />
            </div>
            <div className="title">Karaoke</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
