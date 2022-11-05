import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (Status) => {
  if (Status === Status.LOADING) return <h3>{Status} ..</h3>;
  if (Status === Status.FAILURE) return <h3>{Status} ...</h3>;
  return null;
};


const MyMapComponent=(props) =>{
  const ref = useRef();

  const [location, setLocation] = useState("")
  
  if (location !== props.center){
    setLocation(props.center)
  }

  useEffect(() => {
    new window.google.maps.Map(ref.current,
         {zoom: props.zoom, center: props.center});
  },[location]);

  return <div ref={ref} id="map" />;
}


const Gmap =  (props)=> {
    const zoom = 13;

    const [map, setMap] = useState(null);
    
    
    if (typeof props.location !== "object") {return <></>} 

    const getMap = (location, zoom) =>{
        
        setMap(MyMapComponent(location, zoom))


    }

  return (
    <Wrapper apiKey="AIzaSyCgEF4BwwQk527SVwNEFf4OkHZ7zHQsm18" render={render}>
      <MyMapComponent center={props.location} zoom={zoom} />
    </Wrapper>
  );
}

export default Gmap

