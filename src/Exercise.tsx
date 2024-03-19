import * as React from "react";
import "./Exercise.css";
import ParamSelector from "./ParamSelector";
import ScaleType from "@tonaljs/scale-type";
import * as Scale from "@tonaljs/scale";
import { KeyParam, ScaleParam } from "./AppState";
import { useParam } from "./QueryParamContext";
import PianoKeyboard from "./PianoKeyboard";
import { InstrumentContext } from "./Instrument";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function Exercise() {
  const [key] = useParam(KeyParam);
  const [scale] = useParam(ScaleParam);
  const Instrument = React.useContext(InstrumentContext);

  const scaleDef = Scale.scale(`${key} ${scale}`);
  const scalePitchClasses = scaleDef.notes;
  return (
    <>
      <div className="Exercise__controls">
        <ParamSelector label="Key" param={KeyParam} options={keys} />
        <ParamSelector
          label="Scale"
          param={ScaleParam}
          options={ScaleType.names()}
        />
      </div>

      <PianoKeyboard
        highlightKeys={[] as string[]}
        highlightScale={scalePitchClasses}
        startOctave={3}
        octaves={2}
        notePlayer={Instrument!}
      />
    </>
  );
}
