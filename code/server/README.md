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
validate counterID >> look for the first client on the longest queue associated with service type that the counter can handle
#### Protected API: only authenticated counters can make this request (TO DO)
- GET `/API/next_client/:counterID`
  - Response: `200 OK` (success)
  - Response body: 
  ```json
    {
      "ClientNumber": 3,
      "ServiceName": "Shipping"
    }
    ```
    In case of empty queue, the value of ClientNumber will be -1 and the ServiceName will be the empty string.
  - Error responses: `500 Internal Server Error` (generic error), `400 Bad request` (invalid argument), `404 Not Found` (not present or unavailable)

#### GET CLIENT_ID AND SERVICE_NAME ASSIGNED TO A COUNTER
validate counterID >> look for, if exists, the client (and relative service) assigned to the counter and the service name for which he was waiting
#### Protected API: only authenticated counters can make this request (TO DO)
- GET `/API/get_client_and_service_assigned_to_counter/:counterID`
  - Response: `200 OK` (success)
  - Response body: 
  ```json
    {
      "ClientNumber": 3,
      "ServiceName": "Shipping"
    }
    ```
    If the counter is free, the value of ClientNumber will be -1 and the ServiceName will be the empty string.
  - Error responses: `500 Internal Server Error` (generic error)

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
