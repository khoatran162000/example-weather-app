function Week({ week }) {
    // get data at weatherdata[0-7]
    return (
        <div className="flex justify-between text-center my-2 ">
            {week.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="md:p-1 lg:p-2 xl:p-4 bg-white rounded-xl border-2"
                    >
                        <h2 className="font-bold">{item.date}</h2>
                        <img src={item.condition.icon} alt="#" />
                        <h2 className="text-red-600 font-medium">
                            {item.temp.temp_max}°C
                        </h2>
                        <h2 className="text-blue-600 font-medium">
                            {item.temp.temp_min}°C
                        </h2>
                    </div>
                );
            })}
        </div>
    );
}
export default Week;
