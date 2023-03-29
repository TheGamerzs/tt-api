import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getPIGSHeist } from "./endpoints/company/getPIGSHeist";
import { getUsersGroundDeliveryVehicles } from "./endpoints/company/getUsersGroundDeliveryVehicles";
import { factionBalance } from "./endpoints/faction/balance";
import { factionInfo } from "./endpoints/faction/Info";
import { factionMembers } from "./endpoints/faction/members";
import { factionPerks } from "./endpoints/faction/perks";
import { factionSize } from "./endpoints/faction/size";
import { itemInfo } from "./endpoints/general/itemInfo";
import { racingMap } from "./endpoints/general/racingMap";
import { racingTracks } from "./endpoints/general/racingTracks";
import { skillRotation } from "./endpoints/general/skillRotation";
import { top10 } from "./endpoints/general/top10";
import { chest } from "./endpoints/player/chest";
import { chestAdvanced } from "./endpoints/player/chestAdvanced";
import { deadliestCatch } from "./endpoints/player/deadliestCatch";
import { userBusinesses } from "./endpoints/player/userBusinesses";
import { userData } from "./endpoints/player/userData";
import { userDataAdvanced } from "./endpoints/player/userDataAdvanced";
import { userFromDiscord } from "./endpoints/player/userFromDiscord";
import { userOwnedVehicles } from "./endpoints/player/userOwnedVehicles";
import { userRaces } from "./endpoints/player/userRaces";
import { userStreak } from "./endpoints/player/userStreak";
import { activeAirlineRoutes } from "./endpoints/server/activeAirlinesRoutes";
import { advancedUserlist } from "./endpoints/server/advancedUserlist";
import { coastGuard } from "./endpoints/server/coastGuard";
import { currentWeather } from "./endpoints/server/currentWeather";
import { economyInfo } from "./endpoints/server/economyInfo";
import { playerPositions } from "./endpoints/server/playerPositions";
import { players } from "./endpoints/server/players";
import { playersWidget } from "./endpoints/server/playersWidget";
import { resourceConfig } from "./endpoints/server/resourceConfig";
import { userInventoryHtml } from "./endpoints/player/userInventoryHtml";
import { userSkillsHtml } from "./endpoints/player/userSkilsHtml";
import { resolveUserId } from "./util/resolveUserId";
import { setupCharges } from "./util/setupCharges";

export const tycoonServers: string[] = [
  "v1.api.tycoon.community/main",
  "v1.api.tycoon.community/beta",
];

export const statNames: string[] = [
  "firefighter_streak_record",
  "omni_void_leaderboard",
  "ems_streak_record",
  "ems_deliveries",
  "houses_crafted",
  "toll_paid",
  "trap_paid",
  "drops_collected",
  "quarry_excavate",
  "quarry_coop",
  "quarry_deliver",
  "quarry_solo",
  "vehicles_crafted",
  "eastereggs_pickup",
  "maid_maxscans",
  "maid_tickets",
];

export class TransportTycoon {
  token: string;

  charges = {
    checking: false,
    count: 0,
    loaded: false,
  };

  tycoon: AxiosInstance;

  settings = {
    serverIndex: 0,
    maxRetries: 10,
    curRetries: 0,
  };

