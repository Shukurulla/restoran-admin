import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/slice/ui";
import moment from "moment/moment";

const Report = () => {
  const dispatch = useDispatch();
  const [chartLabel, setChartLabel] = useState([
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
    "Yakshanba",
  ]);

  const { payments } = useSelector((state) => state.payment);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(changePage("Hisobot"));
    console.log(orders);
  }, []);
  return (
    <div className="scroll-bar">
      <div className="line-chart">
        {/* <Line
          data={{
            labels: chartLabel,
            datasets: [
              {
                label: "Summa",
                data: payments.map((item) => item.order.totalPrice),
              },
              {
                label: "Buyurtmalar",
                data: payments.length,
              },
            ],
          }}
        /> */}
      </div>
      <table className="table bg-transparent table-striped mt-5">
        <thead>
          <th>No.</th>
          <th>Stol Nomi</th>
          <th>Buyurtma vaqti</th>
          <th>Buyurtma summasi</th>
          <th>Status</th>
          <th>Sanasi</th>
        </thead>
        <tbody>
          {payments
            .slice()
            .reverse()
            .map((item, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.order.tableName}</td>
                <td>{moment(item.order.orderedAt).format(" HH:mm ")}</td>
                <td>{item.order.totalPrice} so'm</td>
                <td>{item.status}</td>
                <td>{moment(item.order.orderedAt).format("DD.MM.YYYY")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
