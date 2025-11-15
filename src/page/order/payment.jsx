import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDebt } from "../../hooks";
import { getDebtSuccess } from "../../redux/slice/debt";
import { getOrdersSuccess } from "../../redux/slice/orders";
import {
  getPaymentsFailure,
  getPaymentsStart,
  getPaymentsSuccess,
} from "../../redux/slice/payment";
import DebtService from "../../service/debt";
import FoodList from "../saveOrders/food-list";
import PaymentService from "../../service/payment";
import SavedService from "../../service/saved-service";
import "./order.scss";
import "../saveOrders/saved.scss";
import moment from "moment";

const Payment = ({ item, setState, debt, submitType }) => {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState("payment");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [gage, setGage] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const f = new Intl.NumberFormat("es-sp");
  const hour = new Date().getHours();

  //Hozirgi Vaqt
  var hozirgiVaqt = new Date();

  // Buyurtma vaqti
  var buyurtmaVaqtiObj = new Date(item.savedOrder.orderedAt);
  // Farqni hisoblash
  var farq = hozirgiVaqt - buyurtmaVaqtiObj;
  var farqDaqiqa = Math.floor(farq / (1000 * 60)) / 60;

  const onPayment = async (val) => {
    dispatch(getPaymentsStart());
    setIsLoading(true);
    try {
      if (submitType == "report") {
        const payment = { order: item.savedOrder, status: val };
        const { data } = await PaymentService.postPayment(payment);
        dispatch(getPaymentsSuccess(data));
        const orders = await SavedService.deleteSaved(item._id);
        dispatch(getOrdersSuccess(orders.data));
      } else if (submitType == "debt") {
        const payment = { order: item.orders, status: val };
        const { data } = await DebtService.deleteDebt(item._id);
        const payments = await PaymentService.postPayment(payment);
        dispatch(getPaymentsSuccess(payments.data));
        dispatch(getDebtSuccess(data));
      }
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
    orders: item.savedOrder,
  };

  const formSubmit = async () => {
    setIsLoading(true);
    await postDebt(dispatch, req, item);
    setState(false);
  };

  useEffect(() => {
    console.log(+farqDaqiqa * 20000);
  }, []);

  return (
    <div className="modal-box">
      {modalType === "payment" ? (
        <div className="form-box payment">
          <div className="report-header">
            <i className="bi bi-x-lg" onClick={() => setState(false)}></i>
            <h4>Hisobotlarga kiritish</h4>
          </div>
          <div className="report-info">
            <h5>Umumiy hisob va buyurtmalar</h5>
            <FoodList item={item} />
            <li>
              Bandlik uchun soatiga ({f.format(item.savedOrder.surcharge)}som):{" "}
              {f.format((+farqDaqiqa * item.savedOrder.surcharge).toFixed(0))}{" "}
              so'm{" "}
            </li>
            <li>
              Ofitsiyant xizmati uchun ({hour >= 19 ? "15" : "10"}
              %):{" "}
              {f.format(
                (
                  (+item.savedOrder.totalPrice + +farqDaqiqa * 20000) *
                  (hour >= 19 && hour < 4 ? 0.15 : 0.1)
                ).toFixed(0)
              )}{" "}
              so'm
            </li>
            <br />
            <br />
            <h5>
              Jami hisob:{" "}
              {f.format(
                (
                  +item.savedOrder.totalPrice +
                  +farqDaqiqa * item.savedOrder.surcharge +
                  (+item.savedOrder.totalPrice +
                    +farqDaqiqa * item.savedOrder.surcharge) *
                    (hour >= 19 && hour < 4 ? 0.15 : 0.1)
                ).toFixed(0)
              )}{" "}
              so'm
            </h5>
          </div>
          <div className="text-end">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => onPayment("Plastik Karta")}
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda" : "Plastik karta"}
            </button>
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => onPayment("Naqt toladi")}
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda" : "Naqt to'ladi"}
            </button>
            {debt ? (
              <button
                className="btn btn-warning"
                onClick={() => setModalType("debt")}
              >
                Qarzga qo'shish
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="form-box payment">
          <div className="report-header">
            <i className="bi bi-x-lg" onClick={() => setState(false)}></i>
            <h4>Qarzga kiritish</h4>
          </div>
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
            type="date"
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
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={() => formSubmit()}
            >
              {isLoading ? "Yuklanmoqda" : " Qarzga qo'shish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
