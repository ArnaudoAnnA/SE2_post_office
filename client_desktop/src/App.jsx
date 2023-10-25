import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Container, Toast } from 'react-bootstrap/'
import BasicLayout from './Desktop';

import MessageContext from './messageCtx';
import API from './API';


function App() {
  const [counterID, setCounterID] = useState(4);
  const [services, setServices] = useState([]);
  const [clientID, setClientID] = useState(-1);
  const [serviceName, setServiceName] = useState('');
  const [message, setMessage] = useState('');

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error)
      msg = err.error;
    else if (typeof(err) === "string")
      msg = String(err);
    else
      msg = "Unknown Error";
    setMessage(msg);
  }

  useEffect(() => {
    const init = async() => {
      // API to retrieve services assigned to the current counter
      /*API.getServices()
        .then(() => {})*/ 

      //API to find the client assigned to this counter in this moment
      API.getClientAndServiceAssignedToCounter(counterID)
      .then((data) => {
        setClientID(data.clientNumber);
        setServiceName(data.serviceName);
      })
      .catch(err => handleErrors(err));
    };
    init();
  }, []);
  

  return (
    <>
      <MessageContext.Provider value={{ handleErrors }}>
        <Container fluid className="App">
          <BasicLayout counterID={counterID} clientID={clientID} serviceName={serviceName} setClientID={setClientID} setServiceName={setServiceName}></BasicLayout>
          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide bg="danger">
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Container>
      </MessageContext.Provider>
    </>
  )
}

export default App;