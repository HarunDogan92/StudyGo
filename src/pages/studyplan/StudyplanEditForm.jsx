import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function StudyplanEditForm() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  function saveStudyplan() {
    axios
      .put(
        "http://localhost:8080/studyPlanAction/" + params.studyplanId,
        {
          name: name,
          fromDate: fromDate,
          toDate: toDate,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
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
        <label htmlFor="item">Lernplan Editieren</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
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
      <button className="btn" onClick={() => saveStudyplan()}>
        Speichern
      </button>
    </>
  );
}
