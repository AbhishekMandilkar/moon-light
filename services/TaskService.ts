import axios from "axios";

export const getTasks = async () => {
  return await axios.get(`/api/tasks`);
};