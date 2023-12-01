import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./order.scss";

const AddOrder = () => {
  const { tables } = useSelector((state) => state.table);
  const { foods } = useSelector((state) => state.food);

  const [table, setTable] = useState(null);
  const [isType, setIsType] = useState(false);
  const [filterFoods, setFilterFoods] = useState(false);
  const [word, setWord] = useState("");
  const [foodCount, setFoodCount] = useState([]);
  /*
  
  orderedAt(pin): "2023-11-29T03:53:07.924Z"
tableId(pin): "65534ab7f6db898018b6a269"
totalPrice(pin): "17250"
tableName(pin): "banketniy 1-stol"
isNew(pin): true

  */

  const formData = {
    orderedAt: new Date(),
    tableId: `65534ab7f6db898018b6a269`,
    totalPrice: "17250",
    tableName: "banketniy 1-stol",
    isNew: true,
  };

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
    console.log(foodCount);
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h3 className="form-title">Qo'lda buyurtma berish </h3>
        <div className="form-info">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label>Stol nomi</label>
              <select>
                {tables.map((item) => (
                  <option value={item._id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
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
                  {filterFoods
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
                {foodCount.map((item) => (
                  <li className=" d-flex align-items-center justify-content-between">
                    {item} <i className="bi bi-x-lg"></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
