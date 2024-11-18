import axios from "axios";

const local_address = "http://localhost:8000";

const web = axios.create({
  baseURL: local_address,
  withCredentials: true,
});

const api = axios.create({
  baseURL: local_address + "/api",
  withCredentials: true,
});

export { web, api, local_address };
