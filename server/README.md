## Procedure to make tests:
1. start the testing version of the server by launching: <i>node tests.js</i>

2. make sure to have "REST client" extension for Visual Studio installed;

3. open the file "client_for_tests.http" in Visual Studio;

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
      "counterID": 3
    }
    ```
  - Response: `200 OK` (success)
  - Response body: 
  ```json
    {
      "clientNumber": 3
    }
    ```
  - Error responses: `500 Internal Server Error` (generic error), `400 Bad request` (invalid argument), `404 Not Found` (not present or unavailable)