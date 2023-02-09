import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({ list }) {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [distance, setDistance] = useState(0);
    const itemWidth = 232;
    const slidesNumber = 10;
    // the amount of click in order to get to the last item
    const clickLimit = slidesNumber - window.innerWidth / itemWidth;

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            setDistance(prev => prev + itemWidth);
            listRef.current.style.transform = `translateX(${itemWidth + distance}px)`;
        }
        if (direction === "right" && slideNumber < clickLimit) {
            setSlideNumber(slideNumber + 1);
            setDistance(prev => prev - itemWidth);
            listRef.current.style.transform = `translateX(${distance - itemWidth}px)`;
        }
    };
    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                <div className="container" ref={listRef}>
                    {list.content.map((id) => (
                        <ListItem key={id} id={id} />
                    ))}
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}