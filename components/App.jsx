import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { TextField, MenuItem, Button } from "@mui/material";
import Record from "./Record";
import { View } from "react-native";

export default function App(){
  // PersonInfo State
  const [info, setInfo] = useState({});
  // TimelineInfo State
  const [timelineInfo, setTimelineInfo] = useState([]);
  // Date State
  const [selectedDate, handleDateChange] = useState(new Date());
  // Submit state
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Dropdown option
  const genders = [
    { value: "ชาย", label: "ชาย" },
    { value: "หญิง", label: "หญิง" }
  ];
  function handleSubmit(event) {

  }
  function deleteLine(buttonValue){

  }
  return{

  }
}
