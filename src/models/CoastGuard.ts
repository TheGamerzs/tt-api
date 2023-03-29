import { Vector3 } from "./General";

interface player {
  source: number;
  name: string;
  user_id: number;
}

export interface CoastGuard {
  callout: {
    active: boolean;
    position: Vector3;
    finish: number;
    location: Vector3 & {
      h: number;
      fleet_max: number;
      range: number;
      type: string;
      fleet_size: number;
      id: number;
      name: string;
    };
    type: {
      loadout: string[];
      vehicles: string[];
    };
    hasZoneBeenReached: boolean;
    numplayers: number;
    hasFinishedBeenReached: boolean;
    start: number;
    stranded_left: number;
    stranded: number;
    vehicle: string;
  };
  party: player[];
  players: {
    [id: string]: {
      tasks: number;
      pickups: number;
      gotZone: boolean;
      targets_found: number;
      deliveries: number;
      gotVehicle: boolean;
      points: number;
      vehicle: "BOAT" | "TRUCK" | "NONE";
    };
  };
}
