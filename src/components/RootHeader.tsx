import '../styles/RootHeader.css';
import {Bookmark, House, Settings} from "lucide-react";
import {NavLink} from "react-router";

function RootHeader() {
    return (
        <>
            <header className="header">
                <a href="#" className="start">
                    <img
                        src="/logo.svg"
                        alt="logo"
                        className="logo-img"
                    />
                </a>
                <nav className="middle">
                    <NavLink to="/" end={true}>
                        {({isActive}) => (
                            <House className={isActive ? "active-link" : ""}/>
                        )}
                    </NavLink>
                    <NavLink to="#">
                        <Settings color="grey"/>
                    </NavLink>
                    <NavLink to="#">
                        <Bookmark color="grey"/>
                    </NavLink>
                </nav>
                <div className="end">
                    <div className="user-container">
                        <img src="https://picsum.photos/id/237/200/300" alt="avatar"/>
                    </div>
                </div>
            </header>
        </>
    );
}

export default RootHeader;