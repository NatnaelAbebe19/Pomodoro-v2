import React, { useContext, useEffect, useRef, useState } from "react";
import "../App.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const SettingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("Work");
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useState(mode);

  function switchMode() {
    const nextMode = modeRef.current === "Work" ? "Break" : "Work";
    const nextSeconds =
      (nextMode === "Work"
        ? SettingsInfo.workMinutes
        : SettingsInfo.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function initTimer() {
    setSecondsLeft(SettingsInfo.workMinutes * 60);
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [SettingsInfo]);

  const totalSeconds =
    mode === "Work"
      ? SettingsInfo.workMinutes * 60
      : SettingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "Work" ? red : green,
          trailColor: "#ffffffcc",
        })}
      />
      <div className="mt-[20px] ">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className="mt-[20px]">
        <SettingsButton onClick={() => SettingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
