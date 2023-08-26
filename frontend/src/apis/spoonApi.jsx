import axios from "axios";

const spoonApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});

export default spoonApi;
