import { useCallback, useEffect, useState } from "react";

let handleLogMsg = (msg: string) => {};

export let logMsg = (msg: any) => {
  console.log(msg);
  handleLogMsg(msg);
};

const Debugger = () => {
  const [msg, setMsg] = useState("");

  const appendLog = useCallback((line) => {
    setMsg((prev) => prev + "\n" + JSON.stringify(line, null, 2));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleLogMsg = appendLog;
  }, [appendLog]);

  return <code className="ae-debugger">{msg}</code>;
};

export default Debugger;
