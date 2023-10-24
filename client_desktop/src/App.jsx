import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicLayout from './Desktop'
import API from './API'


function App() {
  const [counterID, setCounterID] = useState(4);
  const [clientID, setClientID] = useState(-1);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');

  useEffect(() => {
    const init = async() => {
      // API to retrieve services assigned to the current counter
      /*API.getServices()
        .then(() => {})*/ 

      //API to call the first client to serve with relative service
      /*API.nextClient(counterID)
      .then((user) => {
        setClientID(user.clientNumber);
        setServiceName(user.serviceName);
      })
      .catch(e => console.log(e));*/
    };
    init();
  }, []);
  

  return (
    <>
      <BasicLayout counterID={counterID} clientID={clientID} serviceName={serviceName} setClientID={setClientID} setServiceName={setServiceName}></BasicLayout>
    </>
  )
}

export default App