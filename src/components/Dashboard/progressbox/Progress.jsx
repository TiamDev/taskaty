import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import "./progressbox.css";
const Progress = ({
  progress,
  maxCompleted,
  progressColor = "#f0e790",
  progressHeight,
}) => {
  return (
    <ProgressBar
      completed={progress}
      maxCompleted={maxCompleted}
      customLabel={progress}
      height={progressHeight}
      width={"100%"}
      labelClassName="label"
      bgColor={progressColor}
      baseBgColor="#e0e0de3b"
    />
  );
};
export default Progress;
