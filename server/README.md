## Procedure to make tests:
1. start the server by launching: <i>node index.js</i>

2. make sure to have "REST client" extension for Visual Studio installed;

3. open the file "tests.http" in Visual Studio;

4. click on the links, which appears underlined, to send the corresponding request to the server.


## APIs

#### MARKING A CLIENT AS SERVED
validate clientNumber >> Look for that client in the db >> Remove from queue and add it to statistics 
#### Protected API: only authenticated counters can make this request
- PUT `/API/client_served`
  - Request body: 
    ```json
    {
      "ClientNumber": 3
    }
    ```
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error), `400 Bad request` (invalid argument), `404 Not Found` (not present or unavailable)

#### GET NEXT CLIENT FROM THE QUEUE FOR SERVICE_i
validate counterID >> look for the first client on the longest queue associated with service type that the counter can hanle
#### Protected API: only authenticated counters can make this request (TO DO)
- GET `/API/next_client`
  - Request body: 
    ```json
    {
      "CounterID": 3
    }
    ```
  - Response: `200 OK` (success)
  - Response body: 
  ```json
    {
      "ClientNumber": 3
    }
    ```
    The value of ClientNumber will be -1 in case of empty queue.
  - Error responses: `500 Internal Server Error` (generic error), `400 Bad request` (invalid argument), `404 Not Found` (not present or unavailable)

#### GET ASSIGNED CLIENTS

Get all the clients that are assigned to a counter

- GET `/API/get_assigned_clients`
  - Response: `200 OK` (success)
  - Response body:
  ```json
    {
      "clients": [
        {
          "clientNumber": 3,
          "serviceType": "Shipping",
          "counterID": 3
        },
        {
          "clientNumber": 4,
          "serviceType": "Bills",
          "counterID": 1
        }
      ]
    }
    ```
  - Error responses: `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)
