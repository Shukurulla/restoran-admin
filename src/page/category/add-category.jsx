import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/slice/category";
import CategoryService from "../../service/category";

const AddCategory = ({ setState, state }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.category);

  const onSubmit = async () => {
    dispatch(getCategoryStart());
    try {
      const { data } = await CategoryService.postCategory({ title });
      dispatch(getCategorySuccess(data));
      setState(false);
    } catch (error) {
      console.log(data);
    }
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h4>Kategoriya Qo'shish</h4>
        <input
          type="text"
          className="form-input"
          placeholder="Kategoriyani kiriting..."
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

export default AddCategory;
