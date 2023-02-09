import { useContext, useState } from "react";
import app from "../../Firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./newList.css";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";
import { ListContext } from "../../context/listContext/ListContext";
import { useEffect } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { createList } from "../../context/listContext/apiCalls";

export default function NewList() {
  const [list, setList] = useState({});
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  useEffect(() => {
    setList({ ...list, ["content"]: selectedMovies });
  }, [selectedMovies]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists");
  };

  const handleOptionClick = (movie) => {
    if (selectedMovies.includes(movie._id)) {
      setSelectedMovies(selectedMovies.filter((m) => m !== movie._id));
      setSelectedNames([...selectedNames.filter((m) => m !== movie.title)]);
    } else {
      setSelectedMovies([...selectedMovies, movie._id]);
      setSelectedNames([...selectedNames, movie.title]);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="List Title" name="title" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option >Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content (alphabetical)</label>
            <div className="options">
              {[...movies].sort((a, b) => a.title.localeCompare(b.title)).map((movie) => (
                <div
                  key={movie._id}
                  className={`movieOption ${selectedNames.includes(movie.title) ? "selected" : ""
                    }`}
                  onClick={() => handleOptionClick(movie)}
                >
                  {movie.title}
                </div>
              ))}
            </div>
            <div className="selectedContent">
              Selected Content: {selectedNames.join(",")}
            </div>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
