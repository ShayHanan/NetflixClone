import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import "./featured.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
const Featured = ({ type, setGenre }) => {
    const [content, setContent] = useState({});
    const id = useLocation().pathname;

    useEffect(() => {
        const fetchRandom = async () => {
            try {
                const res = await axios.get(`movies/random?type=${type}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });

                // const res = await axios.get(`movies/find${id}`, {
                //     headers: {
                //         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                //     }
                // });
                setContent(res.data[0]);
                // setContent(res.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchRandom();
    }, [type]);
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="thriller">Thriller</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="" />
            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="desc">{content.desc}</span>
                <div className="buttons">
                    <Link to="/watch" state={content} className="link">
                        <button className="play">
                            <PlayArrow />
                            <span>Play</span>
                        </button>
                    </Link>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;