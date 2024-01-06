import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./order.scss";

const AddOrder = ({ setIsAddOrder }) => {
  const { tables } = useSelector((state) => state.table);
  const { foods } = useSelector((state) => state.food);

  const [table, setTable] = useState(null);
  const [isType, setIsType] = useState(false);
  const [filterFoods, setFilterFoods] = useState(false);
  const [word, setWord] = useState("");
  const [foodCount, setFoodCount] = useState([]);

  const onTypeHandler = (word) => {
    setIsType(!isType);
    setWord(word);
    const filter =
      word.length > 0 &&
      foods.filter(
        (c) =>
          c.foodName.slice(0, word.length).toLowerCase() === word.toLowerCase()
      );
    setFilterFoods(filter);
  };

  const addOrderHandler = (food) => {
    setFoodCount([...foodCount, food]);
    setWord("");
    setIsType(false);
  };

  const deleteOrder = (idx) => {
    setFoodCount(foodCount.filter((_, id) => id !== idx));
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h3 className="form-title">Qo'lda buyurtma berish </h3>
        <div className="form-info">
          <div className="">
            <div className="">
              <label>Stol nomi</label>
              <select>
                {tables.map((item) => (
                  <option value={item._id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="py-3">
              <label>Taom nomi</label>
              <input
                type="text"
                placeholder="Taom nomi"
                className="form-input"
                value={word}
                onChange={(e) => onTypeHandler(e.target.value)}
              />
              {isType == true ? (
                <ul className="search-food">
                  {filterFoods.length > 0
                    ? filterFoods.map((item) => (
                        <li onClick={() => addOrderHandler(item.foodName)}>
                          {item.foodName}
                        </li>
                      ))
                    : "Hechnarsa topilmadi"}
                </ul>
              ) : (
                ""
              )}
              <ul className="select-food m-0 p-0">
                {foodCount.map((item, idx) => (
                  <li className=" d-flex align-items-center justify-content-between">
                    {item}
                    <div className="d-flex gap-3">
                      <div className="btns d-flex">
                        <div className="btn-minus">-</div>
                        <div className="btn-minus">1</div>
                        <div className="btn-plus">+</div>
                      </div>
                      <i
                        className="bi bi-x-lg"
                        onClick={() => deleteOrder(idx)}
                      ></i>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <button
            className="btn btn-outline-primary"
            onClick={() => setIsAddOrder(false)}
          >
            Bekor Qilish
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddOrder(false)}
          >
            Yuborish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
