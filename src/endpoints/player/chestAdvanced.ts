import { TransportTycoon } from "../..";
import { Chest } from "../../models/Chest";

export async function chestAdvanced(this: TransportTycoon, searchId: string) {
  try {
    const res = await this.tycoon.get(`/chestadv/${searchId}`);
    return Promise.resolve<Chest>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
