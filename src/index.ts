import axios, { AxiosError, AxiosInstance } from 'axios';
import { PlayerPositions } from './models/PlayerPositions';
import { Players } from './models/Players';
import { PlayerWidget } from './models/PlayerWidget';
import { Snowflake } from './models/General';
import { Business } from './models/Business';
import { Faction } from './models/Faction';
import { UserData } from './models/UserData';
import { ActiveAirline } from './models/ActiveAirline';
import { Top10 } from './models/Stats';
import { Economy } from './models/Economy';

const tycoonServers: string[] = [
  'server.tycoon.community:30120',
  'server.tycoon.community:30122',
  'server.tycoon.community:30123',
  'server.tycoon.community:30124',
  'server.tycoon.community:30125',
  'na.tycoon.community:30120',
  'na.tycoon.community:30122',
  'na.tycoon.community:30123',
  'na.tycoon.community:30124',
  'na.tycoon.community:30125',
];

const statNames: string[] = [
  'firefighter_streak_record',
  'omni_void_leaderboard',
  'ems_streak_record',
  'houses_crafted',
  'toll_paid',
  'drops_collected',
  'quarry_excavate',
  'quarry_coop',
  'quarry_deliver',
  'quarry_solo'
];

export class TransportTycoon {
  private token: string;
  public charges = {
    checking: false,
    count: 0,
    loaded: false
  };
  private tycoon: AxiosInstance;
  public settings = {
    serverIndex: 0
  };

  public constructor(apiToken: string = '', trackCharges: boolean = false) {
    this.token = apiToken;
    this.charges.checking = trackCharges;

    this.tycoon = axios.create({
      baseURL: `http://${tycoonServers[0]}/status`,
      timeout: 10000
    });

    if (apiToken) this.tycoon.defaults.headers['X-Tycoon-Key'] = apiToken;

    this.tycoon.interceptors.response.use(undefined, async (error: AxiosError) => {
      if (error.response?.status === 402) {
        return Promise.reject({msg: '[TransportTycoon] You are out of API charges!', code: 'no_charges'});
      } else if (error.response?.status === 401) {
        return Promise.reject({msg: '[TransportTycoon] A key is required for this endpoint', code: 'key_protected'});
      } else if (error.response?.status === 403) {
        return Promise.reject({msg: '[TransportTycoon] Invalid key given', code: 'invalid_key'});
      } else if (error.response?.status === 403) {
        return Promise.reject({msg: `[TransportTycoon] Invalid API route - ${error.config.url}`, code: 'invalid_api'});
      }

      if (error.code === 'ECONNABORTED' && error.config) {
        this.settings.serverIndex++;
        if (this.settings.serverIndex > tycoonServers.length - 1) this.settings.serverIndex = 0;
        await this.tycoon.get(`http://${tycoonServers[this.settings.serverIndex]}/status/alive`);
        return axios.request(error.config);
      }

      return Promise.reject(error);
    });
  }

  public async setupCharges() {
    if (this.charges.checking && this.token) {
      const charges = await this.tycoon.get('/charges.json');
      if (charges.data[0] === 0) return Promise.reject({msg: '[TransportTycoon] Charges returned 0. Is your key valid & does it have charges?', code: 'no_charges'});
      this.charges.count = charges.data[0];
      this.charges.loaded = true;
      return Promise.resolve(charges.data[0]);
    } else return Promise.resolve(false);
  }

  public getCharges() {
    return this.charges.count;
  }

  public async getActiveAirlineRoutes(server: number = 0) {
    if (server - 1 > tycoonServers.length) return Promise.reject('Please enter a valid server id from 0 - 9.');
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`http://${tycoonServers[server]}/status/airline.json`);
      return Promise.resolve<ActiveAirline>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getPlayerPositions(server: number = 0) {
    if (server - 1 > tycoonServers.length) return Promise.reject('Please enter a valid server id from 0 - 9.');
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`http://${tycoonServers[server]}/status/map/positions.json`);
      return Promise.resolve<PlayerPositions>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getPlayers(server: number = 0) {
    if (server - 1 > tycoonServers.length) return Promise.reject('Please enter a valid server id from 0 - 9.');
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`http://${tycoonServers[server]}/status/players.json`);
      return Promise.resolve<Players>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getPlayersWidget(server: number = 0) {
    if (server - 1 > tycoonServers.length) return Promise.reject('Please enter a valid server id from 0 - 9.');
    try {
      const res = await this.tycoon.get(`http://${tycoonServers[server]}/status/widget/players.json`);
      return Promise.resolve<PlayerWidget>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserFromDiscord(discordId: string) {
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/snowflake2user/${discordId}`);
      return Promise.resolve<Snowflake>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserInventoryHtml(userId: string) {
    if (userId.length === 18) userId = (await this.getUserFromDiscord(userId)).user_id.toString();
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/inventory/${userId}`);
      return Promise.resolve<Players>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserBusinesses(userId: string) {
    if (userId.length === 18) userId = (await this.getUserFromDiscord(userId)).user_id.toString();
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/getuserbiz/${userId}`);
      return Promise.resolve<Business>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserFaction(userId: string) {
    if (userId.length === 18) userId = (await this.getUserFromDiscord(userId)).user_id.toString();
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/getuserfaq/${userId}`);
      return Promise.resolve<Faction>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserData(userId: string) {
    if (userId.length === 18) userId = (await this.getUserFromDiscord(userId)).user_id.toString();
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/data/${userId}`);
      return Promise.resolve<UserData>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getUserDataAdvanced(userId: string) {
    if (userId.length === 18) userId = (await this.getUserFromDiscord(userId)).user_id.toString();
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/dataadv/${userId}`);
      return Promise.resolve<UserData>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getTop10(statName: string) {
    if (!statNames.includes(statName)) return Promise.reject('Stat name invalid. List of valid stats: ' + statNames.join(', '));
    try {
      if (this.charges.checking && this.charges.count > 0) this.charges.count--;
      const res = await this.tycoon.get(`/top10/${statName}`);
      return Promise.resolve<Top10>(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getResourceConfig(resourceName: string) {
    try {
      const res = await this.tycoon.get(`/config/${resourceName}`);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getAdvancedUserlist(server: number = 0) {
    if (server - 1 > tycoonServers.length) return Promise.reject('Please enter a valid server id from 0 - 9.');
    try {
      const res = await this.tycoon.get(`http://${tycoonServers[server]}/status/advanced/`);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async getEconomyInfo() {
    try {
      const res = await this.tycoon.get('/economy.csv');
      const economy = res.data.split('\n');
      economy.pop();
      const formattedData = economy.map((data: string|string[]) => {
        const splitData = (data as string).split(';');
        const cleanData = {
          time: new Date(parseInt(splitData[0], 10) * 1000),
          debt: splitData[1],
          money: splitData[2],
          debtCount: splitData[3],
          millionares: splitData[4],
          billionares: splitData[5]
        };
        return cleanData;
      });
      return Promise.resolve<Economy[]>(formattedData);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}