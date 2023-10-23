import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RandomTable from './Display'
import API from './API'



function App() {
  const [row, setRow] = useState([])

  useEffect(() => {
    API.get_assigned_clients()
      .then((q) => {
        setRow(q);
      })
  }, []);
  

  return (
    <>
      <RandomTable row={row}></RandomTable>
    </>
  )
}

export default App
