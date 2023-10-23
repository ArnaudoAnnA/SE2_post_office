

const apiurl = 'http://localhost:3000/API/';

async function get_assigned_clients() {
  const response = await fetch(apiurl + "get_assigned_clients");
  const data = await response.json();
  if (response.ok) {
    const { clientNumber, serviceType, counterID } = data;

    if (Array.isArray(data)) {
      const rows = data.map((e) => ({
        clientNumber: e.clientNumber,
        serviceType: e.serviceType,
        counterID: e.counterID
    
      }));

      return rows;
    } else {
      throw new Error("ERROR IN THE RESPONSE!");
    }
  } else {
    throw data;
  }
}

 

  
  const API = {get_assigned_clients};
  export default API;  