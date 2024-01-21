import { Box, Grid } from "@mui/material";
import { useState } from "react";
import StudyplanRegister from "./StudyplanRegister";
import StudyplanCalender from "./StudyplanCalender";

export default function Studyplan() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <StudyplanRegister></StudyplanRegister>
      </Grid>
      <Grid item xs={7}>
        <StudyplanCalender></StudyplanCalender>
      </Grid>
    </Grid>
  );
}
