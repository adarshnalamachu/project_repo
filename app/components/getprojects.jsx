export const getProjectByName = async () => {
    console.log(name)
    
    const res = await projects.getProjectByName(name);
  
    try { 
        setPdata(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data?.errors[0].errorMessage);
      } else {
        setError("Adding Failed");
      }
    }
  };