export interface UserData {
  user_id: number;
  data_type: string;
  code: string;
  data: Data;
}

interface Data {
  gaptitudes: Gaptitudes;
  thirst: number;
  licenses: Licenses;
  chat_title: string;
  health: number;
  AcceptingPlayerEms: boolean;
  position: Position;
  inventory: Inventory;
  vehicle: Vehicle;
  groups: Groups;
  hunger: number;
  ironman: boolean;
  customization: Customization;
  gaptitudes_v: Gaptitudesv;
}

interface Gaptitudesv {
  casino: Casino;
  business: Business;
  hunting: Hunting;
  ems: Ems;
  physical: Physical;
  farming: Farming2;
  piloting: Piloting;
  train: Train;
  player: Player;
  trucking: Trucking;
}

interface Farming2 {
  fishing: number;
  mining: number;
  farming: number;
}

interface Customization {
  '0': number[];
  '1': number[];
  '2': number[];
  '3': number[];
  '4': number[];
  '5': number[];
  '6': number[];
  '7': number[];
  '8': number[];
  '9': number[];
  '10': number[];
  '11': number[];
  '12': number[];
  '13': number[];
  '14': number[];
  '15': number[];
  '16': number[];
  '17': number[];
  '18': number[];
  '19': number[];
  '20': number[];
  h9: number[];
  h7: number[];
  h5: number[];
  p7: number[];
  p5: number[];
  h3: number[];
  h10: number[];
  p10: number[];
  h6: number[];
  h4: number[];
  p1: number[];
  p0: number[];
  p3: number[];
  p2: number[];
  p4: number[];
  h0: number[];
  p6: number[];
  h2: number[];
  h12: number[];
  modelhash: number;
  p8: number[];
  p9: number[];
  h11: number[];
  h8: number[];
  h1: number[];
}

interface Groups {
  [group: string]: boolean;
}

interface Vehicle {
  has_trailer: boolean;
  vehicle_model: number;
  vehicle_label: string;
  vehicle_type: string;
  owned_vehicles: any[];
  vehicle_class: number;
  vehicle_name: string;
  vehicle_spawn: string;
  trailer: string;
}

interface Inventory {
  [item: string]: {
    amount: number
  };
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Licenses {
  corp_cooldown: number;
  exp_week: number;
  patreon_premium: number;
  commerce_transfer: number;
  beta_p2w: number;
  nofood_p2w: number;
  transfer: number;
  premium_p2w: number;
  discord_voice: number;
  patreon_transfer: number;
  notrap_p2w: number;
  helicopter: number;
  muted_suggestions: number;
  exp_ee: number;
  police: number;
  muted_2d: number;
  premium2: number;
  muted_week: number;
  firearm: number;
  patreon_beta: number;
  nofuel_p2w: number;
  exp_day: number;
  driver: number;
  premium: number;
  commerce_beta: number;
  faq_bonus_exp_15: number;
  transfer_p2w: number;
  premium3: number;
  commerce_premium: number;
  plane: number;
  notoll_p2w: number;
  muted_perm: number;
  freefuel_p2w: number;
  faq_bonus_exp_5: number;
  pristine: number;
  exp_15: number;
}

interface Gaptitudes {
  police: Police;
  casino: Casino;
  business: Business;
  hunting: Hunting;
  train: Train;
  physical: Physical;
  farming: Farming;
  piloting: Piloting;
  player: Player;
  ems: Ems;
  trucking: Trucking;
}

interface Trucking {
  trucking: number;
  garbage: number;
  mechanic: number;
  postop: number;
}

interface Ems {
  ems: number;
  fire: number;
}

interface Player {
  racing: number;
  player: number;
}

interface Piloting {
  piloting: number;
  cargos: number;
  heli: number;
}

interface Farming {
  fishing: number;
  mining: number;
  animals: number;
  farming: number;
}

interface Physical {
  strength: number;
}

interface Train {
  bus: number;
  train: number;
}

interface Hunting {
  skill: number;
}

interface Business {
  business: number;
}

interface Casino {
  casino: number;
}

interface Police {
  police: number;
}