import '../styles/RootHeader.css';
import {Bookmark, House} from "lucide-react";
import {Link, NavLink} from "react-router";

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
                        <Bookmark color="grey"/>
                    </NavLink>
                </nav>
                <div className="end">
                    <div className="user-container">
                        <Link to="#" className="user-link">
                            <img src="https://picsum.photos/id/237/200/300" alt="avatar"/>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default RootHeader;