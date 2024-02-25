import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDroplet,
    faWind,
    faEyeLowVision,
    faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
function Dayly({ now }) {
    return (
        <div className="w-full my-4 border-b-2 border-gray-200 border-dashed ">
            {/* // header  */}
            <div className="flex justify-around font-bold mb-5 text-center">
                {/* dayly check  */}
                <div className="font-quick w-1/3 mx-3">
                    <h3 className="text-2xl  font-black my-2  ">
                        {now.location.toUpperCase()}
                    </h3>
                    <div className="bg-color-5382B7 p-5  rounded-xl text-white">
                        <h2 className="text-4xl text-center">
                            {Math.floor(now.temp_c)} °C
                        </h2>
                        <img
                            className="mx-auto my-2"
                            src={now.condition.icon}
                            alt="#"
                        />
                        <h2>{now.condition.text}</h2>
                        <h2 className="text-3xl text-center">
                            {now.time.weekDay},{now.time.hour}
                        </h2>
                    </div>
                </div>
                {/* air_quality  */}
                <div className="font-quick w-2/3 mx-3  ">
                    <h3 className="text-2xl  font-black my-2 ">AIR QUALITY</h3>
                    <div className="bg-img rounded-xl  p-3 text-white">
                        <h2 className="text-3xl">
                            AQI: {now.air_quality.index}
                        </h2>
                        <h3 className="text-3xl">{now.air_quality.text}</h3>
                        <div className="py-16"></div>
                    </div>
                </div>
            </div>

            {/* bottom  */}
            <div className="flex justify-around">
                <div className="text-xl font-normal m-2">
                    <h2 className="text-xl font-bold my-2">HUMIDITY</h2>
                    <div className="flex">
                        <div>
                            <h3>{now.humidity} %</h3>
                        </div>
                        <div className="my-auto">
                            <FontAwesomeIcon
                                className="text-3xl mx-3"
                                icon={faDroplet}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-xl font-normal m-2">
                    <h2 className="text-xl font-bold my-2">VISIBILITY</h2>
                    <div className="flex">
                        <div>
                            <h3>{now.visibility} km/h</h3>
                        </div>
                        <div className="my-auto">
                            <FontAwesomeIcon
                                className="text-3xl mx-3"
                                icon={faEyeLowVision}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-xl font-normal m-2">
                    <h2 className="text-xl font-bold my-2"> WIND STATUS</h2>
                    <div className="flex">
                        <div>
                            <h3>{now.wind.wind_kph} km/h</h3>
                            <h3>
                                <FontAwesomeIcon icon={faSignsPost} />:{" "}
                                {now.wind.wind_dir}
                            </h3>
                        </div>
                        <div className="my-auto">
                            <FontAwesomeIcon
                                className="text-3xl mx-3"
                                icon={faWind}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dayly;
