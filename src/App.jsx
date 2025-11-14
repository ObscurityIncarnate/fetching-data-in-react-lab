import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import StarshipSearch from './components/StarshipSearch/StarshipSearch';
import StarshipService from './services/starshipService';
import './App.css'

function App() {
  const [ships, setShips] = useState(null);
  useEffect(()=>{
    
    const getShips =async ()=>{
      try {
          const response = await StarshipService();
          setShips(response.data);
      } catch (error) {
          console.log(error);
      }      
    }
    getShips();
  }, [])
  return (
    <>
      <h1>Star wars API</h1>
      <h3>Search</h3>
      <StarshipSearch ships={ships} setShips={setShips}></StarshipSearch>    
    </>

  )
}

export default App
