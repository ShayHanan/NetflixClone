import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
    const location = useLocation();
    const movie = location.state;
    return (
        <div className="watch">
            <span className="title">{movie.title}</span>
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video className="video" autoPlay controls src={movie.video} />
        </div>
    );
}