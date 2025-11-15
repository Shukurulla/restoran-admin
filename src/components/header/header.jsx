import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./header.scss";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { activePage } = useSelector((state) => state.ui);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <header className="modern-header">
      <div className="header-left">
        <div className="logo-container">
          <div className="logo-icon">
            <i className="bi bi-cup-hot-fill"></i>
          </div>
          <div className="logo-text">
            <h2>KepKet</h2>
            <span className="tagline">Restoran Boshqaruv Tizimi</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="page-indicator">
          <i className="bi bi-chevron-right"></i>
          <span>{activePage}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="datetime-widget">
          <div className="time-display">
            <i className="bi bi-clock"></i>
            <span className="time">{formatTime(currentTime)}</span>
          </div>
          <div className="date-display">
            <i className="bi bi-calendar3"></i>
            <span className="date">{formatDate(currentTime)}</span>
          </div>
        </div>

        <div className="user-profile">
          <div className="avatar">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
