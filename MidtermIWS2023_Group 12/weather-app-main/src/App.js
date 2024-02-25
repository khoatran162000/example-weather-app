import Content from "./layout/content";
import SideBar from "./layout/sideBar";
import { BrowserRouter } from "react-router-dom";

function App() {
    // get locationState => call Api => set LocationWeather

    // get lat and lon

    // call API and get data

    return (
        <div className="w-full md:flex md:w-5/6  md:mx-auto md:my-10 xl:w-3/4  xl:mx-auto xl:my-10 lg:flex justify-between  rounded-3xl shadow-2xl  ">
            <BrowserRouter>
                <Content />
            </BrowserRouter>
            <SideBar />
        </div>
    );
}

export default App;
