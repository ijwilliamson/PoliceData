import './ForceRegions.css'
import { useState, useEffect, useRef } from 'react';
import GMap from '../Map/Gmap';



const ForceRegions = (props) => {
    //Props
    //forceId - the region id to use

    let upToDate = useState(false);
    let error = useRef(false)

    const [model, setModel] = useState(false)

    const [regionLocation, setRegionLocation] = useState("");
    // const regionLocation = useRef("")
  
    const [regions, setRegions] = useState([]);
    const [force, setForce] = useState("");
    const [currentRegion, setCurrentRegion] = useState("")
  
    useEffect(() => {
      GetData()},[force]);

    const GetData = async () => {
        if (props.regionId==="") return <></>
        try {
          const response = await fetch(`https://data.police.uk/api/${props.forceId}/neighbourhoods`,)
        
          if(!response.ok) {
            throw new Error(response.statusText);
          }
  
          const data = await response.json();
          setRegions(data)
          error.current = false;
         
        }
        catch (err){
          error.current = true;
          console.log(err.message)
        }
    }

    if(props.forceId !== force){
        setForce(props.forceId)
    }
  
    const toggleModel= async (event,regionId) =>{
      console.log(regionId)
      
      if (typeof regionId !== "undefined"){
        setCurrentRegion(event.target.id);
        
        // regionLocation.current = await location()
        const tempLocation = await location();
        await setRegionLocation(tempLocation);
        await setModel(!model)
      } else {
        
        setModel(!model)
      }
  }



  const modelVisible = () =>{
      return (!model) ? "hidden" : ""
  }
    

  
  const location = async () =>{
    
    
    let regionCenter = { lat: -25.344, lng: 131.031 }

    if (props.regionId === ""){
        console.log("invalid region id returning ularu")
        return regionCenter
    } 

    try {
        const response = await fetch(`https://data.police.uk/api/${force}/${currentRegion}`,)
    
        if(!response.ok) {
        throw new Error(response.statusText)
        }

        const data = await response.json();
        regionCenter.lat = Number(data.centre.latitude)
        regionCenter.lng = Number(data.centre.longitude)    
    }
    catch (err){
      
        console.log(err.message)
        return regionCenter
    }
    
    return regionCenter

}



  const Model = ()=>{
      if (modelVisible){
       
          return (
            <officer-overlay class={modelVisible()} >
            <officer-model>
                <div className="header">
                    <span onClick={toggleModel}>X</span>
                </div>
                <div className="modelContent">
                {/* <GMap visibility={modelVisible} location={regionLocation.current}/> */}
                <GMap  location={regionLocation}/>
                </div>
            </officer-model>
        </officer-overlay>)

      } else {
            return <></>
      }


  }
  
    console.log()
    return (
       
      <>
      
        <Model/>

        <h1>{props.forceId}</h1>
        <h2>Regions</h2>
        <ul>
            {regions.map((region) => {
            return (
                <li key={region.id} id={region.id} onClick={(event)=>toggleModel(event,region.id)}>{region.name}</li>
            )
            })}
        </ul>
      </>
    )
}

export default ForceRegions;