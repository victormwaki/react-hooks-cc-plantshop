import React from "react";

function PlantCard({ name, image, price }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price.toFixed(2)}</p>
      <button className="primary">In Stock</button>
    </li>
  );
}

export default PlantCard;
