import { TransportTycoon } from "../..";
import { Streak } from "../../models/Streak";

export async function userStreak(this: TransportTycoon, userId: string) {
  userId = await this.resolveUserId(userId);
  try {
    const res = await this.tycoon.get(`/streak/${userId}`);
    return Promise.resolve<Streak>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