  public constructor(
    apiToken = "",
    trackCharges = false,
    timeout = 5000,
    maxRetries = 10,
    dontRetry = false
  ) {
    this.token = apiToken;
    this.charges.checking = trackCharges;
    this.settings.maxRetries = maxRetries;

    this.tycoon = axios.create({
      baseURL: `http://${tycoonServers[0]}`,
      timeout,
    });

    if (apiToken) this.tycoon.defaults.headers["X-Tycoon-Key"] = apiToken;

    this.tycoon.interceptors.response.use(
      (response: AxiosResponse) => {
        this.settings.curRetries = 0;
        if (this.charges.checking && response.headers["x-tycoon-charges"])
          this.charges.count = parseInt(
            response.headers["x-tycoon-charges"],
            10
          );
        return Promise.resolve(response);
      },
      async (error: AxiosError) => {
        if (error.response?.status === 402) {
          return Promise.reject({
            msg: "[TransportTycoon] You are out of API charges!",
            code: "no_charges",
          });
        } else if (error.response?.status === 401) {
          return Promise.reject({
            msg: "[TransportTycoon] A key is required for this endpoint",
            code: "key_protected",
          });
        } else if (error.response?.status === 403) {
          return Promise.reject({
            msg: "[TransportTycoon] Invalid key given",
            code: "invalid_key",
          });
        } else if (error.response?.status === 404) {
          return Promise.reject({
            msg: `[TransportTycoon] Invalid API route - ${error.config?.url}`,
            code: "invalid_api",
          });
        }

        if (dontRetry) return Promise.reject(error);
        if (
          (error?.code === "ECONNABORTED" ||
            error?.code === "ECONNRESET" ||
            error?.response?.status === 502) &&
          error?.config
        ) {
          if (
            error?.code === "ECONNRESET" &&
            error?.config?.url?.includes("http://")
          )
            return Promise.reject(error);
          this.settings.serverIndex++;
          if (this.settings.serverIndex > tycoonServers.length - 1)
            this.settings.serverIndex = 0;
          this.tycoon.defaults.baseURL = `http://${
            tycoonServers[this.settings.serverIndex]
          }`;
          this.settings.curRetries++;
          if (this.settings.curRetries > this.settings.maxRetries) {
            this.settings.curRetries = 0;
            return Promise.reject({
              msg: `[TransportTycoon] Retry count of ${this.settings.maxRetries} exceeded`,
              code: "max_retries",
              error,
            });
          }
          try {
            await this.tycoon.get("/alive");
            error.config.baseURL = this.tycoon.defaults.baseURL;
            return axios.request(error.config);
            // eslint-disable-next-line no-empty
          } catch (err) {}
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  setupCharges = setupCharges.bind(this);

  resolveUserId = resolveUserId.bind(this);

  //Register endpoints

  //Server
  getActiveAirlineRoutes = activeAirlineRoutes.bind(this);
  getAdvancedUserlist = advancedUserlist.bind(this);
  getCoastGuard = coastGuard.bind(this);
  getCurrentWeather = currentWeather.bind(this);
  getEconomyInfo = economyInfo.bind(this);
  getPlayerPositions = playerPositions.bind(this);
  getPlayers = players.bind(this);
  getPlayersWidget = playersWidget.bind(this);
  getResourceConfig = resourceConfig.bind(this);

  //Player
  getChest = chest.bind(this);
  getChestAdvanced = chestAdvanced.bind(this);
  getDeadliestCatch = deadliestCatch.bind(this);
  getUserBusinesses = userBusinesses.bind(this);
  getUserData = userData.bind(this);
  getUserDataAdvanced = userDataAdvanced.bind(this);
  getUserFromDiscord = userFromDiscord.bind(this);
  getUserInventoryHtml = userInventoryHtml.bind(this);
  getUserOwnedVehicles = userOwnedVehicles.bind(this);
  getUserRaces = userRaces.bind(this);
  getUserSkillHtml = userSkillsHtml.bind(this);
  getUserStreak = userStreak.bind(this);

  //Faction
  getFactionBalance = factionBalance.bind(this);
  getFactionInfo = factionInfo.bind(this);
  getFactionMembers = factionMembers.bind(this);
  getFactionPerks = factionPerks.bind(this);
  getFactionSize = factionSize.bind(this);

  //General
  getTop10 = top10.bind(this);
  getSkillRotation = skillRotation.bind(this);
  getItemInfo = itemInfo.bind(this);
  getRacingTracks = racingTracks.bind(this);
  getRacingMap = racingMap.bind(this);

  //Company
  getUsersGroundDeliveryVehicles = getUsersGroundDeliveryVehicles.bind(this);
  getPIGSHeist = getPIGSHeist.bind(this);
}
