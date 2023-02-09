import { useContext, useState } from "react";
import app from "../../Firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./newMovie.css";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSmall, setImgSmall] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    const storage = getStorage(app);
    items.forEach(item => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
            setMovie(prev => { return { ...prev, [item.label]: downloadURL }; });
            setUploaded(prev => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploadStart(true);
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSmall, label: "imgSmall" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    navigate("/movies");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie/Series</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={e => setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={e => setImgTitle(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSmall" name="imgSmall" onChange={e => setImgSmall(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Movie Title" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="Limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="duration" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>IS Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option>Is series</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" id="trailer" name="trailer" onChange={e => setTrailer(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" id="video" name="video" onChange={e => setVideo(e.target.files[0])} />
        </div>
        {uploaded === 5 ?
          (<button className="addProductButton" onClick={handleSubmit}>Create</button>) :
          (<button className="addProductButton" onClick={handleUpload} disabled={uploadStart}>Upload</button>)
        }
        {
          uploaded > 0 && uploaded < 5 && <span>Uploading...</span>
        }
      </form>
    </div>
  );
}
