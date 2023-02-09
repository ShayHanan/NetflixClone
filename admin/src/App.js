import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ListsList from "./pages/listsList/Listslist";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import NewMovie from "./pages/newMovie/NewMovie";
import Movie from "./pages/movie/Movie";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <Topbar />}
      <BrowserRouter>
        <div className="container">
          {user && <Sidebar />}
          <Routes>
            <Route path="/">
              <Route path="login" element={user ? <Home /> : <Login />} />
              {user && (
                <>
                  <Route index element={<Home />} />
                  <Route path="/user/:userId" element={<User />} />
                  <Route path="/newUser" element={<NewUser />} />
                  <Route path="/movies" element={<MovieList />} />
                  <Route path="/movie/" element={<Movie />} />
                  <Route path="/newMovie" element={<NewMovie />} />
                  <Route path="/lists" element={<ListsList />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/newlist" element={<NewList />} />

                </>
              )}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;