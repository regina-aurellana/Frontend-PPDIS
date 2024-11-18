import { api } from "../../../utilities/axios-gateway";

//GET REQUEST - Fetch Data of all Dupa
export async function fetchDupa() {
  const response = await api("/dupa");
  return response.json();
}

//GET REQUEST - Fetch Data of all Measurement
export async function fetchMeasurement() {
  const response = await api("/measurement");
  return response.json();
}

//GET REQUEST - Fetch Data of all B3TeamProject
export async function fetchB3Proj() {
  const response = await api("/project");
  return response.json();
}
