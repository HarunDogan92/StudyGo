import { createContext } from "react";

const TodoListContext = createContext({
  todoListId: null,
  setTodoListId: () => {},
});

export default TodoListContext;
