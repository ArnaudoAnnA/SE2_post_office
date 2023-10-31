const apiurl = 'http://localhost:3000/API/';

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> }
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {

        if (response.ok) {
         // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
         response.json()
            .then( json => resolve(json) )
            .catch( err => reject({ error: "Cannot parse server response" }))
        } else {
          // analyzing the cause of error
          response.json()
            .then(obj => 
              reject(obj)
              ) // error msg in the response body
            .catch(err => reject({ error: "Cannot parse server response" }))
        }

      })
      .catch(err => 
        reject({ error: "Cannot communicate"  })
      ) // connection error
  });
}


/**
 * This function move the client from the queue to the statistics table
 */
function clientServed(clientNumber) {
  return getJson(
    fetch(apiurl + 'client_served', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      //credentials: 'include',
      body: JSON.stringify({ClientNumber: clientNumber})
    })
  )
};


/**
 * Getting and returning the client number and the service name.
 */
const nextClient = async (counterID) => {
  return getJson(
    fetch(apiurl + 'next_client/' + counterID, {
      headers: {
        'Content-Type': 'application/json',
      }
      //credentials: 'include',
    })).then(json => { 
      const user = {clientNumber: json.ClientNumber, serviceName: json.ServiceName};
      return user;})
};

/**
 * Getting and returning the client number and the service name.
 */
const getClientAndServiceAssignedToCounter = async (counterID) => {
  return getJson(
    fetch(apiurl + 'get_client_and_service_assigned_to_counter/' + counterID, {
      headers: {
        'Content-Type': 'application/json',
      }
      //credentials: 'include',
    })).then(json => { 
      const user = {clientNumber: json.ClientNumber, serviceName: json.ServiceName};
      return user;})
};


const API = { clientServed, nextClient, getClientAndServiceAssignedToCounter };
export default API;