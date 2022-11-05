import './ForceDetails.css'
import { useState, useEffect, useRef } from 'react';
import ForceOfficer from '../ForceOfficer/ForceOfficer';

const ForceDetails = (props) => {
    //Props
    //forceId - the region id to use

    let upToDate = useState(false);
    let error = useRef(false)
  
    const [details, setDetails] = useState([]);
    const [force, setForce] = useState("");
  
    useEffect(() => {
      GetData()},[force]);
  
    const GetData = async () => {
        if (props.forceId==="") return <></>
        try {
          const response = await fetch(`https://data.police.uk/api/forces/${props.forceId}`,)
        
          if(!response.ok) {
            throw new Error(response.statusText);
          }
  
          const data = await response.json();
          setDetails(data)
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
  
    const cleanHTML = (value) => {
        
        if(typeof value === "undefined" || value===null) return "";
        
        const newHTML = value.replace(/(?:\r\n|\r|\n)/g, "")
                              .replace("</p><p>", '|')
                              .replace("</p> <p>", '|')
                              .replace("<p>", "")
                              .replace("</p>", "")
                              .replace( /<br\s*[\/]?>/gi, '|')
       
        let htmlArray = newHTML.split("|")

        return htmlArray.map((str, index)=>{
              return (<p key={index}>{str}</p>)
         })
    }
    
    if(details.length===0) return <></>

    return (
       
      <>
        <h2>Details</h2>
        <h3>Telephone Number</h3>
        <p>{details.telephone}</p>
        <h3>Senior Officer</h3>
        <ForceOfficer forceId={props.forceId}/>
        <h3>Description</h3>
        {cleanHTML(details.description)}
        <h3>Website</h3>
        <p><a href={details.url}>{details.url}</a></p>
        <h3>Engagement Methods</h3>
        {details.engagement_methods.map((eng)=>{
            return (
                   
               
                <p><a href={eng.url} target="_blank" rel="noreferrer">{eng.title}</a></p>
               
            )
        })}
        
      </>
    )
}

export default ForceDetails;