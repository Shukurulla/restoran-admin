import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../../redux/slice/table";
import TableService from "../../service/table";

const AddTable = ({ setState, state }) => {
  const [title, setTitle] = useState("");
  const [tableNumber, setTableNumber] = useState();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.table);
  const [surcharge, setSurcharge] = useState(0);
  const [forDJ, setForDJ] = useState(false);

  const onSubmit = async () => {
    dispatch(getTableStart());
    try {
      const { data } = await TableService.postTable({
        title,
        surcharge,
        forDJ,
        tableNumber,
      });
      dispatch(getTableSuccess(data));
      setState(false);
    } catch (error) {
      console.log(error);
      dispatch(getTableFailure());
    }
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h4>Stol Qo'shish</h4>
        <input
          type="text"
          className="form-input"
          placeholder="Stol nomini kiriting..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Stol Raqami"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Bandlik uchun ustama"
          value={surcharge}
          onChange={(e) => setSurcharge(e.target.value)}
        />
        <div
          className="d-flex align-items-center gap-2"
          onClick={() => setForDJ(!forDJ)}
        >
          <i className={`bi ${forDJ ? "bi-check-circle" : "bi-circle"}`}></i>
          <label htmlFor="check"> {"  "}DJ uchun haq olinsinmi?</label>
        </div>
        <div className="text-end">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => setState(!state)}
          >
            Bekor Qilish
          </button>
          <button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={() => onSubmit()}
          >
            {isLoading ? "Yuklanmoqda" : "Qo'shish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTable;
