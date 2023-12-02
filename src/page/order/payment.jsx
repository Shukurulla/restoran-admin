import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDebt } from "../../hooks";
import { getOrdersSuccess } from "../../redux/slice/orders";
import {
  getPaymentsFailure,
  getPaymentsStart,
  getPaymentsSuccess,
} from "../../redux/slice/payment";
import OrderService from "../../service/order";
import PaymentService from "../../service/payment";
import "./order.scss";

const Payment = ({ item, setState }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [modalType, setModalType] = useState("payment");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [gage, setGage] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");

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

  const req = {
    name: clientName,
    phone,
    gage,
    paymentTerm,
    orders: item,
  };

  const formSubmit = async () => {
    await postDebt(dispatch, req, item);
    setState(false);
  };

  return (
    <div className="modal-box">
      {modalType === "payment" ? (
        <div className="form-box payment">
          <i className="bi bi-x-lg" onClick={() => setState(false)}></i>
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
            type="text"
            className="form-input"
            placeholder="Telefon raqami"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="string"
            className="form-input"
            onChange={(e) => setGage(e.target.value)}
            placeholder="Garov"
            value={gage}
          />
          <input
            type="text"
            className="form-input"
            placeholder="To'lash muddati"
            value={paymentTerm}
            onChange={(e) => setPaymentTerm(e.target.value)}
          />

          <div className="text-end">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => setModalType("payment")}
            >
              Bekor Qilish
            </button>
            <button className="btn btn-primary" onClick={() => formSubmit()}>
              Qarzga qo'shish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
