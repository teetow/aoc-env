import { useEffect, useState } from "react";

let handleLogMsg = (msg: string) => {};

export let logMsg = (msg: string) => {
  console.log(msg);
  handleLogMsg(msg);
};

const Debugger = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleLogMsg = setMsg;
    console.log("registering");
  }, [setMsg]);

  return <code className="ae-debugger">{msg}</code>;
};

export default Debugger;
