import { TransportTycoon } from "../..";
import { DeadliestCatch } from "../../models/DeadliestCatch";

export async function deadliestCatch(
  this: TransportTycoon,
  publicKey: string = ""
) {
  try {
    const res = await this.tycoon.get(`/deadliest_catch.json`, {
      headers: {
        ...(publicKey && { "X-Tycoon-Public-Key": publicKey }),
      },
    });
    return Promise.resolve<DeadliestCatch>(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
