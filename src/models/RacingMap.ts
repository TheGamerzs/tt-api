import { Vector3 } from "./General";

interface checkpoint extends Vector3 {
  h: number;
  blip: number;
}

export interface RacingMap {
  finish: checkpoint;
  checkpoints: checkpoint[];
}
