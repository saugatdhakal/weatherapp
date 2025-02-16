function CityFormContainer({ city, setCity,handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mt-4 gap-3">
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            value={city}
            className="bg-white rounded-lg"
            placeholder="Enter city name"
          />
          <button
            type="submit"
            className="bg-white text-orange-500 hover:bg-transparent hover:border-1 hover:text-white
             cursor-pointer p-1 rounded-lg  font-bold"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
export default CityFormContainer;
