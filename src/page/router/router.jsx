import React from "react";
import { Link } from "react-router-dom";
import "./router.scss";

const Router = () => {
  return (
    <div className="router-wrapper">
      <div className="router-box">
        <div className="title">Xush kelibsiz</div>
        <Link className="btn btn-primary" to={"/restoran/protect"}>
          Restoran Admini
        </Link>
        <Link className="btn btn-primary" to={"/dj-side/protect"}>
          DJ Admini{" "}
        </Link>
      </div>
    </div>
  );
};

export default Router;
