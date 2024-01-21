import axios from "axios";
import "./StudyplanCalender.css";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getISODay,
  startOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { addMonths } from "date-fns";
import { subMonths } from "date-fns";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function StudyplanCalender() {
  const [studyplan, setStudyplan] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/" + sessionStorage.getItem("userId"), {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        const coloredStudyPlan = res.data.studyPlanActions.map(
          (action, index) => {
            return {
              ...action,
              color: `hsl(${
                (360 * index) / res.data.studyPlanActions.length
              }, 70%, 70%)`,
            };
          }
        );
        setStudyplan(coloredStudyPlan);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  });

  const getColorForDay = (date) => {
    const plan = studyplan.find((plan) => {
      const from = new Date(plan.fromDate);
      const to = new Date(plan.toDate);
      return date >= from && date <= to;
    });
    return plan ? plan.color : null;
  };

  let firstDayofMonth = startOfMonth(currentDate);
  let lastDayOfMonth = endOfMonth(currentDate);

  let daysInMonth = eachDayOfInterval({
    start: firstDayofMonth,
    end: lastDayOfMonth,
  });

  let startingDayIndex = getISODay(firstDayofMonth) - 1;

  function prevMonth() {
    setCurrentDate(subMonths(currentDate, 1));
    resetDates();
  }

  function nextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
    resetDates();
  }

  function resetDates() {
    firstDayofMonth = startOfMonth(currentDate);
    lastDayOfMonth = endOfMonth(currentDate);
    startingDayIndex = getISODay(firstDayofMonth) - 1;
  }

  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <button className="btn" onClick={() => prevMonth()}>
            Prev
          </button>
        </Grid>
        <Grid item xs={10}>
          <div className="mb-4">
            <h1>{format(currentDate, "MMMM yyyy")}</h1>
          </div>
        </Grid>
        <Grid item xs={1}>
          <button className="btn" onClick={() => nextMonth()}>
            Next
          </button>
        </Grid>
      </Grid>
      <div className="calender">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="weekdays">
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={"empty-" + index} className="calenderDays" />;
        })}
        {daysInMonth.map((day, index) => {
          const color = getColorForDay(day);
          return (
            <div
              key={index}
              className={`calenderDays ${color ? "highlightedDay" : ""}`}
              style={{ backgroundColor: color }}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
