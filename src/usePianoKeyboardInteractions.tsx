import React from "react";
import { ToneInstrument } from "./Instrument";

export default function useKeyboardInteractions({
  notePlayer,
}: {
  notePlayer: ToneInstrument;
}) {
  const [pressedKeys, setPressedKeys] = React.useState(() => new Set());

  const pressedKeysRef = React.useRef(new Set());

  const pressedKeysAPI = React.useMemo(() => {
    return {
      setKeyPressed(noteName: string) {
        const prev = pressedKeysRef.current;

        if (!prev.has(noteName)) {
          notePlayer.triggerAttack(noteName);
          const updated = new Set(prev).add(noteName);
          pressedKeysRef.current = updated;
          setPressedKeys(updated);
        }
      },
      setKeyReleased(noteName: string) {
        const prev = pressedKeysRef.current;

        if (prev.has(noteName)) {
          const updated = new Set(prev);
          updated.delete(noteName);
          pressedKeysRef.current = updated;
          setPressedKeys(updated);
          notePlayer.triggerRelease(noteName);
        }
      },
    };
  }, [setPressedKeys, notePlayer]);

  function makeHandlers(noteName: string) {
    return {
      onMouseOver: ((e) => {
        if (e.buttons > 0) {
          pressedKeysAPI.setKeyPressed(noteName);
        }
      }) as React.MouseEventHandler<HTMLElement>,
      onMouseDown: () => {
        pressedKeysAPI.setKeyPressed(noteName);
      },
      onMouseUp: () => {
        pressedKeysAPI.setKeyReleased(noteName);
      },
      onMouseOut: () => {
        pressedKeysAPI.setKeyReleased(noteName);
      },
    };
  }

  return { pressedKeys, pressedKeysAPI, makeHandlers };
}
