import React from "react";
import { Timeline } from "react-native-just-timeline";

export default function Record(props){
  function handleDelete(event){
    // pass value to App level function
    props.deleteLine(event.target.value);
  }
}
