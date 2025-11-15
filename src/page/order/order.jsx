import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { changePage } from "../../redux/slice/ui";
import AddOrder from "./addOrder";
import "./order.scss";
import Payment from "./payment";
import moment from "moment";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { calls } = useSelector((state) => state.call);
  const { payments } = useSelector((state) => state.payment);
  const [isPayment, setIsPayment] = useState(false);
  const [isAddOrder, setIsAddOrder] = useState(false);
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  // Bugungi statistika
  const todayStats = useMemo(() => {
    const today = moment().format("YYYY-MM-DD");
    const todayPayments = payments.filter((payment) =>
      moment(payment.createdAt).format("YYYY-MM-DD") === today
    );

    const totalRevenue = todayPayments.reduce((sum, payment) => sum + (payment.totalPrice || 0), 0);
    const totalOrders = todayPayments.length;
    const paidOrders = todayPayments.filter((p) => p.status === "paid").length;
    const unpaidOrders = todayPayments.filter((p) => p.status === "unpaid").length;

    return {
      totalRevenue,
      totalOrders,
      paidOrders,
      unpaidOrders,
    };
  }, [payments]);

  useEffect(() => {
    dispatch(changePage("Yangi Buyurtmalar"));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="order"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {isPayment && (
        <Payment
          submitType={"report"}
          debt={true}
          item={item}
          setState={setIsPayment}
        />
      )}
      {isAddOrder && <AddOrder setIsAddOrder={setIsAddOrder} />}
      <motion.div className="order-header" variants={headerVariants}>
        <h2>Buyurtmalar </h2>
      </motion.div>

      {/* Yangi Buyurtmalar */}
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <motion.div
            className="order-info-box"
            onClick={() => navigate("/restoran/orders/food")}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {orders.length > 0 && <div className="msg">{orders.length}</div>}
            <div className="icon-box">
              <i className="bi bi-cup-hot"></i>
            </div>
            <div className="title">Taomlar</div>
          </motion.div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <motion.div
            className="order-info-box"
            onClick={() => navigate("/restoran/orders/call")}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {calls.length > 0 && <div className="msg">{calls.length}</div>}
            <div className="icon-box">
              <i className="bi bi-bell"></i>
            </div>
            <div className="title">Ofitsiyant Chaqiruv</div>
          </motion.div>
        </div>
      </div>

      {/* Bugungi Statistika */}
      <motion.div className="order-header mt-4" variants={headerVariants}>
        <h2>Bugungi Statistika</h2>
        <span className="text-muted">{moment().format("DD MMMM YYYY")}</span>
      </motion.div>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <motion.div
            className="stats-card total-revenue"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="stats-icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stats-content">
              <h3>{todayStats.totalRevenue.toLocaleString()} so'm</h3>
              <p>Umumiy Daromad</p>
            </div>
          </motion.div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <motion.div
            className="stats-card total-orders"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="stats-icon">
              <i className="bi bi-receipt"></i>
            </div>
            <div className="stats-content">
              <h3>{todayStats.totalOrders}</h3>
              <p>Jami Buyurtmalar</p>
            </div>
          </motion.div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <motion.div
            className="stats-card paid-orders"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="stats-icon">
              <i className="bi bi-check-circle"></i>
            </div>
            <div className="stats-content">
              <h3>{todayStats.paidOrders}</h3>
              <p>To'langan</p>
            </div>
          </motion.div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <motion.div
            className="stats-card unpaid-orders"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="stats-icon">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="stats-content">
              <h3>{todayStats.unpaidOrders}</h3>
              <p>Kutilmoqda</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Order;
