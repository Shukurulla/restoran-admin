import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/slice/category";
import CategoryService from "../../service/category";

const EditCategory = ({ setState, state, id }) => {
  const { data } = useSelector((state) => state.category);
  const oneData = data.filter((c) => c._id === id)[0];
  const [title, setTitle] = useState(oneData.title);
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append("title", title);

  const editHandler = async () => {
    dispatch(getCategoryStart());
    try {
      const { data } = await CategoryService.editCategory(id, { title });
      dispatch(getCategorySuccess(data));
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h4>Kategoriya O'zgartirish</h4>
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
          <button className="btn btn-primary" onClick={() => editHandler()}>
            O'zgartirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
