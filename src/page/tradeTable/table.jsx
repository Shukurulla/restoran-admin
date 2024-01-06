import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/slice/ui";
import CheckList from "./check-list";
import Table from "./trade-table";
import "./trade-table.scss";

const TradeTable = () => {
  const { saved } = useSelector((state) => state.saved);
  const [showCheck, setShowCheck] = useState(false);
  const [id, setId] = useState("");
  const { tables } = useSelector((state) => state.table);
  const savedId = saved.map((item) => item.tableId);
  const [uniqueArray, setUniqueArray] = useState(Array.from(new Set(savedId)));
  const [emptyMsg, setEmptMsg] = useState("Saqlangan buyurtmalar mavjud emas");

  const dispatch = useDispatch();

  const searchTable = (val) => {
    if (val == "") {
      setUniqueArray(Array.from(new Set(savedId)));
      setEmptMsg("Saqlangan buyurtmalar mavjud emas");
    } else {
      setUniqueArray(
        Array.from(
          new Set(
            saved
              .filter(
                (c) => c.tableNumber.toString().slice(0, val.length) == val
              )
              .map((item) => item.tableId)
          )
        )
      );
      setEmptMsg("Bu raqamdagi stoldan buyurtmalar topilmadi");
    }
  };

  useEffect(() => {
    dispatch(changePage("Saqlanganlar"));
  }, []);

  const showCheckHandler = (id) => {
    setId(id);
    setShowCheck(true);
  };

  return (
    <div className="trade-content ">
      {showCheck && <CheckList id={id} setState={setShowCheck} />}
      <div className="trade-header">
        <h2>Saqlangan Buyurtmalar</h2>
        <div className="search ">
          <input
            type="text"
            className="form-input"
            placeholder="stol raqamini kiriting"
            onChange={(e) => searchTable(e.target.value)}
          />
          <button className="btn btn-primary">Qirish</button>
        </div>
      </div>
      <div className="scroll-bar">
        {uniqueArray.length > 0 ? (
          uniqueArray.map((id) => (
            <Table id={id} showCheckHandler={showCheckHandler} />
          ))
        ) : (
          <div>{emptyMsg}</div>
        )}
      </div>
    </div>
  );
};

export default TradeTable;
