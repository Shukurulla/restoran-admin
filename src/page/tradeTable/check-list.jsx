import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DebtService from "../../service/debt";
import PaymentService from "../../service/payment";
import SavedService from "../../service/saved-service";
import "./trade-table.scss";

const CheckList = ({ id, setState }) => {
  const { saved } = useSelector((state) => state.saved);
  const { tables } = useSelector((state) => state.table);
  const [debtWindow, setDebtWindow] = useState(false);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [gage, setGage] = useState("");
  const [dedline, setDedline] = useState("");
  const dispatch = useDispatch();

  const equalTrade = saved.filter((c) => c.tableId == id);

  const foods = equalTrade?.filter((item) => item.orderType == "food");
  const karaoke = equalTrade?.filter((item) => item.orderType == "karaoke");

  const firstOrder = equalTrade?.filter((c) => c.place == "first")[0];
  var hozirgiVaqt = new Date();
  var buyurtmaVaqtiObj = new Date(firstOrder?.savedOrder?.orderedAt);
  var farq = hozirgiVaqt - buyurtmaVaqtiObj;
  var farqDaqiqa = Math.floor(farq / (1000 * 60));

  var karaokeTime = new Date(karaoke[0]?.savedOrder.item?.orderedAt);
  var now = hozirgiVaqt - karaokeTime;
  var minutes = Math.floor(now / (1000 * 60));

  const f = new Intl.NumberFormat("es-sp");
  const hour = new Date().getHours();

  const foodPrice = eval(
    foods?.map((item) => +item.savedOrder.totalPrice).join("+")
  );
  console.log(foods);
  const discount = firstOrder?.savedOrder?.discount == true ? 10 : 0;
  const tablePrice =
    (tables.filter((c) => c._id == id)[0].surcharge / 60) * farqDaqiqa;
  const service = hour > 18 && hour > 4 ? 15 / 100 : 10 / 100;

  const totalPrice =
    (minutes ? minutes * (20000 / 60) : 0) +
    equalTrade[0].numberOfPeople * 7000 +
    foodPrice +
    +tablePrice;

  const isDiscount =
    discount === 0
      ? (totalPrice + totalPrice * service).toFixed(0)
      : (
          totalPrice -
          (totalPrice + totalPrice * service * 10) / 100 +
          (totalPrice - (totalPrice + totalPrice * service * 10) / 100) *
            service
        ).toFixed(0);

  const ofitsiantPrice = totalPrice * service;

  const submitHandler = (status) => {
    const paymentSchema = {
      order: {
        tableName: firstOrder?.savedOrder?.tableName,
        orderedAt: firstOrder?.savedOrder?.orderedAt,
        totalPrice: totalPrice - (totalPrice * discount) / 100,
      },
      status,
      ofitsiantPrice,
      similarOrder: equalTrade,
    };
    try {
      PaymentService.postPayment(dispatch, paymentSchema);
      equalTrade.map((item) => {
        SavedService.deleteSaved(dispatch, item._id);
        SavedService.getSaved(dispatch);
      });
      setState(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(
      foods.map((item) => item.savedOrder.allOrders.forEach((item) => item))
    );
  }, []);

  const debtSchema = {
    name: name,
    phone: tel,
    gage,
    paymentTerm: dedline,
    orders: {
      tableName: firstOrder?.savedOrder?.tableName,
      orderedAt: firstOrder?.savedOrder?.orderedAt,
      totalPrice: isDiscount,
      similarOrder: equalTrade,
    },
  };

  const submitDebtHandler = () => {
    try {
      DebtService.postDebt(dispatch, debtSchema);
    } catch (error) {}
  };

  return (
    <div className="check-content">
      {debtWindow == false ? (
        <div className="check-box">
          <div className="check-header d-flex align-items-center justify-content-between">
            <h4>{equalTrade[0].savedOrder.tableName}</h4>
            <i
              className="bi bi-x-lg pointer"
              onClick={() => setState(false)}
            ></i>
          </div>
          <ul>
            <li>
              Bandlik soatiga {f.format(firstOrder?.savedOrder?.surcharge)}{" "}
              so'm:
              <ul>
                <li>
                  Buyurtma vaqti:{" "}
                  {`${moment(firstOrder?.savedOrder?.orderedAt).format(
                    "DD.MM.YYYY"
                  )}, ${new Date(
                    firstOrder?.savedOrder?.orderedAt
                  ).getHours()}:${new Date(
                    firstOrder?.savedOrder?.orderedAt
                  ).getMinutes()}`}
                </li>
                <li>
                  Hozirgi vaqt:{" "}
                  {`${moment(new Date()).format(
                    "DD.MM.YYYY"
                  )}, ${new Date().getHours()}:${new Date().getMinutes()}`}{" "}
                </li>
                <li>
                  Bandlik uchun jami:{" "}
                  {farqDaqiqa / 60 >= 1
                    ? `${(farqDaqiqa / 60).toFixed(2)} soat`
                    : `${farqDaqiqa.toFixed(0)} daqiqa`}
                </li>
                <li>
                  Jami summa:{" "}
                  {f.format(
                    (
                      (farqDaqiqa / 60) *
                      firstOrder?.savedOrder?.surcharge
                    ).toFixed(0)
                  )}{" "}
                  so'm
                </li>
              </ul>
            </li>
            <li>
              Taomlar:
              <ul>
                {foods.map((item) => {
                  const uniqueArray = Array.from(
                    new Set(item.savedOrder.allOrders.map((food) => food?._id))
                  );
                  return (
                    <li>
                      {uniqueArray.map((id) => (
                        <p className="m-0 p-0">
                          {
                            item.savedOrder.allOrders.filter((c) => c._id == id)
                              .length
                          }{" "}
                          {
                            item.savedOrder.allOrders.filter(
                              (c) => c._id == id
                            )[0]?.foodName
                          }
                        </p>
                      ))}
                    </li>
                  );
                })}
                <li>Jami summa: {f.format(foodPrice)} so'm</li>
              </ul>
            </li>
            {tables.filter((c) => c._id == equalTrade[0]?.tableId)[0].forDJ ==
              true && (
              <li>
                Musiqa uchun: {f.format(equalTrade[0]?.numberOfPeople * 7000)}
                so'm
              </li>
            )}

            {karaoke.length > 0 && (
              <li>
                Karaoke uchun 20.000 so'm:
                <ul>
                  <li>
                    Bandlik:{" "}
                    {minutes / 60 >= 1
                      ? `${(minutes / 60).toFixed(2)} soat`
                      : `${minutes.toFixed(0)} daqiqa`}
                  </li>
                  <li>
                    Jami: {f.format((minutes * (20000 / 60)).toFixed())} som
                  </li>
                </ul>
              </li>
            )}
            <li>
              Xizmat korsatish Narxi {service * 100}% :{" "}
              {f.format(ofitsiantPrice.toFixed(0))} so'm
            </li>
            <li>
              Tushlik uchun (12:00-15:00) chegirma 10%:{" "}
              {firstOrder?.savedOrder?.discount == true
                ? `${f.format((totalPrice * 0.1).toFixed(0))} so'm`
                : "chegirma mavjud emas"}
            </li>
            <li>Jami hisob: {f.format(isDiscount)} so'm</li>
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => submitHandler("Naqt toladi")}
          >
            Naqt to'lash
          </button>
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => submitHandler("Plastik Karta")}
          >
            Plastik
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setDebtWindow(true)}
          >
            Qarzga
          </button>
        </div>
      ) : (
        <div className="check-box w-50 mx-auto">
          <h3>Qarzga qo'shish</h3>
          <input
            type="text"
            placeholder="Qarzdorning ismi..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Telefon raqami..."
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Garov sifatida..."
            value={gage}
            onChange={(e) => setGage(e.target.value)}
            className="form-input"
          />
          <input
            type="date"
            value={dedline}
            onChange={(e) => setDedline(e.target.value)}
            className="form-input"
          />
          <div className="d-flex align-items-center justify-content-between">
            <button
              className="btn btn-outline-primary"
              onClick={() => setDebtWindow(false)}
            >
              Orqaga
            </button>
            <button
              className="btn btn-primary"
              onClick={() => submitDebtHandler()}
            >
              Yuborish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckList;
