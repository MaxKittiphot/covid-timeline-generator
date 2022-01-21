import React from "react";
import { Timeline } from "react-native-just-timeline";

export default function Record(props){
  function handleDelete(event){
    // pass value to App level function
    props.deleteLine(event.target.value);
  }
  return (
  <div className="info">
    <h1 className="infotitle">Timeline</h1>
    <div className="infoperson">
      <p className="capsuletext">
        ผู้ป่วย{props.gender} อายุ {props.age} ปี
      </p>
      <h6>อาชีพ {props.career}</h6>
    </div>
    <div>
      <Timeline
        data={props.timelineInfo.map((line) => {
          return {
            description: () =>
              line.stamps.map((des) => {
                return (
                  <div id={line.day + des.time}>
                    <span
                      key={line.day + des.time + "time"}
                      style={{ color: "#ffc107" }}
                    >
                      {des.time}
                    </span>
                    <span
                      key={line.day + des.time + "description"}
                      style={{ color: "black" }}
                    >
                      {" " + des.description}
                    </span>
                    <div>
                      <button
                        className={"deletebutton"}
                        value={line.day + " " + des.time}
                        onClick={handleDelete}
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              }),
            time: {
              content: (
                <h1 className="timestamp" style={{ color: "#ffc107" }}>
                  {line.day}
                </h1>
              )
            },
            icon: {
              style: {
                backgroundColor: "#ffc107"
              }
            }
          };
        })}
      />
    </div>
  </div>
);
}
