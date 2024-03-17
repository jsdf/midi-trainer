import * as React from "react";
import "./Exercise.css";
import Autocomplete from "@mui/joy/Autocomplete";
import ScaleType from "@tonaljs/scale-type";
import * as Scale from "@tonaljs/scale";
import { KeyParam, ScaleParam } from "./AppState";
import { useParam } from "./QueryParamContext";
import PianoKeyboard from "./PianoKeyboard";
import { InstrumentContext } from "./Instrument";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function ParamSelector(props: {
  param: {
    Context: React.Context<{
      value: string;
      setValue: (value: string) => void;
    }>;
  };
  options: string[];
}) {
  const { value: key, setValue: setKey } = React.useContext(
    props.param.Context
  );
  return (
    <Autocomplete
      options={props.options}
      getOptionLabel={(option) => option}
      value={key}
      onChange={(_, value) => {
        if (value == null) {
          return;
        }
        setKey(value);
      }}
    />
  );
}

export default function Exercise() {
  const [key] = useParam(KeyParam);
  const [scale] = useParam(ScaleParam);
  const Instrument = React.useContext(InstrumentContext);

  const scaleDef = Scale.scale(`${key} ${scale}`);
  const scalePitchClasses = scaleDef.notes;
  return (
    <>
      <ParamSelector param={KeyParam} options={keys} />
      <ParamSelector param={ScaleParam} options={ScaleType.names()} />

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
