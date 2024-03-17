import {
  createQueryParamContext,
  QUERY_PARAM_FORMATS,
} from "./QueryParamContext";

import React from "react";

export const KeyParam = createQueryParamContext(
  "key",
  "C",
  QUERY_PARAM_FORMATS.string
);

export const ScaleParam = createQueryParamContext(
  "scale",
  "major",
  QUERY_PARAM_FORMATS.string
);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  return (
    <KeyParam.Provider>
      <ScaleParam.Provider>{children}</ScaleParam.Provider>
    </KeyParam.Provider>
  );
}
