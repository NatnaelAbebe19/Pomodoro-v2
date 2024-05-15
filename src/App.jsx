import React, { useState } from "react";
import "./App.css";
import Timer from "./Components/Timer";
import Settings from "./Components/Settings";
import SettingsContext from "./Components/SettingsContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main className="pt-[50px] max-w-[340px] mx-auto my-0 text-center">
      <h2 className="py-6 text-4xl font-mono font-bold capitalize">
        ደውል pomodoro
      </h2>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
