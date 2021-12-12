import React from "react";
import { HashRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.scss";
import Blurb from "./ui/Blurb";
import Debugger from "./ui/Debugger";
import Picker from "./ui/Picker";
import Runner from "./ui/Runner";

const AppMain = () => {
  let params = useParams();
  const year = Number(params.year) || 2021;
  const day = Number(params.day) || 1;

  return (
    <>
      <Picker year={year} day={day} />
      <Runner year={year} day={day} />
      <Debugger />
    </>
  );
};

function App() {
  return (
    <HashRouter>
      <div className="ae-app">
        <Routes>
          <Route path="/" element={<AppMain />} />
          <Route path=":year" element={<AppMain />}></Route>
          <Route path=":year/:day" element={<AppMain />}></Route>
        </Routes>
        <Blurb />
      </div>
    </HashRouter>
  );
}

export default App;
