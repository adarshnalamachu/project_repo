import { apiClient, backendurl } from "./apiClient";
import headers from "./headers";

const aep = backendurl + "/project";

export const projects = {
  getProject: async () => {
    return await apiClient.get(aep + "/getProject", {
      headers,
    });
  },

  addProject: async (addproject) => {
    return await apiClient.post(aep + "/addProject", addproject, { headers });
  },

  getProjectByName: async (projectName) => {
    return await apiClient.get(aep + "/getProject", {
      headers,
      params: { projectName: projectName },
    });
  },

 

  deleteProject: async (projectName) => {
    return await apiClient.delete(aep + "/deleteProject", {
      headers,
      params: { projectName: projectName },
    });
  },

  editProject: async (editpobj) => {
    return await apiClient.put(aep + "/editProject" ,editpobj, {
      headers
    });
  },


  addFolder: async (addfobj) => {
    return await apiClient.post(aep + "/addProjectFolder",addfobj, {
      headers
    });
  },

  deleteFolder: async (projectName,folderName) => {
    return await apiClient.delete(aep + "/deleteFolder", {
      headers,
      params: { projectName: projectName , folderName :folderName },
    });
  },

  editFolder : async (newFolderName,oldFolderName,projectName) =>{
    return await apiClient.put(aep + "/editFolder" , {}, {    
      headers, 
      params : { newFolderName: newFolderName ,oldFolderName : oldFolderName,projectName : projectName  }
    })
  },

  addDocuments: async (adddoc) =>{
    return await apiClient.post(aep + "/addDocuments",adddoc,{
      headers
    })
  }


};


