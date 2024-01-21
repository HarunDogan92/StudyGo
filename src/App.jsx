import "./App.css";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import User from "./pages/users/User";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/users/Register";
import Todos from "./pages/todos/Todos";

function App() {
  let token = sessionStorage.getItem("token");
  let site;
  if (token) {
    site = (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos/todos" element={<Todos />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </>
    );
  } else {
    site = <Register />;
  }
  return site;
}

export default App;
