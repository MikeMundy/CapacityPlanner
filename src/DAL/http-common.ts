// see https://www.bezkoder.com/react-typescript-axios/#Initialize_Axios

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});

