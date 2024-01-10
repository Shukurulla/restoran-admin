import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUnpaid, changePage } from "../../redux/slice/ui";
import moment from "moment/moment";
import "./report.scss";
import { useNavigate } from "react-router-dom";
import SavedService from "../../service/saved-service";

const Report = () => {
  const dispatch = useDispatch();
  const { debt } = useSelector((state) => state.debt);
  const [date, setDate] = useState(moment(Date()).format("YYYY-MM-DD"));
  const f = new Intl.NumberFormat("es-sp");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");
  const { unpaid } = useSelector((state) => state.ui);

  useEffect(() => {
    addUnpaid(
      debt.filter(
        (c) =>
          moment(c.paymentTerm).format("YYYYMMDD") <
          moment(new Date()).format("YYYYMMDD")
      )
    );
  }, []);

  const payments = useSelector((state) => state.payment.payments);
  const [filterPayments, setFilteredPayments] = useState(
    payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY-MM-DD") ===
        moment(Date()).format("YYYY-MM-DD")
    )
  );
  const [activeBtn, setActiveBtn] = useState("thisDay");
  const [score, setScore] = useState(0);

  const thisDay = () => {
    const dayDate = payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY-MM-DD") ===
        moment(Date()).format("YYYY-MM-DD")
    );
    setActiveBtn("thisDay");
    setDate(moment(Date()).format("YYYY-MM-DD"));
    setFilterStatus("all");
    setFilteredPayments(dayDate);
    localStorage.setItem("thisDay", JSON.stringify(dayDate));
  };

  const thisMonth = () => {
    const monthData = payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY-MM") ===
        moment(Date()).format("YYYY-MM")
    );
    setActiveBtn("thisMonth");
    setFilterStatus("all");
    setFilteredPayments(monthData);
    localStorage.setItem("thisMonth", JSON.stringify(monthData));
  };
  const thisYear = () => {
    const yearData = payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY") ===
        moment(Date()).format("YYYY")
    );
    setActiveBtn("thisYear");
    setFilterStatus("all");
    setFilteredPayments(yearData);
    localStorage.setItem("thisYear", JSON.stringify(yearData));
  };

  const allDate = () => {
    setActiveBtn("allDate");
    setFilteredPayments(payments);
    localStorage.setItem("allDate", JSON.stringify(payments));
  };

  useEffect(() => {
    const configDate = payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY-MM-DD") ===
        moment(date).format("YYYY-MM-DD")
    );
    setActiveBtn("configDate");
    setFilterStatus("all");
    setFilteredPayments(configDate);
    localStorage.setItem("configDate", JSON.stringify(configDate));

    if (
      moment(date).format("YYYY-MM-DD") === moment(Date()).format("YYYY-MM-DD")
    ) {
      setActiveBtn("thisDay");
    }
  }, [date]);

  useEffect(() => {
    dispatch(changePage("Hisobot"));
    setActiveBtn("thisDay");
    const dayDate = payments.filter(
      (c) =>
        moment(c.order.orderedAt).format("YYYY-MM-DD") ===
        moment(Date()).format("YYYY-MM-DD")
    );
    setFilterStatus("all");
    setFilteredPayments(dayDate);
    localStorage.setItem("thisDay", JSON.stringify(dayDate));
  }, []);

  useEffect(() => {
    setScore(
      filterPayments.length > 0
        ? filterPayments
            ?.map((item) => +item.order.totalPrice)
            ?.reduce((one, two) => one + two)
        : 0
    );
    console.log(filterPayments.filter((c) => c.status === "Plastik Karta"));
  }, [filterPayments, date]);

  const filters = {
    all: () => {
      setFilteredPayments(JSON.parse(localStorage.getItem(activeBtn)));
      setFilterStatus("all");
    },
    plastik: () => {
      const getLocalStorage = localStorage.getItem(activeBtn);
      setFilteredPayments(
        JSON.parse(getLocalStorage).filter((c) => c.status === "Plastik Karta")
      );
      setFilterStatus("Plastik Karta");
    },
    naqt: () => {
      const getLocalStorage = localStorage.getItem(activeBtn);

      setFilteredPayments(
        JSON.parse(getLocalStorage).filter((c) => c.status === "Naqt toladi")
      );
      setFilterStatus("Naqt toladi");
    },
  };

  return (
    <div>
      <div className="report-header">
        <h2>Hisobotlar</h2>
        <div
          className="btn btn-danger "
          onClick={() => navigate("/restoran/report/debt")}
        >
          Qarzdorlar
          {unpaid.length > 0 && (
            <span className="debt-msg">{unpaid.length}</span>
          )}
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
        <div className="">Jami tushum: {f.format(score.toFixed(0))}so'm</div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="btn-group mt-3">
        <button
          onClick={() => filters.all()}
          className={`btn ${
            filterStatus == "all" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Barchasi
        </button>
        <button
          className={`btn ${
            filterStatus == "Naqt toladi"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => filters.naqt()}
        >
          Naqt Tolaganlar
        </button>
        <button
          className={`btn ${
            filterStatus == "Plastik Karta"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => filters.plastik()}
        >
          Plastik Kartaga
        </button>
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
                  <td>{f.format(item.order.totalPrice.toFixed(0))} so'm</td>
                  <td>{item.status}</td>
                  <td>{moment(item.order.orderedAt).format("DD.MM.YYYY")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
