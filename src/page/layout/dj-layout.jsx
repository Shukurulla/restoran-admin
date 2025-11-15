import React from "react";
import { useNavigate } from "react-router-dom";
import "./dj-style.scss";

const DjLayout = ({ activePage }) => {
  const page = localStorage.getItem("pageName");
  const navigate = useNavigate();

  return (
    <div className="dj-side row">
      <div className="col-lg-3 m-0 p-0 col-md-4 col-sm-12">
        <div className="side-bar-dj p-3">
          <h3 className="px-2">DJ Admin</h3>
          <div className="navigate">
            <div
              onClick={() => {
                localStorage.setItem("pageName", "newMusic");
                navigate("/side-dj");
              }}
              className={`navigate-item ${page == "newMusic" ? "active" : ""}`}
            >
              <i className="bi bi-menu-up"></i>
              <span>Yangi Musiqalar</span>
            </div>
            <div
              onClick={() => {
                localStorage.setItem("pageName", "oldMusic");
                navigate("/old-music");
              }}
              className={`navigate-item ${page == "oldMusic" ? "active" : ""}`}
            >
              <i className="bi bi-menu-up"></i>
              <span>Tugatilgan Musiqalar</span>
            </div>
            <div
              onClick={() => {
                localStorage.setItem("pageName", "report");
                navigate("/dj-report");
              }}
              className={`navigate-item ${page == "report" ? "active" : ""}`}
            >
              <i className="bi bi-graph-up-arrow"></i>
              <span>Hisobotlar</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-9 m-0 p-0 col-md-8 col-sm-12">
        <div className="dj-header pt-3 pb-1 ">
          <h3>KepKet</h3>
        </div>
        <div className="">{activePage}</div>
      </div>
    </div>
  );
};

export default DjLayout;
