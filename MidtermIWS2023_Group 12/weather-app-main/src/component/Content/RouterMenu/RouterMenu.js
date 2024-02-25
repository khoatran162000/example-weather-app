import { Link } from "react-router-dom";

function RounterMenu() {
    return (
        <ul className="flex font-bold text-xl ">
            <li className="mx-2 py-2 rounded-xl hover:bg-white">
                <Link className="p-1 " to="/">
                    TODAY
                </Link>
            </li>
            <li className="mx-2 py-2 rounded-xl hover:bg-white">
                <Link className="p-1 " to="/week">
                    WEEK
                </Link>
            </li>
        </ul>
    );
}
export default RounterMenu;
