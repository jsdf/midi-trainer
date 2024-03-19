import React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import "./ParamSelector.css";

export default function ParamSelector(props: {
  label: string;
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
    <label className="ParamSelector__label">
      {props.label}:
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
    </label>
  );
}
