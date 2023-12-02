import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import {
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/slice/category";
import {
  getDosageFailure,
  getDosageStart,
  getDosageSuccess,
} from "../../redux/slice/dosage";
import { changePage } from "../../redux/slice/ui";
import CategoryService from "../../service/category";
import DosageService from "../../service/dosage";
import AddDosage from "./add-dosage";
import EditDosage from "./edit-dosage";

const Dosage = () => {
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [id, setId] = useState(0);
  const { dosage } = useSelector((state) => state.dosage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage("Miqdor"));
  }, []);

  const onEdit = (id) => {
    setEditShow(!editShow);
    setId(id);
  };

  const onDelete = async (id) => {
    dispatch(getDosageStart());
    try {
      await DosageService.deleteDosage(id);
      const { data } = await DosageService.getDosage();
      dispatch(getDosageSuccess(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(getDosageFailure());
    }
  };

  return (
    <div className="scroll-bar">
      {addShow && <AddDosage setState={setAddShow} state={addShow} />}
      {editShow && (
        <EditDosage setState={setEditShow} state={editShow} id={id} />
      )}
      <div className="category-header d-flex align-items-center justify-content-between">
        <div></div>
        <h3>Kategoriyalar</h3>

        <button className="btn btn-primary" onClick={() => setAddShow(true)}>
          + Qoshish
        </button>
      </div>
      <table className="table table-striped bg-transparent ">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">O'lchov birligi</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          {dosage.map((item, idx) => (
            <tr className="table-row">
              <td scope="row ">{idx + 1}</td>
              <td>{item.title}</td>
              <td>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(item._id)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => onEdit(item._id)}
                  >
                    edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dosage;
