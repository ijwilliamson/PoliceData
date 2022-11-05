import './App.css';
import { useState, useEffect, useRef } from 'react';
import PoliceForces from './components/PoliceForces/PoliceForces';
import ForceRegions from './components/ForceRegions/ForceRegions';
import ForceDetails from './components/ForceDetails/ForceDetails';

function App() {

  const [currentForce, setCurrentForce] = useState("");

  const handleForceChange = (force) =>{
    setCurrentForce(force)
  }

  return (
    <div className="policeDb">

      <header>
        <h1>Police database</h1>
        <PoliceForces callBack={handleForceChange}/>
      </header>

      <div className="content">
      
        <div className="regions">
          <ForceRegions forceId={currentForce}/>
        </div>
        <div className="details">
          <ForceDetails forceId={currentForce}/>
        </div>

      </div>
      
    </div>
    
  );


}

export default App;
