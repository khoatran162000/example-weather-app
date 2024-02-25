import { useContext } from "react";
import { WeatherDataContext } from "../Context/WeatherData";

function SideBar() {
    const WeatherData = useContext(WeatherDataContext);
    const data = WeatherData.Now.suntype;
    const now = WeatherData.Now;
    return (
        <div className="rounded-r-3xl w-full lg:w-1/3 xl:w-1/4 bg-color-#CAE1F6 p-5 px-5 font-quick">
            <div className="flex justify-between mb-8">
                <img src="https://res.cloudinary.com/dwohqjquz/image/upload/v1679024562/Logo_aybubg.png" />
            </div>

            {/* uv  */}
            <div className="mb-5 ">
                <h2 className=" bg-color-5382B7 text-white font-black text-2xl rounded-2xl my-2  p-1 text-center">
                    UV INDEX
                </h2>
                <div className="flex justify-between pr-8">
                    <h2 className="inline-block my-auto text-2xl font-medium">
                        Now {now.uv}/10
                    </h2>
                    <img
                        className="w-1/3"
                        src="https://res.cloudinary.com/dwohqjquz/image/upload/v1678899401/UV2_ees1iv.png"
                        alt="#"
                    />
                </div>
            </div>
            {/* Pressure  */}
            <div className="mb-5 ">
                <h2 className="bg-color-5382B7 text-white font-black text-2xl rounded-2xl my-2  p-1 text-center">
                    PRESSURE
                </h2>
                <div className="flex justify-between pr-2">
                    <h2 className="inline-block my-auto text-2xl font-medium">
                        {" "}
                        {now.pressure} mb
                    </h2>
                    <img
                        className="w-1/4 mr-5"
                        src="https://res.cloudinary.com/dwohqjquz/image/upload/v1678899400/apsuat2_ldutdz.png"
                        alt="#"
                    />
                </div>
            </div>
            {/* Sun  */}
            <div className="mb-5 ">
                <h2 className="bg-color-5382B7 text-white font-black text-2xl rounded-2xl my-2  p-1 text-center">
                    SUNRISE & SUNSET
                </h2>
                <div>
                    <div className="flex my-2 justify-between ">
                        <h2 className="inline-block my-auto text-2xl font-medium">
                            {data.sunrise}
                        </h2>
                        <img
                            className="w-1/3 mr-5"
                            src="https://res.cloudinary.com/dwohqjquz/image/upload/v1678590279/5f2_1_jdmenm.png"
                            alt="#"
                        />
                    </div>
                    <div className="flex my-2 justify-between ">
                        <h2 className="inline-block my-auto text-2xl font-medium">
                            {data.sunset}
                        </h2>
                        <img
                            className="w-1/3 mr-5"
                            src="https://res.cloudinary.com/dwohqjquz/image/upload/v1678590279/5f3_1_xgrj7n.png"
                            alt="#"
                        />
                    </div>
                </div>
            </div>
           
        </div>
    );
}
export default SideBar;
