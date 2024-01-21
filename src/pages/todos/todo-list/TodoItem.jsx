export function TodoItem({ done, id, name, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {name}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-dange">
        Löschen
      </button>
    </li>
  );
}
