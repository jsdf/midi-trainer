import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "@fontsource/inter";

declare global {
  const DEV: boolean;
}

if (DEV) {
  const eventSource = new EventSource("/esbuild");
  eventSource.addEventListener("change", () => {
    console.log("Reloading...");
    location.reload();
  });
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
