function WeatherCast({ hour, localTime }) {
  return (
    <>
      <div className="flex flex-col items-center min-w-18 min-h-32">
        <p>{localTime}</p>
        <img className="w-16" src={hour.condition.icon} alt="" />
        <p>{hour.temp_c ? hour.temp_c : hour.avgtemp_c}°</p>
      </div>
    </>
  );
}
export default WeatherCast;
