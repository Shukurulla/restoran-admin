import React, { useEffect, useRef, useState } from "react";
import addIcon from "../../../public/AddIcon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFoodsStart, getFoodsSuccess } from "../../redux/slice/foods";
import FoodService from "../../service/foodSerive";
import { changePage } from "../../redux/slice/ui";
import { getDosageStart, getDosageSuccess } from "../../redux/slice/dosage";
import DosageService from "../../service/dosage";
import axios from "axios";

const FormBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getDosage = async () => {
      dispatch(getDosageStart());
      try {
        const { data } = await DosageService.getDosage();
        dispatch(getDosageSuccess(data));
      } catch (err) {
        console.log(err);
      }
    };
    getDosage();
  }, []);

  const { data } = useSelector((state) => state.category);
  const dosage1 = useSelector((state) => state.dosage);
  const [file, setFile] = useState("");
  const [category, setCategory] = useState(data[0]?.title);
  const [dosage, setDosage] = useState(dosage1.dosage[0]?.title);
  const [foodName, setFoodName] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const [totalDosage, setTotalDosage] = useState("");
  const [labelImage, setLabelImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
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
        const food = await FoodService.postFoods({
          image: data.secure_url,
          foodName,
          dosage,
          category,
          body,
          totalDosage,
          price,
        });
        dispatch(getFoodsSuccess(food.data));
        navigate("/foods");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setLabelImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(changePage("Taomlar"));
  }, []);

  return (
    <form className="row" onSubmit={(e) => formSubmit(e)}>
      <h3 className="py-2">Taom Qo'shish</h3>
      <div className="col-lg-6 col-md-12">
        <div className="file">
          <label htmlFor="file" className="form-image">
            <img src={file ? labelImage : addIcon} alt="" />
          </label>
          <div className="filebase">
            <input type="file" name="file" onChange={(e) => changeFile(e)} />
          </div>
        </div>
        <select
          class="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        >
          {data.map((item) => (
            <option value={item.title}>{item.title}</option>
          ))}
        </select>
        <select
          class="form-select"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          name="dosage"
        >
          <option disabled>Miqdor tanlash</option>
          {dosage1.dosage.map((item) => (
            <option value={item.title}>{item.title}</option>
          ))}
        </select>
        <input
          type="number"
          className="form-input mt-2"
          value={totalDosage}
          onChange={(e) => setTotalDosage(e.target.value)}
          placeholder="Taom miqdori..."
          name="totalDosage"
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <input
          type="text"
          className="form-input"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Taom Nomi..."
          name="foodName"
        />
        <textarea
          type="text"
          className="form-input"
          placeholder="Taom Haqida..."
          rows={5}
          value={body}
          name="body"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input
          type="number"
          className="form-input"
          placeholder="Taom narxi"
          value={price}
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="col-lg-12 col-md-12 text-center">
        <button
          className="btn btn-primary"
          disabled={isDisabled}
          onClick={() => setIsDisabled(true)}
          type="submit"
        >
          {isDisabled ? "Yuklanmoqda" : "Taom Qoshish"}
        </button>
      </div>
    </form>
  );
};

export default FormBox;
