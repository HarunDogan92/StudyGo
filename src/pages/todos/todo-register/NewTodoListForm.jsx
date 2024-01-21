import { useState } from "react";

export function NewTodoListForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit(newItem);

    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">Neue Todo Liste</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="test"
          id="item"
        />
      </div>
      <button className="btn">Hinzufügen</button>
    </form>
  );
}
