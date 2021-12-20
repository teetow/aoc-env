import classnames from "classnames";

import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import years from "../data/index";
import { formatTime } from "../lib/utils";

import "./Runner.scss";

const execRunner = async (runner: Function, data: unknown) => {
  return runner(data);
};

const TestBox = ({
  id,
  result,
  expected,
}: {
  id: string;
  result: any;
  expected: any;
}) => {
  const classes = classnames({
    "ae-runner__box": true,
    "ae-runner__box--is-test": true,
    "ae-runner__box--is-success": result === expected,
    "ae-runner__box--is-fail": result !== expected,
  });

  return (
    <div className={classes}>
      <span className="ae-runner__testid">{id}</span>{" "}
      <span className="ae-runner__result">
        {JSON.stringify(result)} (expected {expected})
      </span>
    </div>
  );
};

type BoxProps = {
  id: string;
  result: any;
  runTime: number;
  expected?: any;
};

const Box: FunctionComponent<BoxProps> = ({
  id,
  result,
  runTime,
  expected,
  children,
}: PropsWithChildren<BoxProps>) => {
  const classes = classnames({
    "ae-runner__box": true,
    "ae-runner__box--is-test": true,
    "ae-runner__box--is-success": expected !== undefined && result === expected,
    "ae-runner__box--is-fail": expected !== undefined && result !== expected,
  });

  return (
    <div className={classes}>
      <span className="ae-runner__testid">{id}</span>{" "}
      <span className="ae-runner__result ae-runner__result--is-solution">
        {JSON.stringify(result)}{" "}
        {expected && expected !== result && (
          <span className="ae-runner__result">({expected})</span>
        )}
      </span>
      <span className="ae-runner__result ae-runner__timer">
        {formatTime(runTime)}
      </span>
      {children}
    </div>
  );
};

type RunResult = {
  type: "test" | "solution";
  state: "running" | "complete";
  result?: string;
  expected?: string;
  startTime: number;
  endTime: number;
};

type RunSet = Record<string, RunResult>;

type Props = {
  year: number;
  day: number;
};

const Runner: FunctionComponent<Props> = ({ year, day }) => {
  const [results, setResults] = useState<RunSet>({});

  const run = useCallback(
    (type: "test" | "solution", id: string, runner, data, expected?) => {
      setResults((prev) => ({
        ...prev,
        ...{
          [`${id}`]: {
            type: type,
            state: "running",
            startTime: Date.now(),
            endTime: Date.now(),
          },
        },
      }));

      execRunner(runner, data).then((result) => {
        setResults((prev) => ({
          ...prev,
          ...{
            [`${id}`]: {
              ...prev[`${id}`],
              endTime: Date.now(),
              result,
              expected,
              state: "complete",
            },
          },
        }));
      });
    },
    []
  );

  useEffect(() => {
    const yearData = years[year];
    const dayData = yearData[day];

    dayData.parts.forEach((part, partIndex) => {
      part.tests.forEach((test, testIndex) => {
        const key = `Y${year}-D${day}-P${partIndex}-T${testIndex}`;
        run("test", key, test.runner, test.data, test.result);
      });
      part.solutions.forEach((solution, solutionIndex) => {
        const key = `Y${year}-D${day}-P${partIndex}-S${solutionIndex}`;
        run("solution", key, solution.runner, solution.data, solution.result);
      });
    });
  }, [run, year, day]);

  return (
    <>
      <div className="ae-runner">
        {years[year][day].desc && (
          <div className="ae-runner__desc">
            <h4>Description</h4>
            <p>{years[year][day].desc}</p>
          </div>
        )}
        {years[year][day].comment && (
          <div className="ae-runner__comment">
            <h4>Comment</h4>
            <p>{years[year][day].comment}</p>
          </div>
        )}
        {years[year][day].parts.map((part, i) => {
          const resultSet = Object.entries(results);
          return (
            <div key={`Y${year}-D${day}-P${i}`} className="ae-runner__part">
              <h2>Part {i + 1}</h2>
              <p>{part.desc}</p>
              <h4>Tests</h4>
              {resultSet
                .filter(
                  ([id, rs]) =>
                    id.startsWith(`Y${year}-D${day}-P${i}-T`) &&
                    rs.type === "test"
                )
                .map(([id, rs]) => {
                  return rs.state === "running" ? (
                    <div key={id}>Waiting for test {i}...</div>
                  ) : (
                    <TestBox
                      key={id}
                      id={id}
                      result={rs.result}
                      expected={rs.expected}
                    />
                  );
                })}
              <h4>Results</h4>
              {resultSet
                .filter(
                  ([id, rs]) =>
                    id.startsWith(`Y${year}-D${day}-P${i}`) &&
                    rs.type === "solution"
                )
                .map(([id, rs]) => {
                  return rs.state === "running" ? (
                    <div key={id}>
                      Waiting for solution {i}...{" "}
                      {Date.now() - (rs.startTime || 0)}
                    </div>
                  ) : (
                    <Box
                      key={id}
                      id={id}
                      result={rs.result}
                      expected={rs.expected}
                      runTime={rs.endTime - rs.startTime}
                    >
                      <div className="ae-runner__partcomment">
                        <h4>Comment</h4>
                        <p>{part.comment}</p>
                      </div>
                    </Box>
                  );
                })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Runner;
