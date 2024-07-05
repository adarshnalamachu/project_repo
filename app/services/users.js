import { apiClient, backendurl } from "./apiClient";

const aep = backendurl + "/profile";
 
export const users = {   
  login: async (loginobj) => {    
    return await apiClient.post(aep + "/login", loginobj);  
  }, 
} 