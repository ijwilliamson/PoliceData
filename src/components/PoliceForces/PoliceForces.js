import './PoliceForces.css'
import { useState, useEffect, useRef } from 'react';

const PoliceForces = (props) => {
  //props:
  //callBack - fn to send the selected region


    let upToDate = useState(false);
    let error = useRef(false)

    const [current, setCurrent] = useState("")
  
    const [forces, setForces] = useState([]);
  
    useEffect(() => {
      GetData()},[]);
  
    const GetData = async () => {
        try {
          const response = await fetch("https://data.police.uk/api/forces",)
        
          if(!response.ok) {
            throw new Error(response.statusText);
          }
  
          const data = await response.json();
          setForces(data)
          error.current = false;
          props.callBack(data[0].id)
      
        }
        catch (err){
          error.current = true;
          console.log(err.message)
        }
    }

    const handleOnChange = (event) => {
      // update state with the value of the form item
      console.log(event.currentTarget.value)
      setCurrent(event.currentTarget.value)
      props.callBack(event.currentTarget.value)
      
  }

    return (
      <select id="force" value={current} onChange={(event)=>handleOnChange(event)}>
        {forces.map((force) => {
          return (
            <option key={force.id} value={force.id}>{force.name}</option>
          )
        })}
      </select>
  
      //return data goes here
    )
  
}

export default PoliceForces;