import React from "react";
export function ErrorLog() {
  const [errorLog, setErrorLog] = React.useState<Error[]>([]);

  React.useEffect(() => {
    window.addEventListener("error", (e) => {
      setErrorLog((prev) => [...prev, e.error]);
    });
  }, []);

  const clearErrorLog = React.useCallback(() => {
    setErrorLog([]);
  }, []);

  if (errorLog.length === 0) {
    return null;
  }

  return (
    <div className="redbox">
      <h1>Error Log</h1>
      <button onClick={clearErrorLog}>Clear</button>
      {errorLog.map((error, i) => (
        <details key={i}>
          <summary>
            {i + 1}: {error.toString()}
          </summary>
          <pre>{error.stack}</pre>
        </details>
      ))}
    </div>
  );
}
