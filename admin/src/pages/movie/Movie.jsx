import { Link, useLocation, useNavigate } from "react-router-dom";
import "./movie.css";
import { Publish } from "@mui/icons-material";
import { useContext, useState } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../Firebase";

export default function Movie() {
    const location = useLocation();
    const movie = location.state;
    const [updatedMovie, setUpdatedMovie] = useState(movie);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { dispatch } = useContext(MovieContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(updatedMovie, dispatch);
        navigate("/movies");
    };


    const upload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.label + file.file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file.file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setUploadProgress(Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            }, (error) => { },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUpdatedMovie(prev => { return { ...prev, [file.label]: downloadURL }; });
                });
            }
        );
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.img} alt="" className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" placeholder={movie.title} name="title" onChange={handleChange} />
                        <label>Year</label>
                        <input type="text" placeholder={movie.year} name="year" onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={movie.genre} name="genre" onChange={handleChange} />
                        <label>Limit</label>
                        <input type="text" placeholder={movie.limit} name="limit" onChange={handleChange} />
                        <label>Duration</label>
                        <input type="text" placeholder={movie.duration} name="duration" onChange={handleChange} />
                        <div className="addProductItem">
                            <label>Is Series?</label>
                            <select name="isSeries" id="isSeries" onChange={handleChange}>
                                <option>Is series</option>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <label>Trailer</label>
                        <input type="file" placeholder={movie.trailer} onChange={e => upload({ label: "trailer", file: e.target.files[0] })} />
                        <label>Video</label>
                        <input type="file" placeholder={movie.video} onChange={e => upload({ label: "video", file: e.target.files[0] })} />

                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <span>Movie Image:</span>
                            <img
                                src={movie.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label htmlFor="image">
                                <Publish />
                            </label>
                            <input type="file" id="image" style={{ display: "none" }} onChange={e => upload({ label: "img", file: e.target.files[0] })} />
                        </div>
                        <div className="productUpload">
                            <span>Movie Thumbnail:</span>
                            <img
                                src={movie.imgSmall}
                                alt=""
                                className="productUploadImg"
                            />
                            <label htmlFor="imgSmall">
                                <Publish />
                            </label>
                            <input type="file" id="imgSmall" style={{ display: "none" }} onChange={e => upload({ label: "imgSmall", file: e.target.files[0] })} />
                        </div>
                        <div className="productUpload">
                            <span>Movie Title Image:</span>
                            <img
                                src={movie.imgTitle}
                                alt=""
                                className="productUploadImg"
                            />
                            <label htmlFor="imgTitle">
                                <Publish />
                            </label>
                            <input type="file" id="imgTitle" style={{ display: "none" }} onChange={e => upload({ label: "imgTitle", file: e.target.files[0] })} />
                        </div>
                        <button className="productButton" onClick={handleSubmit}>Update</button>
                        {uploadProgress !== 0 && <span>upload progress: {uploadProgress}%</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}