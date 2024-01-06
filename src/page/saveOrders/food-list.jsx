import React, { useEffect, useState } from "react";

const FoodList = ({ item }) => {
  const { allOrders } = item.savedOrder;
  const { musicOrder } = item.savedOrder;
  const foods = allOrders?.map((item) => item.foodName);
  const uniqueArray = Array.from(
    new Set(allOrders?.map((item) => item.foodName))
  );

  return (
    <ul className="food-menu">
      {allOrders &&
        uniqueArray.map((item) => (
          <li className="food-list">
            <span>{foods.filter((c) => c == item).length}</span>
            {item}
          </li>
        ))}
      {musicOrder &&
        musicOrder.musics.map((music) => (
          <li className="food-list">{music.musicName}.mp3</li>
        ))}
    </ul>
  );
};

export default FoodList;
