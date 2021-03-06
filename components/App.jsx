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
    const { value: gender } = event.target.gender;
const { value: age } = event.target.age;
if (age < 0) {
  alert("กรุณาระบุอายุของท่านใหม่อีกครั้ง");
}
const { value: career } = event.target.career;
const { value: timestamp } = event.target.timestamp;
const dayTimestamp = moment(timestamp, "DD/MM/YYYY hh:mm A").format(
  "DD/MM/YYYY"
);
const hourTimestamp = moment(timestamp, "DD/MM/YYYY hh:mm A").format(
  "HH:mm"
);
const { value: description } = event.target.description;

if (info.gender === gender && info.age === age && info.career === career) {
  if (timelineInfo.find((line) => line.day === dayTimestamp) != null) {
    if (
      timelineInfo.find((line) =>
        line.stamps.find((stamp) => stamp.time === hourTimestamp)
      ) != null
    ) {
      alert(
        "วันและเวลาที่ท่านกรอกซ้ำซ้อนกับเวลาเดิมกรุณากรอกรายละเอียดใหม่อีกครั้ง"
      );
    } else {
      // add hour timestamp
      setTimelineInfo((prevValue) => {
        const newValue = [...prevValue];
        newValue
          .find((line) => line.day === dayTimestamp)
          .stamps.push({
            time: hourTimestamp,
            description: description
          });
        return newValue;
      });
      // sort hour
      setTimelineInfo((prevValue) => {
        // non-mutation array of objects
        let newValue = prevValue.map((item) => {
          return { ...item };
        });

        newValue
          .find((line) => line.day === dayTimestamp)
          .stamps.sort((a, b) => {
            a = parseFloat(a.time.replace(":", "."));
            b = parseFloat(b.time.replace(":", "."));
            console.log("this way");
            if (a - b < 0) {
              console.log(a);
              console.log("negative");
              return -1;
            }
            if (a - b > 0) {
              console.log(a);
              console.log("positive");
              return 1;
            } else {
              console.log(a);
              console.log("zero");
              return 0;
            }
          });

        return newValue;
      });
    }
  } else {
    setTimelineInfo((prevValue) => {
      const newValue = [
        ...prevValue,
        {
          day: dayTimestamp,
          stamps: [
            {
              time: hourTimestamp,
              description: description
            }
          ]
        }
      ];
      return newValue;
    });
    // sort Day
    setTimelineInfo((prevValue) => {
      // non-mutation array of objects
      let newValue = prevValue.map((item) => {
        return { ...item };
      });

      newValue.sort((a, b) => {
        a = new Date(moment(a.day, "DD/MM/YYYY").format("YYYY-MM-DD"));
        b = new Date(moment(b.day, "DD/MM/YYYY").format("YYYY-MM-DD"));

        if (a - b < 0) return -1;
        if (a - b > 0) return 1;
        else return 0;
      });

      return newValue;
    });
  }
} else {
  setInfo(() => {
    return {
      gender: gender,
      age: age,
      career: career
    };
  });

  setTimelineInfo(() => {
    // don't need prevValue bc it's new person
    return [
      {
        day: dayTimestamp,
        stamps: [
          {
            time: hourTimestamp,
            description: description
          }
        ]
      }
    ];
  });
  setIsSubmitted(true);
}
event.target.description.value = "";
event.preventDefault();
}
  function deleteLine(buttonValue) {
  // delete description
  setTimelineInfo((prevValue) => {
    // split button value to date and time
    const split = buttonValue.split(" ");
    const newValue = [...prevValue];
    const updatedStamp = {
      day: split[0],
      stamps: newValue
        .find((line) => line.day === split[0])
        .stamps.filter((stamp) => {
          return stamp.time !== split[1];
        })
    };
    if (updatedStamp.stamps.length === 0)
      return prevValue.filter((line) => {
        return line.day !== split[0];
      });
    else
      return prevValue
        .filter((line) => {
          return line.day !== split[0];
        })
        .concat([updatedStamp]);
  });
}
  return (
  <div>
    <h1 className="title">COVID TIMELINE Generator</h1>
    <div className="box">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <p className="topic">ข้อมูลผู้ป่วย</p>
          <span className="firstspanlabel">เพศ</span>
          <span className="secondspanlabel">อายุ</span>
          <br />
          <TextField
            className="textarea halfwidth"
            name="gender"
            select
            type="text"
            required="true"
          >
            {genders.map((option) => (
              <MenuItem
                style={{ display: "block" }}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="textarea halfwidth right"
            name="age"
            type="number"
            required="true"
          />
          <p className="label">อาชีพ</p>
          <TextField
            className="textarea"
            name="career"
            type="text"
            fullWidth
            required="true"
            autoComplete="off"
          />
        </div>
        <div className="input">
          <p className="topic">ข้อมูลไทม์ไลน์</p>
          <p className="label">วันเวลา</p>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              className="textarea"
              name="timestamp"
              format="DD/MM/yyyy hh:mm A"
              onChange={handleDateChange}
              inputVariant="outlined"
              value={selectedDate}
            />
          </MuiPickersUtilsProvider>
          <p className="label">รายละเอียด</p>
          <TextField
            className="textarea"
            name="description"
            multiline
            rows={5}
            fullWidth
            required="true"
          />
          <span className="spanlabel"></span>
          <div className="viewdiv">
            <View backgroundColor="#ffc107">
              <Button className="button" type="submit" variant="contained">
                {" + เพิ่มข้อมูล "}
              </Button>
            </View>
          </div>
        </div>
      </form>
      {isSubmitted && (
        <Record
          gender={info.gender}
          age={info.age}
          career={info.career}
          timelineInfo={timelineInfo}
          deleteLine={deleteLine}
        />
      )}
    </div>
  </div>
);
}
