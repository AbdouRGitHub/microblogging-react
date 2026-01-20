import {Outlet} from "react-router";
import RootHeader from "../components/RootHeader.tsx";

function RootLayout() {

    return (
        <>
            <div className="app">
                <RootHeader/>
                <Outlet/>
            </div>
        </>
    );
}

export default RootLayout;