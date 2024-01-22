import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function TodoEditForm() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const params = useParams();
  const navigate = useNavigate();

  function saveTodo() {
    axios
      .put("http://localhost:8080/toDo/" + params.todoId, null, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        params: {
          name: name,
        },
      })
      .then((res) => {
        console.log("Success");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  return (
    <>
      <div className="form-row">
        <label htmlFor="item">Todo Editieren</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn" onClick={() => saveTodo()}>
        Speichern
      </button>
    </>
  );
}
