import { FunctionComponent } from "react";
import years from "../data/index";

type Props = {
  onSetYear: (year: number) => void;
  onSetDay: (day: number) => void;
  year: number;
  day: number;
};

const Picker: FunctionComponent<Props> = ({
  year,
  day,
  onSetYear,
  onSetDay,
}: Props) => {
  return (
    <div className="ae-picker">
      <div className="ae-picker__years">
        {Object.keys(years).map((y, index) => (
          <div key={`${index}`} className="ae-picker__year">
            {y}
          </div>
        ))}
      </div>
      <div className="ae-picker__days">
        {Object.keys(years[year]).map((d, index) => (
          <div key={`${index}`}>{d}</div>
        ))}
      </div>
    </div>
  );
};

export default Picker;
