import React from "react";

function PlantCard({ id, name, image, price, soldOut, onToggleSoldOut }) {
  return (
    <li className="card">
      {/* Display image */}
      <img src={image || "https://via.placeholder.com/400"} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      <button
        className={soldOut ? "" : "primary"}
        onClick={() => onToggleSoldOut(id)}
      >
        {soldOut ? "Sold Out" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
