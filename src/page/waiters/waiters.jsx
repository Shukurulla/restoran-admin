import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { changePage } from "../../redux/slice/ui";
import WaiterService from "../../service/waiter";
import { getWaitersSuccess } from "../../redux/slice/waiter";
import "./waiters.scss";

const Waiters = () => {
  const dispatch = useDispatch();
  const { waiters, isLoading } = useSelector((state) => state.waiter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWaiter, setEditingWaiter] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "+998",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(changePage("Ofitsiyantlar"));
    WaiterService.getWaiters(dispatch);
  }, [dispatch]);

  const formatPhoneInput = (value) => {
    // Faqat raqamlarni qoldirish
    const numbers = value.replace(/\D/g, "");

    // 998 dan boshlanmagan bo'lsa, 998 qo'shish
    if (!numbers.startsWith("998")) {
      return "+998";
    }

    // +998 XX XXX XX XX formatida
    let formatted = "+998";
    if (numbers.length > 3) {
      formatted += " " + numbers.substring(3, 5);
    }
    if (numbers.length > 5) {
      formatted += " " + numbers.substring(5, 8);
    }
    if (numbers.length > 8) {
      formatted += " " + numbers.substring(8, 10);
    }
    if (numbers.length > 10) {
      formatted += " " + numbers.substring(10, 12);
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formatted = formatPhoneInput(value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Telefon raqamdan formatni olib tashlash
      const phoneNumbers = formData.phone.replace(/\D/g, "");
      const cleanPhone = "+" + phoneNumbers;

      const waiterData = {
        ...formData,
        phone: cleanPhone,
      };

      let response;
      if (editingWaiter) {
        response = await WaiterService.updateWaiter(editingWaiter._id, waiterData);
      } else {
        response = await WaiterService.postWaiter(waiterData);
      }

      dispatch(getWaitersSuccess(response.data.data));
      handleCloseModal();
    } catch (error) {
      console.error("Xatolik:", error);
      alert(error.response?.data?.error || "Xatolik yuz berdi!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ofitsiyantni o'chirmoqchimisiz?")) return;

    try {
      const response = await WaiterService.deleteWaiter(id);
      dispatch(getWaitersSuccess(response.data.data));
    } catch (error) {
      console.error("Xatolik:", error);
      alert("O'chirishda xatolik yuz berdi!");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await WaiterService.toggleStatus(id);
      dispatch(getWaitersSuccess(response.data.data));
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Status o'zgartirishda xatolik!");
    }
  };

  const handleEdit = (waiter) => {
    setEditingWaiter(waiter);

    // Telefon raqamni formatda ko'rsatish
    const formatted = formatPhoneInput(waiter.phone);

    setFormData({
      firstName: waiter.firstName,
      lastName: waiter.lastName,
      phone: formatted,
      password: waiter.password,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWaiter(null);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "+998",
      password: "",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="waiters-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="waiters-header" variants={headerVariants}>
        <h2>Ofitsiyantlar</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="bi bi-plus-circle"></i> Yangi Ofitsiyant
        </button>
      </motion.div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yuklanmoqda...</span>
          </div>
        </div>
      ) : (
        <motion.div className="waiters-grid" variants={containerVariants}>
          {waiters.map((waiter) => (
            <motion.div
              key={waiter._id}
              className="waiter-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="waiter-avatar">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="waiter-info">
                <h3>
                  {waiter.firstName} {waiter.lastName}
                </h3>
                <p className="phone">
                  <i className="bi bi-telephone"></i> {waiter.phone}
                </p>
                <p className="password">
                  <i className="bi bi-key"></i> Parol: {waiter.password}
                </p>
                <span className={`status-badge ${waiter.isActive ? 'active' : 'inactive'}`}>
                  {waiter.isActive ? 'Faol' : 'Faol emas'}
                </span>
              </div>
              <div className="waiter-actions">
                <button
                  className="btn-action edit"
                  onClick={() => handleEdit(waiter)}
                  title="Tahrirlash"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className={`btn-action toggle ${waiter.isActive ? 'active' : 'inactive'}`}
                  onClick={() => handleToggleStatus(waiter._id)}
                  title={waiter.isActive ? "Faolsizlantirish" : "Faollashtirish"}
                >
                  <i className={`bi ${waiter.isActive ? 'bi-toggle-on' : 'bi-toggle-off'}`}></i>
                </button>
                <button
                  className="btn-action delete"
                  onClick={() => handleDelete(waiter._id)}
                  title="O'chirish"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </motion.div>
          ))}

          {waiters.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <i className="bi bi-person-x"></i>
              <p>Hozircha ofitsiyantlar yo'q</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-box"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="form-box waiter-modal"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
            <div className="report-header">
              <h4>{editingWaiter ? "Ofitsiyantni tahrirlash" : "Yangi Ofitsiyant"}</h4>
              <i className="bi bi-x-lg" onClick={handleCloseModal}></i>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Ism</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ism"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Familiya</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Familiya"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Telefon raqam</label>
                <input
                  type="text"
                  className="form-input phone-input"
                  placeholder="+998 XX XXX XX XX"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={17}
                  required
                />
                <small className="form-hint">
                  Format: +998 XX XXX XX XX
                </small>
              </div>

              <div className="form-group">
                <label>Parol</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Parol"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <small className="form-hint">
                  Admin parolni ko'ra oladi
                </small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCloseModal}
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting
                    ? "Yuklanmoqda..."
                    : editingWaiter
                    ? "Saqlash"
                    : "Qo'shish"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Waiters;
