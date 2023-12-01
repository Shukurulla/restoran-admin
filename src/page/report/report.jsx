import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/slice/ui";
import moment from "moment/moment";
import "./report.scss";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment(Date()).format("YYYY-MM-DD"));
  const f = new Intl.NumberFormat("es-sp");
  const navigate = useNavigate();

  const { payments } = useSelector((state) => state.payment);
  const { orders } = useSelector((state) => state.order);

  const [activeBtn, setActiveBtn] = useState("thisDay");
  const [score, setScore] = useState(0);

  const [filterPayments, setFilteredPayments] = useState(
    payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY-MM-DD") ===
        moment(Date()).format("YYYY-MM-DD")
    )
  );
  const thisDay = () => {
    setActiveBtn("thisDay");
    setDate(moment(Date()).format("YYYY-MM-DD"));
    setFilteredPayments(
      payments.filter(
        (c) =>
          moment(c.order.orderedAt).format("YYYY-MM-DD") ===
          moment(Date()).format("YYYY-MM-DD")
      )
    );
  };

  const thisMonth = () => {
    setActiveBtn("thisMonth");
    setFilteredPayments(
      payments.filter(
        (c) =>
          moment(c.order.orderedAt).format("YYYY-MM") ===
          moment(Date()).format("YYYY-MM")
      )
    );
  };
  const thisYear = () => {
    setActiveBtn("thisYear");
    setFilteredPayments(
      payments.filter(
        (c) =>
          moment(c.order.orderedAt).format("YYYY") ===
          moment(Date()).format("YYYY")
      )
    );
  };

  const allDate = () => {
    setActiveBtn("all");
    setFilteredPayments(payments);
  };

  useEffect(() => {
    setActiveBtn("");
    setFilteredPayments(
      payments.filter(
        (c) =>
          moment(c.order.orderedAt).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      )
    );
    if (
      moment(date).format("YYYY-MM-DD") === moment(Date()).format("YYYY-MM-DD")
    ) {
      setActiveBtn("thisDay");
    }
  }, [date]);

  useEffect(() => {
    dispatch(changePage("Hisobot"));
    setActiveBtn("thisDay");
    setFilteredPayments(
      payments.filter(
        (c) =>
          moment(c.order.orderedAt).format("YYYY-MM-DD") ===
          moment(Date()).format("YYYY-MM-DD")
      )
    );
  }, []);

  useEffect(() => {
    setScore(
      filterPayments.length > 0
        ? filterPayments
            ?.map((item) => +item.order.totalPrice)
            ?.reduce((one, two) => one + two)
        : 0
    );
  }, [filterPayments, date]);

  return (
    <div>
      <div className="report-header">
        <h2>Hisobotlar</h2>
        <div
          className="btn btn-outline-primary"
          onClick={() => navigate("/report/debt")}
        >
          Qarzdorlar
        </div>
      </div>
      <div className="report-options">
        <div className="btn-group">
          <div
            className={`btn  ${
              activeBtn == "thisDay" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => thisDay()}
          >
            Bugungi
          </div>
          <div
            className={`btn ${
              activeBtn === "thisMonth" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => thisMonth()}
          >
            Shu oy
          </div>
          <div
            className={`btn ${
              activeBtn == "thisYear" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => thisYear()}
          >
            Shu yil
          </div>
          <div
            className={`btn ${
              activeBtn == "all" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => allDate()}
          >
            Barchasi
          </div>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="scroll-bar h-60 bg">
        <table className="table bg-transparent table-striped ">
          <thead>
            <th>No.</th>
            <th>Stol Nomi</th>
            <th>Buyurtma vaqti</th>
            <th>Buyurtma summasi</th>
            <th>Status</th>
            <th>Sanasi</th>
          </thead>
          <tbody>
            {filterPayments
              .slice()
              .reverse()
              .map((item, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{item.order.tableName}</td>
                  <td>{moment(item.order.orderedAt).format(" HH:mm ")}</td>
                  <td>{f.format(item.order.totalPrice)} so'm</td>
                  <td>{item.status}</td>
                  <td>{moment(item.order.orderedAt).format("DD.MM.YYYY")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="">jami: {f.format(score)}so'm</div>
    </div>
  );
};

export default Report;
