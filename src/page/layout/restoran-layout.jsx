import React, { useEffect } from "react";

import Header from "../../components/header/header";
import SideBar from "../../components/side-bar/side-bar";

const RestoranLayout = ({ activePage }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-12">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-9 col-sm-12">
          <Header />
          <div className="py-4 relative  px-3">
            <div className="container">{activePage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestoranLayout;
