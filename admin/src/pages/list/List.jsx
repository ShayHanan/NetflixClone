import { useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { useContext, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";

export default function List() {
    const location = useLocation();
    const list = location.state;
    const [updatedList, setUpdatedList] = useState(list);
    const { dispatch } = useContext(ListContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedList({ ...list, [e.target.name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        updateList(updatedList, dispatch);
        navigate("/lists");
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Type:</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                        <div className="content">
                            <span className="productInfoKey">Content Id's:</span>
                            {/* <span className="productInfoValue" style={{ "fontSize": "12px" }}>{list.content.join(",")}</span> */}
                            <div className="idList">
                                {list.content.map(c => (
                                    <span key={c} className="productInfoValue">{c}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" placeholder={list.title} name="title" onChange={handleChange} />
                        <label>Type</label>
                        <select name="type" onChange={handleChange}>
                            <option >Type</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                        <label>Genre</label>
                        <input type="text" placeholder={list.genre} name="genre" onChange={handleChange} />
                    </div>
                    <div className="productFormRight">
                        <button className="productButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
