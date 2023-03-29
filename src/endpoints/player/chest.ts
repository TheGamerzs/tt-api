import { TransportTycoon } from "../..";
import { Chest } from "../../models/Chest";

export async function chest(this: TransportTycoon, searchId: string) {
  try {
    if (this.charges.checking && this.charges.count > 0) this.charges.count--;
    const res = await this.tycoon.get(`/chest/${searchId}`);
    return Promise.resolve<Chest>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
