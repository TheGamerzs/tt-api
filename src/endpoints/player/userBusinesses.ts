import { TransportTycoon } from "../..";
import { Business } from "../../models/Business";

export async function userBusinesses(this: TransportTycoon, userId: string) {
  userId = await this.resolveUserId(userId);
  try {
    const res = await this.tycoon.get(`/getuserbiz/${userId}`);
    return Promise.resolve<Business>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
