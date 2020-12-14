import axios from "axios";

export async function loadCarsConfig() {
  const { data } = await axios.get("data/carsConfig.json");
  return data;
}

export function loadConfigByMeta(meta) {
  return axios.get(meta.path);
}
