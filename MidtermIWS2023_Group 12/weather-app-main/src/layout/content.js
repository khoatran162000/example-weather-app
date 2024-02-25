import { WeatherDataContext } from "../Context/WeatherData";
import { useContext } from "react";

import Search from "../component/Content/Search";
import Dayly from "../component/Content/Dayly";
import ContentRouter from "../component/Content/ContentRouter";

const Content = () => {
    // get today weather data at weatherdata[0]
    const WeatherData = useContext(WeatherDataContext);
    // const Dayly = WeatherData[0];
    return (
        <div
            className="w-full md:w-2/3 lg:w-2/3 xl:w-3/4 bg-color-E3F2FF  p-5 rounded-l-3xl font-quick"
            id="Content"
        >
            <div className="">
                <Search />
            </div>
            <div className="my-5 md:flex md:justify-between xl:flex xl:justify-between pad-12 ">
                <Dayly now={WeatherData.Now} />
            </div>
            <div className="w-full">
                {/* cut weatherdata array an put into component week , WeatherData.slice(1,8) */}
                <ContentRouter
                    hour={WeatherData.Now.hourly}
                    week={WeatherData.week}
                />
            </div>
        </div>
    );
};
export default Content;
