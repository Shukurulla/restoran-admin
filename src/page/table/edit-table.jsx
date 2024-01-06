import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../../redux/slice/table";
import TableService from "../../service/table";

const EditTable = ({ setState, state, id }) => {
  const { tables } = useSelector((state) => state.table);
  const oneData = tables.filter((c) => c._id === id)[0];

  const [title, setTitle] = useState(oneData.title);
  const [surcharge, setSurcharge] = useState(oneData.surcharge);
  const [forDJ, setForDJ] = useState(oneData.forDJ);
  const [tableNumber, setTableNumber] = useState(oneData.tableNumber);
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append("title", title);

  const editHandler = async () => {
    dispatch(getTableStart());
    try {
      const { data } = await TableService.editTable(id, {
        title,
        surcharge,
        forDJ,
        tableNumber,
      });
      dispatch(getTableSuccess(data));
      setState(!state);
    } catch (error) {
      console.log(error);
      dispatch(getTableFailure());
    }
  };

  useEffect(() => {
    console.log(forDJ);
  }, [forDJ]);

  return (
    <div className="modal-box">
      <div className="form-box">
        <h4>Stol Nomini O'zgartirish</h4>
        <input
          type="text"
          className="form-input"
          placeholder="Stol nomini kiriting..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="Number"
          className="form-input"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Bandlik uchun ustama"
        />
        <input
          type="Number"
          className="form-input"
          value={surcharge}
          onChange={(e) => setSurcharge(e.target.value)}
          placeholder="Bandlik uchun ustama"
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
          <button className="btn btn-primary" onClick={() => editHandler()}>
            O'zgartirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTable;
