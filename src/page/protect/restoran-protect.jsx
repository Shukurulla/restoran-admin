import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./protect.scss";

const RestoranProtect = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isMistake, setMistake] = useState(false);
  const [showVal, setShowVal] = useState(false);

  if (localStorage.getItem("admin") == "restoran") {
    navigate("/restoran/orders");
  }

  const onScan = () => {
    if (login == "karavan_admin" && password == "admin_karavan") {
      localStorage.setItem("admin", "restoran");
      navigate("/restoran/orders");
    } else {
      setMistake(true);
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className="protect-wrapper">
      <div className="protect-form">
        <h4>Restoran Tizimiga kirish uchun malumotlarni kiriting</h4>
        {isMistake ? (
          <p className="text-danger">Login yoki password hato</p>
        ) : (
          ""
        )}
        <input
          type="text"
          className="form-input"
          placeholder="Loginni kiriting..."
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <div className="form-input">
          <input
            type={showVal ? "text" : "password"}
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwordni kiriting..."
          />
          <i
            className={`bi ${showVal ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setShowVal(!showVal)}
          ></i>
        </div>
        <button
          className="btn btn-outline-primary "
          onClick={() => navigate("/")}
        >
          Orqaga
        </button>
        <button className="btn btn-primary mx-2" onClick={() => onScan()}>
          Yuborish
        </button>
      </div>
    </div>
  );
};

export default RestoranProtect;
