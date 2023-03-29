import { TransportTycoon } from "../..";
import { UserRace } from "../../models/UserRace";

export async function userRaces(this: TransportTycoon, userId: string) {
  userId = await this.resolveUserId(userId);
  try {
    const res = await this.tycoon.get(`/racing/races/${userId}`);
    return Promise.resolve<UserRace[]>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
