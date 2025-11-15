import React, { useEffect, useRef, useState } from "react";
import addIcon from "../../../public/AddIcon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFoodsStart, getFoodsSuccess } from "../../redux/slice/foods";
import FoodService from "../../service/foodSerive";
import { changePage } from "../../redux/slice/ui";
import { getDosageStart, getDosageSuccess } from "../../redux/slice/dosage";
import DosageService from "../../service/dosage";
import api from "../../service/api";

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

    // Validatsiya
    if (!file) {
      alert("Iltimos, rasm tanlang!");
      return;
    }
    if (!foodName || !price || !totalDosage) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setIsDisabled(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("foodName", foodName);
      formData.append("dosage", dosage);
      formData.append("category", category);
      formData.append("body", body);
      formData.append("totalDosage", totalDosage);
      formData.append("price", price);

      const response = await api.post(
        "/foods-create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 soniya timeout
        }
      );

      if (response.data && response.data.data) {
        dispatch(getFoodsSuccess(response.data.data));
        navigate("/restoran/foods");
      }
    } catch (err) {
      console.error("Xatolik:", err);
      if (err.code === 'ECONNABORTED') {
        alert("So'rov juda uzoq davom etdi. Iltimos qaytadan urinib ko'ring!");
      } else {
        alert(err.response?.data?.message || "Taom qo'shishda xatolik yuz berdi!");
      }
      setIsDisabled(false);
    }
  };

  const changeFile = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Fayl hajmini tekshirish (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Rasm hajmi juda katta! Maksimal 5MB bo'lishi kerak.");
      e.target.value = "";
      return;
    }

    // Fayl turini tekshirish
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Faqat rasm fayllari qabul qilinadi (JPG, PNG, GIF, WEBP)!");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
    setLabelImage(URL.createObjectURL(selectedFile));
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
          type="submit"
          style={{ minWidth: '200px' }}
        >
          {isDisabled ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Yuklanmoqda...
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>
              Taom Qo'shish
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default FormBox;
