import { web } from "./axios-gateway";

const csrfCookie = () => web.get("/sanctum/csrf-cookie");

export default csrfCookie;
