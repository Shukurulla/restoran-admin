import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SavedService from "../../service/saved-service";

const Table = ({ id, showCheckHandler }) => {
  const { tables } = useSelector((state) => state.table);
  const { saved } = useSelector((state) => state.saved);
  const [isChange, setIsChange] = useState(false);
  const peopleNumber = saved.filter((c, idx) => c.tableId == id);
  const [number, setNumber] = useState(peopleNumber[0]?.numberOfPeople);
  const similarOrders = saved.filter(
    (c) => c.tableNumber == peopleNumber[0]?.tableNumber
  );
  const dispatch = useDispatch();

  const changePeople = () => {
    try {
      similarOrders.map((item) => {
        SavedService.editSaved(dispatch, item._id, {
          ...item,
          numberOfPeople: number,
        });
      });
      setIsChange(false);
    } catch (error) {}
  };

  return (
    <div className="trade-table">
      <h3>{tables?.filter((c) => c._id == id)[0]?.title}</h3>
      <div className="d-flex gap-3">
        {tables.filter((c) => c._id == id)[0].forDJ == true && (
          <div>
            {isChange ? (
              <div className="d-flex gap-3 align-items-center">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="form-input m-0  peopleNumber"
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => changePeople()}
                >
                  <i className="bi bi-check "></i>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <p className="p-0 m-0">{peopleNumber[0]?.numberOfPeople}</p>
                <button
                  className="btn btn-outline-success"
                  onClick={() => setIsChange(true)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </div>
            )}
          </div>
        )}
        <button
          className="btn btn-primary"
          onClick={() => showCheckHandler(id)}
        >
          To'lash
        </button>
      </div>
    </div>
  );
};

export default Table;
