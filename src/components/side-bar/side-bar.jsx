import React from "react";
import { navItems } from "../../constants";
import { Link } from "react-router-dom";
import "./side-bar.scss";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { activePage } = useSelector((state) => state.ui);
  const { orders } = useSelector((state) => state.order);
  const { calls } = useSelector((state) => state.call);
  const newOrders = calls.length + orders.length;

  document.title = newOrders > 0 ? `(${newOrders}) Restoran` : "Restoran";

  return (
    <aside className="modern-sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`nav-item ${activePage === item.title ? "active" : ""}`}
          >
            <div className="nav-content">
              <div className="nav-left">
                <div className="nav-icon">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <span className="nav-title">{item.title}</span>
              </div>

              {item.title === "Yangi Buyurtmalar" && newOrders > 0 && (
                <div className="notification-badge">
                  <span>{newOrders}</span>
                </div>
              )}
            </div>

            {activePage === item.title && <div className="active-indicator"></div>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
