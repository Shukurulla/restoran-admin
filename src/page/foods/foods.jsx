import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFoodsStart, getFoodsSuccess } from "../../redux/slice/foods";
import { changePage } from "../../redux/slice/ui";
import FoodService from "../../service/foodSerive";

const Foods = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");
  const { foods } = useSelector((state) => state.food);
  const { data } = useSelector((state) => state.category);

  const onCategoryMenu =
    category === "all" ? foods : foods.filter((c) => c.category === category);

  useEffect(() => {
    dispatch(changePage("Taomlar"));
  }, []);

  const handleDelete = async (id) => {
    dispatch(getFoodsStart());
    try {
      const { data } = await FoodService.deleteFood(id);
      dispatch(getFoodsSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="food-header pb-3 d-flex justify-content-between">
        <select
          className="food-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Hammasi</option>
          {data.map((item) => (
            <option value={item.title}>{item.title}</option>
          ))}
        </select>
        <Link to={"/restoran/add-food"} className="btn btn-primary">
          Taom Qoshish
        </Link>
      </div>
      <div className="row scroll-bar ">
        {onCategoryMenu.map((item) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-2" key={item._id}>
            <div
              className="card shadow-sm p-1 text-light"
              style={{ backgroundColor: "#374164" }}
            >
              <div className="card-image" style={{ height: "200px" }}>
                <img src={item.image} className="w-100 rounded h-100" alt="" />
              </div>
              <div className="card-body">
                <p className="card-text">{item.foodName}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      to={`/restoran/edit-food/${item._id}`}
                    >
                      Edit
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
