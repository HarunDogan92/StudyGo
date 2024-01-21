import { useContext, useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import axios from "axios";
import TodoListContext from "../TodoListContext.js";

export default function TodoPage() {
  const { todoListId } = useContext(TodoListContext);
  const [todos, setTodos] = useState([]);
  const [todoListName, setTodoListName] = useState("Select Todo List");

  useEffect(() => {
    if (todoListId) {
      axios
        .get("http://localhost:8080/toDoList/" + todoListId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          setTodos(res.data.toDos);
          setTodoListName(res.data.name);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  });

  function addTodo(title) {
    axios
      .post(
        "http://localhost:8080/toDoList/" + todoListId + "/todo",
        {
          name: title,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  function toggleTodo(id, completed) {
    axios
      .put("http://localhost:8080/toDo/" + id, null, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        params: {
          done: completed,
        },
      })
      .then((res) => {
        console.log("Success", res);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  function deleteTodo(id) {
    axios
      .delete("http://localhost:8080/toDo/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Success", res);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  return (
    <>
      <h1 className="header">{todoListName}</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <NewTodoForm onSubmit={addTodo} />
    </>
  );
}
