import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const LocationSearch = ({ setLoading, fetchData, currentLocation }) => {
  const [searchLocation, setSearchLocation] = useState("");

  const handleInputChange = (e) => setSearchLocation(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    // You can add validation for searchLocation here if needed
    setLoading(true);
    fetchData(searchLocation);
  };

  return (
    <div>
      {/* <p className="font-medium mb-2">Enter a city name</p> */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchLocation}
          placeholder={`${currentLocation}`}
          onChange={handleInputChange}
          className="w-11/12 2xl:w-5/6 py-2 px-6 align-middle bg-transparent_black rounded-l-full"
        />
        <button
          type="submit"
          className="w-1/12 2xl:w-1/6 bg-primary h-10 py-2 align-middle bg-transparent_black rounded-r-full"
        >
          <FaSearch className="mx-auto" />
        </button>
      </form>
    </div>
  );
};

export default LocationSearch;
