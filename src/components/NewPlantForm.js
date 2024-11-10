import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

function NewPlantForm({ onSubmitPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newItem = {
      id: uuid(), // Generates a unique ID
      ...formData
    };

    // Call the onSubmitPlant function passed down as a prop to add the plant
    onSubmitPlant(newItem);

    // Reset the form data after submission
    setFormData({
      name: "",
      image: "",
      price: ""
    });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          onChange={handleInputChange}
          value={formData.name} 
        />

        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          onChange={handleInputChange} 
          value={formData.image}
        />

        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          onChange={handleInputChange}
          value={formData.price} 
        />

        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
