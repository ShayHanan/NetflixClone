import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    PlayCircleOutline,
    List,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    AddToQueue,
    QueuePlayNext,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
    const [active, setActive] = useState("home");

    const handleClick = (e) => {
        setActive(e.target.id);
    };
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li
                                id="home"
                                className={`sidebarListItem ${active === "home" ? "active" : ""}`}
                                onClick={handleClick}
                            >
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <li
                            id="analytics"
                            className={`sidebarListItem ${active === "analytics" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li
                            id="sales"
                            className={`sidebarListItem ${active === "sales" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <li
                            id="users"
                            className={`sidebarListItem ${active === "users" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <PermIdentity className="sidebarIcon" />
                            Users
                        </li>
                        <Link to="/movies" className="link">
                            <li
                                id="movies"
                                className={`sidebarListItem ${active === "movies" ? "active" : ""}`}
                                onClick={handleClick}
                            >
                                <PlayCircleOutline className="sidebarIcon" />
                                Movies
                            </li>
                        </Link>
                        <Link to="/lists" className="link">
                            <li
                                id="lists"
                                className={`sidebarListItem ${active === "lists" ? "active" : ""}`}
                                onClick={handleClick}
                            >
                                <List className="sidebarIcon" />
                                Lists
                            </li>
                        </Link>
                        <Link to="/newMovie" className="link">
                            <li
                                id="addMovie"
                                className={`sidebarListItem ${active === "addMovie" ? "active" : ""}`}
                                onClick={handleClick}
                            >
                                <AddToQueue className="sidebarIcon" />
                                Add Movie
                            </li>
                        </Link>
                        <Link to="/newList" className="link">
                            <li
                                id="addList"
                                className={`sidebarListItem ${active === "addList" ? "active" : ""}`}
                                onClick={handleClick}
                            >
                                <QueuePlayNext className="sidebarIcon" />
                                Add List
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li
                            id="mail"
                            className={`sidebarListItem ${active === "mail" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <MailOutline className="sidebarIcon" />
                            Mail
                        </li>
                        <li
                            id="feedback"
                            className={`sidebarListItem ${active === "feedback" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <DynamicFeed className="sidebarIcon" />
                            Feedback
                        </li>
                        <li
                            id="messages"
                            className={`sidebarListItem ${active === "messages" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <ChatBubbleOutline className="sidebarIcon" />
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li
                            id="manage"
                            className={`sidebarListItem ${active === "manage" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <WorkOutline className="sidebarIcon" />
                            Manage
                        </li>
                        <li
                            id="reports"
                            className={`sidebarListItem ${active === "reports" ? "active" : ""}`}
                            onClick={handleClick}
                        >
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}