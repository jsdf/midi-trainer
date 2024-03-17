import "./styles.css";
import Button from "@mui/joy/Button";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InstrumentProvider, InstrumentContext } from "./Instrument";
import safeJsonStringify from "safe-json-stringify";

import toneInit from "./toneInit";

import Exercise from "./Exercise";
import { Console } from "./ConsoleShim";
import { ErrorLog } from "./ErrorLog";
import { AppStateProvider, KeyParam, ScaleParam } from "./AppState";
import { useParam } from "./QueryParamContext";

// function PlaySound() {
//   const synth = React.useContext(InstrumentContext);

//   const playNote = React.useCallback(() => {
//     toneInit();
//     synth?.triggerAttackRelease("C4", "8n");
//     console.log("tessst");
//   }, [synth]);
//   return (
//     <Button variant="solid" onClick={playNote}>
//       Play Note
//     </Button>
//   );
// }

const AppContent = React.memo(function AppContent() {
  const [key] = useParam(KeyParam);
  const [scale] = useParam(ScaleParam);

  const state = React.useMemo(() => {
    return {
      key,
      scale,
    };
  }, [key, scale]);

  return (
    <>
      <div className="App">
        <InstrumentProvider>
          <Exercise />
        </InstrumentProvider>
      </div>
      <details>
        <summary>State</summary>
        <pre>{safeJsonStringify(state, null, 2)}</pre>
      </details>
    </>
  );
});

export default function App() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <pre className="redbox">
            {error.toString()}
            {"\n"}
            {error.stack}
          </pre>
        )}
      >
        <AppStateProvider>
          <AppContent />
        </AppStateProvider>
      </ErrorBoundary>

      <ErrorLog />
      <Console />
      <p>loaded @ {new Date().toLocaleTimeString()}</p>
    </>
  );
}
