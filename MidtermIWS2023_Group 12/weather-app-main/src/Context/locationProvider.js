import { useState } from "react";

import { createContext } from "react";

const locationContext = createContext();
const initlocationInfo = {
  lat: "21.0294498",
  lon: "105.8544441",
};

function LocationProvider({ children }) {
  const [locationState, setLocationState] = useState(initlocationInfo);

  const reducer = (input) => {
    const value = {
      lat: input.lat,
      lon: input.lon,
    };
    return setLocationState(value);
  };

  const value = {
    locationState,
    reducer,
  };
  return (
    <locationContext.Provider value={value}>
      {children}
    </locationContext.Provider>
  );
}
export { locationContext };
export { LocationProvider };
