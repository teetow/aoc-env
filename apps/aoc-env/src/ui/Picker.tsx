import classNames from "classnames";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import years from "../data/index";

import "./Picker.scss";

type Props = {
  year: number;
  day?: number;
};

const idToIndex = (id: string) => Number(id.split("day")[1]);

const Picker: FunctionComponent<Props> = ({ year, day }: Props) => {
  const getClasses = (val: any, refVal: any) => {
    return classNames({
      "ae-picker__listitem": true,
      "ae-picker__listitem--is-active": val === refVal,
    });
  };
  return (
    <div className="ae-picker">
      <ul className="ae-picker__list ae-picker__years">
        {Object.keys(years).map((y, index) => (
          <Link key={`${index}`} to={`/${y}`}>
            <li className={getClasses(Number(y), year)}>{y}</li>
          </Link>
        ))}
      </ul>
      <ul className="ae-picker__list ae-picker__days">
        {Object.keys(years[year]).map((d, index) => (
          <Link key={`${index}`} to={`/${year}/${idToIndex(d)}`}>
            <li className={getClasses(Number(d), day)}>{idToIndex(d)}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Picker;
