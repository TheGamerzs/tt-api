import { TransportTycoon } from "../..";
import { UserData } from "../../models/UserData";

export async function userDataAdvanced(this: TransportTycoon, userId: string) {
  userId = await this.resolveUserId(userId);
  try {
    const res = await this.tycoon.get(`/dataadv/${userId}`);
    return Promise.resolve<UserData>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
