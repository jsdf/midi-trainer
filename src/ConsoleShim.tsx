import React from "react";

type ConsoleLogLevel = "log" | "warn" | "error";
type ConsoleLogArgs = (string | object | number | boolean)[];
type ConsoleLogItem = [
  ConsoleLogLevel,
  Date,
  string | undefined,
  ...ConsoleLogArgs,
];
let consoleLogs: ConsoleLogItem[] = [];
let consoleLogListener: null | ((items: ConsoleLogItem[]) => void) = null;
function addLog(level: ConsoleLogLevel, args: ConsoleLogArgs) {
  consoleLogs.push([
    level,
    new Date(),
    (new Error().stack ?? "").replace(/^Error\n/, ""),
    ...args,
  ]);
  if (consoleLogListener) {
    consoleLogListener(consoleLogs);
  }
}
window.console.log = function (...args) {
  addLog("log", args);
};

window.console.warn = function (...args) {
  addLog("warn", args);
};

window.console.error = function (...args) {
  addLog("error", args);
};

export function Console() {
  const [consoleLogsToRender, setConsoleLogsToRender] = React.useState<
    ConsoleLogItem[]
  >([]);
  React.useEffect(() => {
    consoleLogListener = setConsoleLogsToRender;
    return () => {
      consoleLogListener = null;
    };
  }, []);

  return (
    <div className="console">
      <details>
        <summary>Console ({consoleLogsToRender.length})</summary>
        {consoleLogsToRender.map(([level, timestamp, stack, ...args], i) => (
          <div key={i} className={level}>
            {level} {timestamp.toLocaleTimeString()}{" "}
            {args.map((arg, i) =>
              typeof arg === "string" ? arg : safeJsonStringify(arg, null, 2)
            )}
            <details>
              <summary>@</summary>
              <pre>{stack}</pre>
            </details>
          </div>
        ))}
      </details>
    </div>
  );
}
