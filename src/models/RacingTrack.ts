export interface RacingTrack {
  type: string;
  name: string;
  length: number;
  wr: {
    name: string;
    date: number;
    time: number;
    vehicle: string;
  };
  class: string;
  id: string;
}
