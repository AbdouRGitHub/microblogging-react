import '../styles/RootHeader.css';
import {Bookmark, House, Settings} from "lucide-react";

function RootHeader() {
    return (
        <>
            <header className="header">
                <a href="#" className="start">
                    <img
                        src="logo.svg"
                        alt="logo"
                        className="logo-img"
                    />
                </a>
                <nav className="middle">
                    <House color="grey"/>
                    <Settings color="grey"/>
                    <Bookmark color="grey"/>
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