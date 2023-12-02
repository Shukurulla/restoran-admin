import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import {
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/slice/category";
import { changePage } from "../../redux/slice/ui";
import CategoryService from "../../service/category";
import AddCategory from "./add-category";
import EditCategory from "./edit-category";

const Category = () => {
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [id, setId] = useState(0);
  const { data } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage("Kategoriya"));
  }, []);

  const onEdit = (id) => {
    setEditShow(!editShow);
    setId(id);
  };

  const onDelete = async (id) => {
    dispatch(getCategoryStart());
    try {
      const { data } = await CategoryService.deleteCategory(id);
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scroll-bar">
      {addShow && <AddCategory setState={setAddShow} state={addShow} />}
      {editShow && (
        <EditCategory setState={setEditShow} state={editShow} id={id} />
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
            <th scope="col">Taom turi</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
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

export default Category;
