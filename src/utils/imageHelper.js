// Rasm URL ni to'g'rilash
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // Agar rasm /images bilan boshlansa, base URL qo'shamiz
  if (imagePath.startsWith("/images")) {
    return `https://api.kepket.uz${imagePath}`;
  }

  // Agar rasm to'liq URL bo'lsa, o'zini qaytaramiz
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Boshqa hollarda base URL qo'shamiz
  return `https://api.kepket.uz${imagePath}`;
};
