import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RandomTable from './Display'
import API from './API'



function App() {
  const [row, setRow] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Decrementa il tempo rimanente di 1 secondo
      setRefresh(true);
    }, 5000);
    console.log("Ciao")
    API.get_assigned_clients()
      .then((q) => {
        setRow(q);
        setRefresh(false);
      })
  }, [refresh]);
  

  return (
    <>
      <h2 style={{paddingBottom: '10px'}}>Post Office Display</h2>
      <RandomTable row={row}></RandomTable>
    </>
  )
}

export default App
