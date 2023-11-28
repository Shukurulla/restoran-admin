import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersSuccess } from "../../redux/slice/orders";
import {
  getPaymentsFailure,
  getPaymentsStart,
  getPaymentsSuccess,
} from "../../redux/slice/payment";
import OrderService from "../../service/order";
import PaymentService from "../../service/payment";

const Payment = ({ item, setState }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [modalType, setModalType] = useState("payment");
  const [clientName, setClientName] = useState("");

  const payment = { order: item, status: "To'landi" };

  const onPayment = async () => {
    dispatch(getPaymentsStart());
    try {
      const { data } = await PaymentService.postPayment(payment);
      dispatch(getPaymentsSuccess(data));
      const orders = await OrderService.deleteOrder(item._id);
      dispatch(getOrdersSuccess(orders.data));
      setState(false);
    } catch (error) {
      console.log(error);
      dispatch(getPaymentsFailure());
    }
  };

  return (
    <div className="modal-box">
      {modalType === "payment" ? (
        <div className="form-box">
          <h4>Hisobotlarga kiritish</h4>
          <div className="text-end">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => onPayment()}
            >
              Naqt to'ladi
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setModalType("debt")}
            >
              Qarzga qo'shish
            </button>
          </div>
        </div>
      ) : (
        <div className="form-box">
          <h4>Qarzga kiritish</h4>
          <input
            type="text"
            className="form-input "
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ismi"
          />
          <input
            type="number"
            className="form-input"
            placeholder="Telefon raqami"
          />

          <input type="string" className="form-input" placeholder="Garov" />
          <input
            type="text"
            className="form-input"
            placeholder="To'lash muddati"
          />

          <div className="text-end">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => setModalType("payment")}
            >
              Naqt to'ladi
            </button>
            <button className="btn btn-primary">Qarzga qo'shish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
