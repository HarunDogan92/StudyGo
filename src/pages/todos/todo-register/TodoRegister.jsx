import { Divider, Stack } from "@mui/material";
import axios from "axios";
import { NewTodoListForm } from "./NewTodoListForm";
import { useContext, useEffect, useState } from "react";
import { TodoListItem } from "./TodoListItem";
import TodoListContext from "../TodoListContext.js";

export default function TodoRegister() {
  const [todolist, setTodolist] = useState([]);
  const { setTodoListId } = useContext(TodoListContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/" + sessionStorage.getItem("userId"), {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodolist(res.data.toDoLists);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  });

  function addTodoList(title) {
    axios
      .post(
        "http://localhost:8080/user/" +
          sessionStorage.getItem("userId") +
          "/toDoList",
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
        console.error("Error adding TodoList data: ", error);
      });
  }

  function selectTodoList(id) {
    setTodoListId(id);
  }

  function deleteTodoList(id) {
    axios
      .delete("http://localhost:8080/toDoList/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error deleting TodoList data: ", error);
      });
  }

  return (
    <>
      <h1 className="header">Todo Lists</h1>
      <Stack
        sx={{ border: "1px solid" }}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {todolist.length === 0 && "No Todo Lists"}
        {todolist.map((todo) => {
          return (
            <TodoListItem
              {...todo}
              key={todo.id}
              id={todo.id}
              name={todo.name}
              selectTodoList={() => selectTodoList(todo.id)}
              deleteTodoList={() => deleteTodoList(todo.id)}
            />
          );
        })}
      </Stack>
      <NewTodoListForm onSubmit={addTodoList} />
    </>
  );
}
