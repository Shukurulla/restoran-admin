import React, { useEffect } from "react";
import { navItems } from "../../constants";
import { Link } from "react-router-dom";
import "./side-bar.scss";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { activePage } = useSelector((state) => state.ui);
  const { orders } = useSelector((state) => state.order);
  const { calls } = useSelector((state) => state.call);
  const { karaoke } = useSelector((state) => state.karaoke);
  const newOrders = calls.length + karaoke.length + orders.length;
  let notification = false;

  document.title = newOrders > 0 ? `(${newOrders}) Restoran` : "Restoran";

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
                <div className="title">
                  <i className={`bi ${item.icon}`}></i>{" "}
                  <span>{item.title} </span>
                </div>
                <div className="div">
                  {item.title === "Yangi Buyurtmalar" ? (
                    newOrders > 0 ? (
                      <span className="message">
                        {calls.length + karaoke.length + orders.length}
                      </span>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
