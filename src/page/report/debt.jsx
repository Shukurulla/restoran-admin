import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { changePage } from "../../redux/slice/ui";
import { useNavigate } from "react-router-dom";
import Payment from "../order/payment";

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

  const onSubmit = (val) => {
    setItem(val);
    setIsShow(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        {isShow && (
          <div className="payment-box">
            <div className="alert"></div>
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
        <h4 className="">Jami tushum: {f.format(score)}so'm</h4>
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
                        onClick={() => onSubmit(item)}
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
