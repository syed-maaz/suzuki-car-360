import axios from "axios";

export function loadConfig() {
  return axios.get("data/config.json");
}
