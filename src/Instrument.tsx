import { Synth, Sampler } from "tone";
import * as React from "react";

import dexedEPianoA2 from "./dexed-epiano-A2.m4a";
import dexedEPianoC2 from "./dexed-epiano-C2.m4a";
import dexedEPianoDs2 from "./dexed-epiano-Ds2.m4a";
import dexedEPianoFs2 from "./dexed-epiano-Fs2.m4a";

export interface ToneInstrument {
  toDestination(): this;
  dispose(): void;
  triggerAttackRelease(note: string, duration: string): void;
  triggerAttack(note: string): void;
  triggerRelease(note: string): void;
}

const InstrumentContext = React.createContext<ToneInstrument | null>(null);

function makeSampler(): ToneInstrument {
  return new Sampler(
    {
      C3: dexedEPianoC2,
      "D#3": dexedEPianoDs2,
      "F#3": dexedEPianoFs2,
      A3: dexedEPianoA2,
    },
    function () {
      console.log("samples loaded");
    }
  ).toDestination();
}

function InstrumentProvider({ children }: { children: React.ReactNode }) {
  const [synth, _] = React.useState<ToneInstrument>(
    () => makeSampler() ?? new Synth().toDestination()
  );

  return (
    <InstrumentContext.Provider value={synth}>
      {children}
    </InstrumentContext.Provider>
  );
}

export { InstrumentProvider, InstrumentContext };
