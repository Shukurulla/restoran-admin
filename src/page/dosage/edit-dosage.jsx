import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/slice/category";
import {
  getDosageFailure,
  getDosageStart,
  getDosageSuccess,
} from "../../redux/slice/dosage";
import CategoryService from "../../service/category";
import DosageService from "../../service/dosage";

const EditDosage = ({ setState, state, id }) => {
  const { dosage } = useSelector((state) => state.dosage);
  const oneData = dosage.filter((c) => c._id === id)[0];

  const [title, setTitle] = useState(oneData.title);
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append("title", title);

  const editHandler = async () => {
    dispatch(getDosageStart());
    try {
      const { data } = await DosageService.editDosage(id, { title });
      dispatch(getDosageSuccess(data));
      setState(!state);
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure());
    }
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h4>Miqdor O'zgartirish</h4>
        <input
          type="text"
          className="form-input"
          placeholder="Miqdor kiriting..."
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

export default EditDosage;
