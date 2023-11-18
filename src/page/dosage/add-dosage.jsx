import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDosageStart, getDosageSuccess } from "../../redux/slice/dosage";
import DosageService from "../../service/dosage";

const AddDosage = ({ setState, state }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch(getDosageStart());
    try {
      const { data } = await DosageService.postDosage({ title });
      dispatch(getDosageSuccess(data));
      setState(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-box">
      <div className="form-box">
        <h4>Miqdor Qo'shish</h4>
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
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDosage;
