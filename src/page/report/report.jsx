import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="report-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="report-header-new" variants={headerVariants}>
        <div className="header-left">
          <h2>
            <i className="bi bi-graph-up-arrow"></i> Hisobotlar
          </h2>
          <p className="subtitle">Moliyaviy ma'lumotlar va statistika</p>
        </div>
        <button
          className="debt-btn"
          onClick={() => navigate("/restoran/report/debt")}
        >
          <i className="bi bi-exclamation-triangle"></i>
          Qarzdorlar
          {unpaid.length > 0 && (
            <span className="debt-badge">{unpaid.length}</span>
          )}
        </button>
      </motion.div>

      {/* Statistika kartlari */}
      <motion.div className="stats-summary" variants={containerVariants}>
        <motion.div
          className="stat-card total"
          variants={statCardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="stat-icon">
            <i className="bi bi-cash-stack"></i>
          </div>
          <div className="stat-content">
            <h4>Jami Tushum</h4>
            <h2>{f.format(score.toFixed(0))} so'm</h2>
          </div>
        </motion.div>
        <motion.div
          className="stat-card orders"
          variants={statCardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="stat-icon">
            <i className="bi bi-receipt"></i>
          </div>
          <div className="stat-content">
            <h4>Buyurtmalar Soni</h4>
            <h2>{filterPayments.length}</h2>
          </div>
        </motion.div>
        <motion.div
          className="stat-card cash"
          variants={statCardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="stat-icon">
            <i className="bi bi-wallet2"></i>
          </div>
          <div className="stat-content">
            <h4>Naqt To'lov</h4>
            <h2>
              {filterPayments.filter((p) => p.status === "Naqt toladi").length}
            </h2>
          </div>
        </motion.div>
        <motion.div
          className="stat-card card-payment"
          variants={statCardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="stat-icon">
            <i className="bi bi-credit-card"></i>
          </div>
          <div className="stat-content">
            <h4>Plastik Karta</h4>
            <h2>
              {filterPayments.filter((p) => p.status === "Plastik Karta").length}
            </h2>
          </div>
        </motion.div>
      </motion.div>

      {/* Filter panel */}
      <div className="filter-panel">
        <div className="period-filters">
          <button
            className={`filter-btn ${activeBtn === "thisDay" ? "active" : ""}`}
            onClick={() => thisDay()}
          >
            <i className="bi bi-calendar-day"></i>
            Bugungi
          </button>
          <button
            className={`filter-btn ${activeBtn === "thisMonth" ? "active" : ""}`}
            onClick={() => thisMonth()}
          >
            <i className="bi bi-calendar-month"></i>
            Shu oy
          </button>
          <button
            className={`filter-btn ${activeBtn === "thisYear" ? "active" : ""}`}
            onClick={() => thisYear()}
          >
            <i className="bi bi-calendar-range"></i>
            Shu yil
          </button>
          <button
            className={`filter-btn ${activeBtn === "allDate" ? "active" : ""}`}
            onClick={() => allDate()}
          >
            <i className="bi bi-calendar3"></i>
            Barchasi
          </button>
        </div>

        <div className="date-picker-wrapper">
          <i className="bi bi-calendar-event"></i>
          <input
            type="date"
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Payment type filters */}
      <div className="payment-filters">
        <button
          onClick={() => filters.all()}
          className={`payment-btn ${filterStatus === "all" ? "active" : ""}`}
        >
          <i className="bi bi-list-ul"></i>
          Barchasi
        </button>
        <button
          className={`payment-btn ${
            filterStatus === "Naqt toladi" ? "active" : ""
          }`}
          onClick={() => filters.naqt()}
        >
          <i className="bi bi-cash"></i>
          Naqt To'lov
        </button>
        <button
          className={`payment-btn ${
            filterStatus === "Plastik Karta" ? "active" : ""
          }`}
          onClick={() => filters.plastik()}
        >
          <i className="bi bi-credit-card-2-front"></i>
          Plastik Karta
        </button>
      </div>

      {/* Table */}
      <div className="report-table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Stol</th>
              <th>Vaqt</th>
              <th>Summa</th>
              <th>To'lov Turi</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            {filterPayments.length > 0 ? (
              filterPayments
                .slice()
                .reverse()
                .map((item, idx) => (
                  <motion.tr
                    key={idx}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td>
                      <span className="row-number">{idx + 1}</span>
                    </td>
                    <td>
                      <div className="table-cell">
                        <i className="bi bi-table"></i>
                        <strong>{item.order.tableName}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="time-badge">
                        <i className="bi bi-clock"></i>
                        {moment(item.order.orderedAt).format("HH:mm")}
                      </span>
                    </td>
                    <td>
                      <span className="price-badge">
                        {f.format(item.order.totalPrice)} so'm
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "Plastik Karta" ? "card" : "cash"
                        }`}
                      >
                        {item.status === "Plastik Karta" ? (
                          <i className="bi bi-credit-card"></i>
                        ) : (
                          <i className="bi bi-cash"></i>
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className="date-text">
                        {moment(item.order.orderedAt).format("DD.MM.YYYY")}
                      </span>
                    </td>
                  </motion.tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <i className="bi bi-inbox"></i>
                  <p>Ma'lumot topilmadi</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Report;
