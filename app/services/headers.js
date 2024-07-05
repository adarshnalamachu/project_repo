const token = typeof window !== "undefined" && localStorage.getItem("token");
const headers = { "Accept-Language": "en", "Authorization": `Bearer ${token}`, accept : "*/*", "Content-Type" : "application/json" };
 
export default headers; 
