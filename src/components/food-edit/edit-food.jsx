import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addIcon from "../../../public/AddIcon.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodsStart, getFoodsSuccess } from "../../redux/slice/foods";
import FoodService from "../../service/foodSerive";
import { changePage } from "../../redux/slice/ui";
import { getImageUrl } from "../../utils/imageHelper";

const EditFood = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useSelector((state) => state.category);
  const { foods, isLoading } = useSelector((state) => state.food);
  const oneFood = foods.filter((c) => c._id === id)[0];

  const [file, setFile] = useState(oneFood?.image);
  const [category, setCategory] = useState(oneFood?.category);
  const [dosage, setDosage] = useState(oneFood?.dosage);
  const [foodName, setFoodName] = useState(oneFood?.foodName);
  const [body, setBody] = useState(oneFood?.body);
  const [price, setPrice] = useState(oneFood?.price);
  const [isEdit, setIsEdit] = useState(false);
  const [labelImage, setLabelImage] = useState("");

  const formData = new FormData();

  useEffect(() => {
    setIsEdit(true);
  }, [file, category, dosage, foodName, body, price]);

  formData.append("image", file);
  formData.append("foodName", foodName);
  formData.append("price", price);
  formData.append("dosage", dosage);
  formData.append("category", category);
  formData.append("body", body);
  formData.append("isEdit", isEdit);

  const handleEdit = async (e) => {
    e.preventDefault();
    dispatch(getFoodsStart());
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "restoran-order");
    formData.append("cloud_name", "djsdapm3z");

    await fetch("https://api.cloudinary.com/v1_1/djsdapm3z/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        const food = await FoodService.editFood(id, {
          image: data.secure_url,
          foodName,
          dosage,
          category,
          body,
          price,
        });
        dispatch(getFoodsSuccess(food.data));
        navigate("/restoran/foods");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setLabelImage(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(changePage("Taomlar"));
  }, []);

  return (
    <form className="row" onSubmit={(e) => handleEdit(e)}>
      <h3 className="py-2">Taom O'zgartirish</h3>
      <div className="col-lg-6 col-md-12">
        <div className="file">
          <label htmlFor="file" className="form-image">
            <img src={labelImage.length == 0 ? getImageUrl(file) : labelImage} alt="" />
          </label>
          <div className="filebase">
            <input type="file" onChange={(e) => changeFile(e)} />
          </div>
        </div>
        <select
          class="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {data.map((item) => (
            <option value={item.title}>{item.title}</option>
          ))}
        </select>
        <select
          class="form-select"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        >
          <option value={"dona"}>Dona</option>
          <option value={"kg"}>Kg</option>
          <option value={"idish"}>Idish</option>
        </select>
      </div>
      <div className="col-lg-6 col-md-12">
        <input
          type="text"
          className="form-input"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Taom Nomi..."
        />
        <textarea
          type="text"
          className="form-input"
          placeholder="Taom Haqida..."
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input
          type="number"
          className="form-input"
          placeholder="Taom narxi"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="col-lg-12 col-md-12 text-center">
        <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Yuklanmoqda" : "Taom O'zgartirish"}
        </button>
      </div>
    </form>
  );
};

export default EditFood;
