import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch existing plant data from the server on component mount
  useEffect(() => {
    fetch("http://localhost:5000/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  function onSubmitPlant(newPlant) {
    // Send a POST request to add the new plant to the server
    fetch("http://localhost:5000/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((savedPlant) => {
        // Update the plants state with the newly added plant
        setPlants((prevPlants) => [...prevPlants, savedPlant]);
      })
      .catch((error) => console.error("Error adding plant:", error));
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  // Filter plants based on search input
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onSubmitPlant={onSubmitPlant} />
      <Search search={search} handleSearch={handleSearch} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
