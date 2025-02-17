import { faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function CityFormContainer({ setCity, handleSubmit }) {
  const [activeSearch, setActiveSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setActiveSearch([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${value}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format!");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setActiveSearch(data.slice(0, 8));
      } else {
        setActiveSearch([]);
      }
    } catch (error) {
      console.error("Error searching cities:", error);
      setActiveSearch([]);
    }
  };

  const getGpsLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format!");
      }

      const data = await response.json();
      if (data && data.city) {
        setCity(data.city);
        setSearchTerm(data.city);
        setActiveSearch([]);
      } else {
        throw new Error("No city found in response");
      }
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Unable to get your location. Please enter city manually.");
    }
  };

  const handleClick = (suggestion) => {
    setCity(suggestion.name);
    setSearchTerm(suggestion.name);
    setActiveSearch([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCity(searchTerm.trim());
      setActiveSearch([]);
    }
  };

  return (
    <div className="items-center flex justify-center gap-4">
      <form className="relative w-[500px]" onSubmit={onSubmit}>
        <div className="flex justify-center mt-4 gap-3 relative">
          <input
            onChange={handleSearch}
            value={searchTerm}
            type="text"
            className="bg-white rounded-full w-full p-3"
            placeholder="Enter city name"
          />
          <button
            type="submit"
            className="p-2 text-black right-3 top-1 absolute cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {activeSearch.length > 0 && (
          <div className="top-17 rounded-lg w-full absolute bg-white flex flex-col gap-2 p-4 mt-1 shadow-lg z-10">
            {activeSearch.map((suggestion) => (
              <span
                onClick={() => handleClick(suggestion)}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                key={suggestion.id}
              >
                {suggestion.name}, {suggestion.country}
              </span>
            ))}
          </div>
        )}
      </form>

      <button
        onClick={getGpsLocation}
        className="mt-4 text-xl cursor-pointer text-white hover:text-gray-200"
        title="Get location using IP"
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
    </div>
  );
}

export default CityFormContainer;
