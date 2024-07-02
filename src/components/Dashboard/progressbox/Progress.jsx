import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import "./progressbox.css";
const Progress = ({
  progress,
  maxCompleted,
  progressColor = "#000",
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
    />
  );
};
export default Progress;
