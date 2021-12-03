import classnames from "classnames";

import { FunctionComponent, useCallback, useEffect, useState } from "react";
import years from "../data/index";

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
      <span className="ae-runner__result">{JSON.stringify(result)}</span>{" "}
      (expected {expected})
    </div>
  );
};

const Box = ({ id, result }: { id: string; result: any }) => {
  const classes = classnames({
    "ae-runner__box": true,
    "ae-runner__box--is-test": true,
  });

  return (
    <div className={classes}>
      <span className="ae-runner__testid">{id}</span>{" "}
      <span className="ae-runner__result ae-runner__result--is-solution">
        {JSON.stringify(result)}
      </span>
    </div>
  );
};

type RunResult = {
  type: "test" | "solution";
  state: "running" | "complete";
  result?: string;
  expected?: string;
};

type RunSet = Record<string, RunResult>;

type Props = {
  year: number;
  day: number;
};

const Runner: FunctionComponent<Props> = ({ year, day }) => {
  const [results, setResults] = useState<RunSet>({});
  const yearData = years[year];
  const dayData = yearData[day];

  const run = useCallback(
    (type: "test" | "solution", id: string, runner, data, expected?) => {
      setResults((prev) => ({
        ...prev,
        ...{ [`${id}`]: { type: type, state: "running" } },
      }));

      execRunner(runner, data).then((result) => {
        window.setTimeout(() => {
          setResults((prev) => ({
            ...prev,
            ...{ [`${id}`]: { type, result, expected, state: "complete" } },
          }));
        }, 10);
      });
    },
    []
  );

  useEffect(() => {
    dayData.parts.forEach((part, partIndex) => {
      part.tests.forEach((test, testIndex) => {
        const key = `P${partIndex}-T${testIndex}`;
        run("test", key, test.runner, test.data, test.result);
      });
      part.solutions.forEach((solution, solutionIndex) => {
        const key = `P${partIndex}-S${solutionIndex}`;
        run("solution", key, solution.runner, solution.data);
      });
    });
  }, [yearData, dayData, run]);

  return (
    <>
      <div className="ae-runner">
        {dayData.parts.map((part, i) => {
          const resultSet = Object.entries(results);
          return (
            <div key={`P${i}`}>
              <h3>part {i}</h3>
              <h4>Tests</h4>
              {resultSet
                .filter(([id, rs]) => rs.type === "test")
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
                .filter(([id, rs]) => rs.type === "solution")
                .map(([id, rs]) => {
                  return rs.state === "running" ? (
                    <div key={id}>Waiting for solution {i}...</div>
                  ) : (
                    <Box key={id} id={id} result={rs.result} />
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
