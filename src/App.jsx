import "./App.css";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import User from "./pages/users/User";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/users/Register";
import Todos from "./pages/todos/Todos";
import Studyplan from "./pages/studyplan/Studyplan";
import Flashcards from "./pages/flashcards/Flashcards";

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
            <Route path="/studyplan/studyplan" element={<Studyplan />} />
            <Route path="/todos/todos" element={<Todos />} />
            <Route path="/flashcards" element={<Flashcards />} />
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
