import { TransportTycoon } from "../..";
import { OwnedVehicles } from "../../models/OwnedVehicles";

export async function userOwnedVehicles(this: TransportTycoon, userId: string) {
  userId = await this.resolveUserId(userId);
  try {
    const res = await this.tycoon.get(`/ownedvehicles/${userId}`);
    return Promise.resolve<OwnedVehicles>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
