import { Divider, Stack } from "@mui/material";
import { NewStudyPlanForm } from "./NewStudyPlanForm";
import { StudyplanItem } from "./StudyplanItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { addHours } from "date-fns";

export default function StudyplanRegister() {
  const [studyplan, setStudyplan] = useState([]);

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

  function addStudyPlan(title, fromDate, toDate) {
    fromDate = addHours(fromDate, 1);
    toDate = addHours(toDate, 1);
    axios
      .post(
        "http://localhost:8080/user/" +
          sessionStorage.getItem("userId") +
          "/studyPlanAction",
        {
          name: title,
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
      })
      .catch((error) => {
        console.error("Error adding StudyPlan data: ", error);
      });
  }

  function deleteStudyPlan(id) {
    axios
      .delete("http://localhost:8080/studyPlanAction/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error deleting StudyPlan data: ", error);
      });
  }

  return (
    <>
      <h1 className="header">Lernplan actions</h1>
      <Stack
        sx={{ border: "1px solid" }}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {studyplan && studyplan.length === 0 && "Keine actions"}
        {studyplan
          ? studyplan.map((study) => {
              return (
                <StudyplanItem
                  {...study}
                  key={study.id}
                  id={study.id}
                  name={study.name}
                  deleteStudyplan={() => deleteStudyPlan(study.id)}
                />
              );
            })
          : ""}
      </Stack>
      <NewStudyPlanForm onSubmit={addStudyPlan} />
    </>
  );
}
