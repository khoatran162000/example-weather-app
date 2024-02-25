import { Routes, Route } from "react-router-dom";

import RouterMenu from "./RouterMenu/RouterMenu";
import Today from "./Today";
import Week from "./week";

function ContentRouter(prop) {
    return (
        <div className="w-full" id="ContentRouter">
            <RouterMenu />
            <Routes>
                <Route index path="/" element={<Today hourly={prop.hour} />} />
                <Route path="/week" element={<Week week={prop.week} />} />
            </Routes>
        </div>
    );
}
export default ContentRouter;
