import React, { useRef, useState } from "react";
import "./menu.scss";
import { useToImage } from "@hcorta/react-to-image";
import { useToSvg } from "@hugocxl/react-to-image";

const MenuUi = ({ item, setState }) => {
  const { ref, isLoading, getSvg } = useToImage();


  return (
    <div className="menu-content">
      <div className="w-100 ">
        <div className="menu-control text-end">
          <button className="btn btn-light" onClick={() => getSvg()}>
            Yuklash
          </button>
          <button
            className="btn btn-primary mx-3"
            onClick={() => setState(false)}
          >
            Bekor Qilish
          </button>
        </div>
        <div
          className="menu-ui "
          style={{ backgroundColor: "#222b304b", backdropFilter: "10px" }}
          id="menu-ui"
          ref={ref}
        >
          <div className="menu-brand">
            <div className="logo">
              <h3>{item.tableNumber}</h3>
            </div>
            <div className="menu-info">
              <h4>Restoran menusi shu yerda!!!</h4>
              <h5>QR Code ni skanerlang va browserda oching</h5>

              <div className="info-items">
                <span>1</span>
                <p>Taom buyurtma berish uchun skanerlang</p>
              </div>
              <div className="info-items">
                <span>2</span>
                <p>Ofitsiyantni chaqirish uchun skanerlang</p>
              </div>
              <div className="info-items">
                <span>3</span>
                <p>Hisobni ko'rish uchun skanerlang</p>
              </div>
            </div>
          </div>
          <div className="qr-box">
            <div className="scan">
              <img
                src={`http://api.qrserver.com/v1/create-qr-code/?data=https://test-restoran.netlify.app/menu/table/${item._id}&size=x&bgcolor=`}
                alt=""
              />
              <p>Menu uchun</p>
            </div>
            <div className="scan">
              <img
                src={`http://api.qrserver.com/v1/create-qr-code/?data=https://test-restoran.netlify.app/check/table/${item._id}&size=x&bgcolor=`}
                alt=""
              />
              <p>Hisob uchun</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUi;
