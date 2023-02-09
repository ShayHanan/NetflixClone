import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={user ? <Home /> : <Navigate replace to="/register" />} />
          <Route path="register" element={user ? <Navigate replace to="/" /> : <Register />} />
          <Route path="login" element={user ? <Navigate replace to="/" /> : <Login />} />
          {
            user && (
              <>
                <Route path="movies" element={<Home type="movie" />} />
                <Route path="series" element={<Home type="series" />} />
                <Route path="watch" element={<Watch />} />
              </>
            )
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
