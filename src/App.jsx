import "./App.css";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import TodoPage from "./pages/todos/TodoPage";
import User from "./pages/User";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos/todopage" element={<TodoPage />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
