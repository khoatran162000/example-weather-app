import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { locationContext } from "../../Context/locationProvider";

function Search() {
    const locationState = useContext(locationContext);
    // when user click to button
    // get Name in input => call API to get locationInfo(lat,lon) === locationState => set locationState
    const [locationName, setLocationName] = useState("");

    const getLocation = () => {
        const input = locationName.trim();
        // call apit to get locationInfo
        fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=709fcfc7d804f5e18e369ccb7f237344`,
        )
            .then((res) => res.json())
            .then((post) => {
                console.log("1");
                locationState.reducer(post[0]);
            })
            .catch(() => console.log("ham co loi"));
    };
    return (
        <div className="w-full flex border-2 p-1 px-2 rounded-2xl border-dashed border-color-5382B7">
            <div className="w-full flex justify-between my-2  text-lg bg-color-5382B7 rounded-xl text-white font-be">
                <h3 className="px-2 my-auto text-lg font-black">
                    Search for place
                </h3>
                <div className=" bg-white m-3  rounded-xl w-2/3 flex justify-between">
                    <input
                        className="px-2 py-2 rounded-xl text-black w-3/4 "
                        type="text"
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder=""
                        id="input"
                    />
                    <button className=" px-4 " onClick={() => getLocation()}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className=" my-auto text-xl font-black text-black "
                        />
                    </button>
                   
                </div>
            </div>
        </div>
    );
}
export default Search;
