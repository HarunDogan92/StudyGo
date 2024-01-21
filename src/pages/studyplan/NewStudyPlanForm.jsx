import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function NewStudyPlanForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit(newItem, fromDate, toDate);

    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-study-form">
      <div className="form-row">
        <label htmlFor="item">Neuer Lernplan</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="test"
          placeholder="Name"
          id="item"
        />
        <label htmlFor="item">Von</label>
        <DatePicker
          label="Von"
          value={fromDate}
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          type="text"
          calendarStartDay={1}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
        <label htmlFor="item">Bis</label>
        <DatePicker
          label="Bis"
          value={toDate}
          selected={toDate}
          onChange={(date) => setToDate(date)}
          type="text"
          calendarStartDay={1}
          minDate={fromDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button className="btn">Hinzufügen</button>
    </form>
  );
}
