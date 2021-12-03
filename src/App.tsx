import React, { useState } from "react";
import Blurb from "./ui/Blurb";
import Picker from "./ui/Picker";
import Runner from "./ui/Runner";

import "./App.scss";

function App() {
  const [year, setYear] = useState(2021);
  const [day, setDay] = useState(1);
  return (
    <div className="ae-app">
      <Picker year={year} day={day} onSetYear={setYear} onSetDay={setDay} />
      <Runner year={year} day={day} />
      <Blurb />
    </div>
  );
}

export default App;
