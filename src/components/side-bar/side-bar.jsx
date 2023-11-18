import React from "react";
import { navItems } from "../../constants";
import { Link } from "react-router-dom";
import "./side-bar.scss";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { activePage } = useSelector((state) => state.ui);

  return (
    <div className="sideBar">
      <div className="sideBar__menu">
        <div className="sideBar__manu-main">
          {navItems.map((item) => (
            <div
              className={`sideBar__menu-main__items ${
                activePage == item.title && "active"
              }`}
              key={item.title}
            >
              <Link to={item.link}>
                <i className={`bi ${item.icon}`}></i> <span>{item.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
