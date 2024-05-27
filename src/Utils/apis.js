import { BASE_CALL } from "./baseCall";

export const API_CONTROLER = {
  dashboard: { stats: payload => BASE_CALL.get("/dashboard/stats", payload) },
  txs: { txs: payload => BASE_CALL.get("/txs/txs", payload) },
  table: { get: payload => BASE_CALL.get("/table/get", payload) }
};
