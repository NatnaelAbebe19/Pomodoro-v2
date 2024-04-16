import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

function Settings() {
  const SettingsInfo = useContext(SettingsContext);
  return (
    <div className="text-left">
      <label className="block mb-[10px] mt-[20px] capitalize">
        Work {SettingsInfo.workMinutes}:00
      </label>
      <ReactSlider
        className={"h-[40px] border-2 border-red-800 rounded-[20px]"}
        thumbClassName={
          "bg-red-500 cursor-pointer w-[40px] h-[40px] rounded-full "
        }
        trackClassName={"track"}
        value={SettingsInfo.workMinutes}
        onChange={(newValue) => SettingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />

      <label className="block mb-[10px] mt-[20px] capitalize">
        Break: {SettingsInfo.breakMinutes}:00
      </label>
      <ReactSlider
        className={"h-[40px] border-2 border-green-800 rounded-[20px] "}
        thumbClassName={
          "bg-green-500 cursor-pointer w-[40px] h-[40px] rounded-full "
        }
        trackClassName={"track"}
        value={SettingsInfo.breakMinutes}
        onChange={(newValue) => SettingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div className="text-center">
        <BackButton onClick={() => SettingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
