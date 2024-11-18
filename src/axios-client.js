import origAxios from "axios";


const axios = origAxios.create({
  baseUrl: `http://localhost:8000/api/`,
  withCredentials: true,
});

export { axios };
