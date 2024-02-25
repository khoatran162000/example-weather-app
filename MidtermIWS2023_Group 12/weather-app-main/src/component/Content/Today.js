function Today({ hourly }) {
    return (
        <div className="flex mx-2 bg-white rounded-2xl overflow-x-auto py-2 text-xl my-4">
            {hourly.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="p-2 mx-3 text-center font-bold "
                    >
                        <h3>{item.time.slice(0, 3)}</h3>
                        <img className="" src={item.condition.icon} alt="#" />
                        <h3 className="">{Math.floor(item.temp_c)}°C</h3>
                    </div>
                );
            })}
        </div>
    );
}
export default Today;
