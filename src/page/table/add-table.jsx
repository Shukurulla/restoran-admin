import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../../redux/slice/table";
import TableService from "../../service/table";

const AddTable = ({ setState, state }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch(getTableStart());
    try {
      const { data } = await TableService.postTable({ title });
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
        <div className="text-end">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => setState(!state)}
          >
            Bekor Qilish
          </button>
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTable;
