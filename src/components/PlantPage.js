import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch initial plant data
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  function onSubmitPlant(newPlant) {
    // Add new plant to server
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((savedPlant) => setPlants((prevPlants) => [...prevPlants, savedPlant]))
      .catch((error) => console.error("Error adding plant:", error));
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function toggleSoldOut(id) {
    // Toggle "sold out" status for a plant
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  }

  // Filter plants by search term
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onSubmitPlant={onSubmitPlant} />
      <Search search={search} handleSearch={handleSearch} />
      <PlantList plants={plantsToDisplay} onToggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default PlantPage;
