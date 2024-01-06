import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import { changePage } from "../../redux/slice/ui";
import AddTable from "./add-table";
import EditTable from "./edit-table";
import {
  getTableFailure,
  getTableStart,
  getTableSuccess,
} from "../../redux/slice/table";
import TableService from "../../service/table";

const Table = () => {
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [id, setId] = useState(0);
  const { tables } = useSelector((state) => state.table);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage("Stollar"));
  }, []);

  const onEdit = (id) => {
    setEditShow(!editShow);
    setId(id);
  };

  const onDelete = async (id) => {
    dispatch(getTableStart());
    try {
      const { data } = await TableService.deleteTable(id);
      dispatch(getTableSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getTableFailure());
    }
  };

  return (
    <div className="scroll-bar">
      {addShow && <AddTable setState={setAddShow} state={addShow} />}
      {editShow && (
        <EditTable setState={setEditShow} state={editShow} id={id} />
      )}
      <div className="category-header d-flex align-items-center justify-content-between">
        <div></div>
        <h3>Stollar ({tables.length})</h3>

        <button className="btn btn-primary" onClick={() => setAddShow(true)}>
          + Qoshish
        </button>
      </div>
      <table className="table table-striped bg-transparent ">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Menu Codi</th>
            <th scope="col">Hisob Codi</th>
            <th scope="col">Stol Nomi</th>
            <th scope="col">-</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((item, idx) => (
            <tr className="table-row">
              <td scope="row ">{idx + 1}</td>
              <td>
                <a
                  href={`http://api.qrserver.com/v1/create-qr-code/?data=${`https://test-restoran.netlify.app/menu/table/${item._id}`}&size=x&bgcolor=`}
                  target="_blank"
                >
                  <img
                    src={`http://api.qrserver.com/v1/create-qr-code/?data=${`https://test-restoran.netlify.app/menu/table/${item._id}`}&size=x&bgcolor=`}
                    alt=""
                    style={{ width: 60, height: 60 }}
                  />
                </a>
              </td>
              <td>
                <a
                  href={`http://api.qrserver.com/v1/create-qr-code/?data=${`https://test-restoran.netlify.app/check/table/${item._id}`}&size=x&bgcolor=`}
                  target="_blank"
                >
                  <img
                    src={`http://api.qrserver.com/v1/create-qr-code/?data=${`https://test-restoran.netlify.app/check/table/${item._id}`}&size=x&bgcolor=`}
                    alt=""
                    style={{ width: 60, height: 60 }}
                  />
                </a>
              </td>
              <td>{item.title}</td>
              <td>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(item._id)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => onEdit(item._id)}
                  >
                    edit
                  </button>
                </div>
              </td>
              <td>
                <a
                  href={`https://test-restoran.netlify.app/menu/table/${item._id}`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Saytga otish
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
