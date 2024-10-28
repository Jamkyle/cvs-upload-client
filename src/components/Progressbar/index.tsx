import React from "react";
import { ProgressbarProps } from "./types";
import "./styles.scss";
const Progressbar: React.FC<ProgressbarProps> = ({
  progress,
}: ProgressbarProps) => {
  const clampedProgress = Math.max(0, Math.min(progress, 100));
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${clampedProgress}%` }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {clampedProgress}%
      </div>
    </div>
  );
};

export default Progressbar;
