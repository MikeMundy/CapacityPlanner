// see https://www.bezkoder.com/react-typescript-axios/#Initialize_Axios

import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api/",
  baseURL: "https://capcity-planner-app.azurewebsites.net/api/",
  headers: {
    "Content-type": "application/json"
  }
});

