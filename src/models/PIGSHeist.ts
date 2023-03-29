interface PIGSPlayer {
  source: number;
  ready: boolean;
  cut: number;
}

export interface PIGSHeist {
  master: PIGSPlayer;
  take: number;
  slaves: PIGSPlayer[];
  kills: number;
  limit: number;
}
