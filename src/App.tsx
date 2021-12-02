import React, { useState } from "react";
import Blurb from "./ui/Blurb";
import Picker from "./ui/Picker";

function App() {
  const [year, setyear] = useState(2021);
  const [day, setDay] = useState(1);
  return (
    <div className="ae-app">
      <Picker year={2021} day={day} onSetYear={setDay} onSetDay={setDay} />
      {/* <DayRunner day={day} /> */}
      <Blurb />
    </div>
  );
}

export default App;
