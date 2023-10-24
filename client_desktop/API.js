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
      credentials: 'include',
      body: JSON.stringify(clientNumber)
    })
  )
}


/**
 * Getting and returing the client number.
 */
const nextClient = async (counterID) => {
  return getJson(fetch(apiurl + 'next_client', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(counterID)
  })).then (json => json.clientNumber)
};



const API = { clientServed, nextClient };
export default API;