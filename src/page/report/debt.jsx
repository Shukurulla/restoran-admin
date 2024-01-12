import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { changePage } from "../../redux/slice/ui";
import { useNavigate } from "react-router-dom";
import Payment from "../order/payment";
import DebtService from "../../service/debt";
import PaymentService from "../../service/payment";

const Debt = () => {
  const { debt } = useSelector((state) => state.debt);
  const { unpaid } = useSelector((state) => state.ui);
  const f = new Intl.NumberFormat("es-sp");
  const [score, setScore] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(changePage("Hisobot"));
    setScore(
      debt.length > 0
        ? debt
            ?.map((item) => +item.orders.totalPrice)
            ?.reduce((one, two) => one + two)
        : 0
    );
  }, []);

  const showHandler = (item) => {
    setItem(item);
    setIsShow(true);
  };

  const submit = (status) => {
    const paymentSchema = {
      order: {
        tableName: item.orders.tableName,
        orderedAt: item.orders.orderedAt,
        totalPrice: +item.orders.totalPrice,
      },
      status,
      ofitsiantPrice: item.orders.ofitsiantPrice,
      similarOrder: item.orders.similarOrder,
    };
    try {
      PaymentService.postPayment(dispatch, paymentSchema);
      DebtService.deleteDebt(dispatch, item._id);
      setIsShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex  align-items-center justify-content-between">
        {isShow && (
          <div className="payment-box">
            <div className="alert">
              <h2 className="d-flex align-items-center justify-content-between">
                <span>{item.name}</span>{" "}
                <i className="bi bi-x" onClick={() => setIsShow(false)}></i>
              </h2>
              <h4 className="d-flex align-items-center justify-content-between">
                <span>Qarz sanasi:</span>{" "}
                <span>
                  {moment(item.orders.orderedAt).format("DD.MM.YYYY")},{" "}
                  {new Date(item.orders.orderedAt).getHours()}:
                  {new Date(item.orders.orderedAt).getMinutes()}
                </span>
              </h4>
              <h4 className="d-flex align-items-center justify-content-between">
                <span>Tolash summasi:</span>{" "}
                <span>{f.format(+item.orders.totalPrice)} so'm</span>
              </h4>
              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => submit("Naqt toladi")}
                >
                  Naqt to'lash
                </button>
                <button
                  className="btn btn-outline-primary mx-3"
                  onClick={() => submit("Plastik Karta")}
                >
                  Plastik karta
                </button>
              </div>
            </div>
          </div>
        )}
        <h2 className="d-flex align-items-center m-0 p-0 gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/restoran/report")}
          >
            <i className="bi bi-arrow-left"></i> Orqaga
          </button>{" "}
          Qarzdorlar
        </h2>
        <h4 className="">Jami tushum: {f.format(score.toFixed(0))}so'm</h4>
      </div>
      <div className="scroll-bar h-60 bg">
        <table className="table bg-transparent table-striped">
          <thead>
            <th>No.</th>
            <th>Ism</th>
            <th>Tel</th>
            <th>Buyurtma vaqti</th>
            <th>Summasi</th>
            <th>Tolash Sanasi</th>
            <th>Garov</th>
          </thead>
          <tbody>
            {debt
              .slice()
              .reverse()
              .map((item, idx) => {
                return (
                  <tr
                    className={
                      unpaid.filter((c) => c.paymentTerm == item.paymentTerm)
                        .length
                        ? "unpaid"
                        : ""
                    }
                  >
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>
                      {moment(item.orders.orderedAt).format("DD.MM.YYYY HH:MM")}
                    </td>
                    <td>{f.format(item.orders.totalPrice)}so'm</td>
                    <td>{item.paymentTerm}</td>
                    <td>{item.gage}</td>
                    <td>
                      <button
                        className="btn mx-2 btn-success"
                        onClick={() => showHandler(item)}
                      >
                        Tolandi
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Debt;
