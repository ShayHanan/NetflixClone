import { useEffect } from "react";
import { useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./home.scss";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    // genere is being set in the featured component
    const [genre, setGenre] = useState(null);
    useEffect(() => {
        const fetchRandomLists = async () => {
            try {
                const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRandomLists();
    }, [genre, type]);
    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {
                lists.map((list, index) => (
                    <List list={list} key={index} />
                ))
            }
        </div>
    );
};

export default Home;