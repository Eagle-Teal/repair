import axios from "axios"
const JWTaxios = axios.create({
    baseURL: "https://eagletealapi.adaptable.app/api",
    headers: {
      "Content-Type": "application/json",
    },withCredentials:true});
export default JWTaxios