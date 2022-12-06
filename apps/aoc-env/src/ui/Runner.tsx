import classnames from "classnames";
import {
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import years from "../data/index";
import { formatTime, pad2 } from "../lib/utils";

import "./Runner.scss";

const execRunner = async (
  runner: (data: string | number) => number,
  data: string | number
) => {
  return runner(data);
};

const TestBox = ({
  id,
  result,
  expected,
}: {
  id?: string;
  result?: number;
  expected?: number;
}) => {
  const isSuccess = result === expected;

  return (
    <Box
      id={id}
      expected={expected}
      isSuccess={isSuccess}
      isFail={result !== expected}
    >
      {isSuccess ? (
        <>✔ ({JSON.stringify(result)})</>
      ) : (
        <>
          ❌{JSON.stringify(result)} (expected {expected})
        </>
      )}
    </Box>
  );
};

type BoxProps = {
  id?: string;
  runTime?: number;
  expected?: number;
  isSuccess?: boolean;
  isFail?: boolean;
};

const Box = ({
  id,
  runTime,
  children,
  isSuccess,
  isFail,
}: PropsWithChildren<BoxProps>) => {
  const classes = classnames({
    "ae-runner__box": true,
    "ae-runner__box--is-success": isSuccess,
    "ae-runner__box--is-fail": isFail,
  });

  return (
    <div className={classes}>
      <span className="ae-runner__testid">{id}</span>{" "}
      <span className="ae-runner__result">{children}</span>
      <span className="ae-runner__timer">{runTime && formatTime(runTime)}</span>
    </div>
  );
};

type RunResult = {
  type: "test" | "solution";
  state: "running" | "complete";
  result?: number;
  expected?: number;
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
  const testStatii = useRef<Record<string, "running" | "complete">>({});
  const dayData = years[year][`day${pad2(day)}`];

  const run = useCallback(
    (
      type: "test" | "solution",
      id: string,
      data: string,
      runner?: (data: any) => number,
      expected?: any
    ) => {
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
      if (runner) {
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
      }
    },
    []
  );

  useEffect(() => {
    dayData.parts.forEach((part, partIndex) => {
      part.tests &&
        part.tests.forEach((test, testIndex) => {
          const key = `Y${year}-D${day}-P${partIndex}-T${testIndex}`;
          run("test", key, test.data, test.runner, test.result);
        });

      // const testResults = Object.entries(results).filter(([id, rs]) =>
      //   id.includes("-T")
      // );

      // // break on failing tests
      // if (
      //   testResults.length > 0 &&
      //   testResults.filter(([id, rs]) => rs !== undefined).length !==
      //     testResults.length
      // ) {
      //   return;
      // }
    });
  }, [day, dayData.parts, run, year]);

  useEffect(() => {
    Object.entries(results).forEach(([id, rs]) => {
      testStatii.current[id] = rs.state;
    });
  }, [results]);

  useEffect(() => {
    if (
      !Object.values(testStatii.current).every((state) => state === "complete")
    ) {
      console.log("waiting for tests");
      return;
    }

    dayData.parts.forEach((part, partIndex) => {
      part.solutions &&
        part.solutions.forEach((solution, solutionIndex) => {
          const key = `Y${year}-D${day}-P${partIndex}-S${solutionIndex}`;
          run("solution", key, solution.data, solution.runner, solution.result);
        });
    });
  }, [day, dayData.parts, run, year]);

  return (
    <>
      <div className="ae-runner">
        <div className="ae-runner__header">
          <h1>
            Day {day}, {year}
          </h1>
          <iframe
            className="ae-runner__instr"
            title="Instructions"
            src={`https://adventofcode.com/${year}/day/${day}`}
          />
          {dayData.desc && (
            <div className="ae-runner__desc">
              <p>{dayData.desc}</p>
            </div>
          )}
          {dayData.comment && (
            <div className="ae-runner__comment">
              <h4>Comment</h4>
              <p>{dayData.comment}</p>
            </div>
          )}
          <div className="ae-runner__links">
            <a
              className="ae-runner__link"
              href={`https://adventofcode.com/${year}/day/${day}`}
            >
              Read instructions
            </a>
            <a
              className="ae-runner__link"
              href={`https://github.com/teetow/aoc-env/blob/master/src/data/${year}/day${day
                .toString()
                .padStart(2, "0")}.ts`}
            >
              View solution
            </a>
          </div>
        </div>
        <div className="ae-runner__parts">
          {dayData.parts.map((part, i) => {
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
                      <Fragment key={id}>
                        <Box
                          key={id}
                          id={id}
                          expected={rs.expected}
                          runTime={rs.endTime - rs.startTime}
                        >
                          <div className="ae-runner__result--is-solution">
                            {rs.result}
                          </div>
                        </Box>
                        {part.comment && (
                          <div className="ae-runner__partcomment">
                            <h4>Comment</h4>
                            <p>{part.comment}</p>
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Runner;