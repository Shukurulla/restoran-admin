import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../../components/info-card/info-card";
import { changePage } from "../../redux/slice/ui";

const Dashboard = () => {
  const { foods } = useSelector((state) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage("Dashboard"));
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <InfoCard
              infoTitle={"Jami Taomlar"}
              icon="bi-border-all"
              infoNumber={foods.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
