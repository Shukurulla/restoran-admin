import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServicesStart,
  getServiceSuccess,
} from "../../redux/slice/service-slice";
import { changePage } from "../../redux/slice/ui";
import ServiceApi from "../../service/service";
import "./service.scss";

const Service = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const [showEdit, setShowEdit] = useState(true);
  const [persent, setPersent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(changePage("Hizmatlar"));
  });

  const editService = async (id, item) => {
    dispatch(getServicesStart());
    const service = {
      title,
      persent,
    };
    try {
      const { data } = await ServiceApi.editService(id, service);
      dispatch(getServiceSuccess(data));
      setShowEdit(!showEdit);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="service-header">
        <h2>Xizmatlar</h2>
      </div>
      {services.map((item) => (
        <div className="service-box">
          {showEdit ? (
            <h4>{item.title}</h4>
          ) : (
            <input
              type={"text"}
              className="edit-title"
              defaultValue={item.title}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          )}
          <div className="service-config">
            {showEdit ? (
              <div className="show-box">
                <p>{item.persent} %</p>
                <i
                  className="bi bi-pencil text-success"
                  onClick={() => setShowEdit(false)}
                ></i>
              </div>
            ) : (
              <div className="config-box">
                <input
                  type="number"
                  onChange={(e) => setPersent(e.target.value)}
                  defaultValue={item.persent}
                />
                <i className="bi bi-x-lg" onClick={() => setShowEdit(true)}></i>
                <i
                  className="bi bi-check-lg"
                  onClick={() => editService(item._id, item)}
                ></i>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
