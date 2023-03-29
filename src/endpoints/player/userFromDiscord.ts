import { TransportTycoon } from "../..";
import { Snowflake } from "../../models/General";

export async function userFromDiscord(
  this: TransportTycoon,
  discordId: string
) {
  try {
    const res = await this.tycoon.get(`/snowflake2user/${discordId}`);
    return Promise.resolve<Snowflake>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
