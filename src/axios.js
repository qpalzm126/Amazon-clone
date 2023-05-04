import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-6cf47.cloudfunctions.net/api", //The API (cloud function) URL
  // "http://localhost:5001/clone-6cf47/us-central1/api",（emulator url）
});

export default instance;
