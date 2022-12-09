import { HashRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.scss";
import years from "./data";
import { pad2 } from "./lib/utils";
import Blurb from "./ui/Blurb";
import Debugger from "./ui/Debugger";
import Picker from "./ui/Picker";
import Runner from "./ui/Runner";

const getDate = (year: number, day: number) => {
  let validYear = 2021;
  let validDay = 1;

  if (Number.isNaN(year)) year = new Date().getFullYear();

  if (Number.isNaN(day)) {
    day = new Date().getDate();
  }

  if (Object.keys(years).includes(year.toString())) {
    validYear = year;

    if (Object.keys(years[year]).includes(`day${pad2(day)}`)) {
      validDay = day;
    } else {
      validDay = Object.keys(years[year]).length; // NOT off by one, days are 1-indexed
    }
  }
  return [validYear, validDay];
};

const AppMain = () => {
  let params = useParams();
  const [year, day] = getDate(Number(params.year), Number(params.day));

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
      <>
        <Routes>
          <Route path="/" element={<AppMain />} />
          <Route path=":year" element={<AppMain />}></Route>
          <Route path=":year/:day" element={<AppMain />}></Route>
        </Routes>
        <Blurb />
      </>
    </HashRouter>
  );
}

export default App;
