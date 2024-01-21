import { createContext } from "react";

const TodoListContext = createContext({
  todoListId: 1,
  setTodoListId: () => {},
});

export default TodoListContext;
