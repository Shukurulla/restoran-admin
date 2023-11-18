import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDosageFailure,
  getDosageStart,
  getDosageSuccess,
} from "../../redux/slice/dosage";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../../redux/slice/table";
import DosageService from "../../service/dosage";
import TableService from "../../service/table";

const EditTable = ({ setState, state, id }) => {
  const { tables } = useSelector((state) => state.table);
  const oneData = tables.filter((c) => c._id === id)[0];

  const [title, setTitle] = useState(oneData.title);
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append("title", title);

  const editHandler = async () => {
    dispatch(getTableStart());
    try {
      const { data } = await TableService.editTable(id, { title });
      dispatch(getTableSuccess(data));
      setState(!state);
    } catch (error) {
      console.log(error);
      dispatch(getTableFailure());
    }
  };

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
