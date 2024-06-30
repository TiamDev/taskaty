import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./progressbox.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
const Progress = ({ progress, progressColor = "#000", progressHeight }) => {
  return (
    <CircularProgressbarWithChildren value={40}>
      {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
      <i className="bi bi-flag-fill  pe-1 necessary"></i>{" "}
      <div style={{ fontSize: 12, marginTop: -5 }}>
        <strong>5</strong> tasks
      </div>
    </CircularProgressbarWithChildren>
  );
};
export default Progress;
