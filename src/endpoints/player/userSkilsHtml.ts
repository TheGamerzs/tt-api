import { TransportTycoon } from "../..";
import { Players } from "../../models/Players";

export async function userSkillsHtml(this: TransportTycoon, userId: string) {
  userId = await this.resolveUserId(userId);
  try {
    const res = await this.tycoon.get(`/skills/${userId}`);
    return Promise.resolve<Players>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
