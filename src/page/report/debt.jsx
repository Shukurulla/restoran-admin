import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getPaymentsSuccess } from "../../redux/slice/payment";
import PaymentService from "../../service/payment";
import DebtService from "../../service/debt";
import {
  getDebtFailure,
  getDebtStart,
  getDebtSuccess,
} from "../../redux/slice/debt";
import { changePage } from "../../redux/slice/ui";

const Debt = () => {
  const { debt } = useSelector((state) => state.debt);
  const f = new Intl.NumberFormat("es-sp");
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
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

  const onPayment = async (order, id) => {
    dispatch(getDebtStart());
    try {
      const { data } = await PaymentService.postPayment({
        status: "To'landi",
        order,
      });
      dispatch(getPaymentsSuccess(data));
      const orders = await DebtService.deleteDebt(id);

      dispatch(getDebtSuccess(orders.data));
    } catch (error) {
      console.log(error);
      dispatch(getDebtFailure());
    }
  };

  return (
    <>
      <h2>Qarzdorlar</h2>
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
            <th>Sozlama</th>
          </thead>
          <tbody>
            {debt
              .slice()
              .reverse()
              .map((item, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{moment(item.orders.orderedAt).format("DD.MM.YYYY")}</td>
                  <td>{f.format(item.orders.totalPrice)}so'm</td>
                  <td>{item.paymentTerm}</td>
                  <td>{item.gage}</td>
                  <td>
                    <button
                      className="btn mx-2 btn-primary"
                      onClick={() => onPayment(item.orders, item._id)}
                    >
                      Tolandi
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="">jami: {f.format(score)}so'm</div>
    </>
  );
};

export default Debt;
