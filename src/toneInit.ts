import { start as toneStart } from "tone";
let started = false;
export default function start() {
  if (!started) {
    started = true;
    toneStart();
  }
}
