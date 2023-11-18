import React from "react";
import "./info-card.scss";

const InfoCard = ({ infoTitle, icon, infoNumber }) => {
  return (
    <div className="infoCard">
      <div className="infoCard__header">
        <span>{infoTitle}</span>
        <i className={`bi ${icon}`}></i>
      </div>
      <h3>{infoNumber}</h3>
    </div>
  );
};

export default InfoCard;
