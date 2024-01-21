export function TodoListItem({ id, name, selectTodoList, deleteTodoList }) {
  return (
    <div>
      <label>{name}</label>
      <button onClick={() => selectTodoList(id)} className="btn btn-dange">
        Selektieren
      </button>
      <button onClick={() => deleteTodoList(id)} className="btn btn-dange">
        Löschen
      </button>
    </div>
  );
}
