import { faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";

function CityFormContainer({ setCity, handleSubmit }) {
  const [activeSearch, setActiveSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1); // Reset selection when search term changes

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
      const data = await response.json();
      setActiveSearch(data.slice(0, 8));
    } catch (error) {
      console.error("Error searching cities:", error);
      setActiveSearch([]);
    }
  };

  const handleKeyDown = (e) => {
    if (!activeSearch.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < activeSearch.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleClick(activeSearch[selectedIndex]);
        }
        break;
      case "Escape":
        setActiveSearch([]);
        setSelectedIndex(-1);
        break;
    }
  };

  // Effect to handle scrolling
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      // Get the currently selected suggestion element
      const selectedElement = suggestionsRef.current.children[selectedIndex];
      console.log(suggestionsRef.current);

      if (selectedElement) {
        // Scroll the selected element into view
        selectedElement.scrollIntoView({
          block: "nearest", // Scroll just enough to bring element into view
          behavior: "smooth", // Smooth scrolling animation
        });
      }
    }
  }, [selectedIndex]); // Re-run when selectedIndex changes

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
    setSelectedIndex(-1);
    const event = new Event("submit");
    event.preventDefault = () => {};
    handleSubmit(event);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCity(searchTerm.trim());
      setActiveSearch([]);
    } else {
      // Focus the input field if empty
      document.querySelector(".search-input").focus();
    }
  };

  return (
    <div className="items-center flex justify-center gap-4">
      <form className="relative w-[500px]" onSubmit={onSubmit}>
        <div className="flex justify-center mt-4 gap-3 relative">
          <input
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            value={searchTerm}
            type="text"
            className="bg-white rounded-full w-full p-3 search-input"
            placeholder="Enter city name"
            role="combobox"
            aria-expanded={activeSearch.length > 0}
            aria-controls="search-suggestions"
            aria-activedescendant={
              selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
            }
          />
          <button
            type="submit"
            className="p-2 text-black right-3 top-1 absolute cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {activeSearch.length > 0 && (
          <div
            ref={suggestionsRef}
            id="search-suggestions"
            role="listbox"
            className="top-17 rounded-lg w-full absolute
             bg-white flex flex-col gap-2 p-4 
             mt-1 shadow-2xl z-10 max-h-[300px] 
             overflow-y-auto"
          >
            {activeSearch.map((suggestion, index) => (
              <span
                role="option"
                aria-selected={index === selectedIndex}
                id={`suggestion-${index}`}
                onClick={() => handleClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`cursor-pointer p-2 rounded-md ${
                  index === selectedIndex ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                key={suggestion.id}
                tabIndex={-1}
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
