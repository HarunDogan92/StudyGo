import { Grid } from "@mui/material";
import TodoRegister from "./todo-register/TodoRegister";
import TodoPage from "./todo-list/TodoPage";
import { useState } from "react";
import TodoListContext from "./TodoListContext.js";

export default function Todos() {
  const [todoListId, setTodoListId] = useState();
  return (
    <TodoListContext.Provider value={{ todoListId, setTodoListId }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TodoRegister></TodoRegister>
        </Grid>
        <Grid item xs={7}>
          <TodoPage></TodoPage>
        </Grid>
      </Grid>
    </TodoListContext.Provider>
  );
}
