import './ForceOfficer.css'
import { useState, useEffect, useRef } from 'react';

const ForceOfficer = (props) => {
    //Props
    //forceId - the region id to use

    let upToDate = useState(false);
    let error = useRef(false)

  
    const [officer, setOfficer] = useState([]);
    const [force, setForce] = useState("");
    const [model, setModel] = useState(false)

    useEffect(() => {
      GetData()},[force]);
  
    const GetData = async () => {
        if (props.forceId==="") return <></>
        try {
          const response = await fetch(`https://data.police.uk/api/forces/${props.forceId}/people`,)
        
          if(!response.ok) {
            throw new Error(response.statusText);
          }
  
          const data = await response.json();
          setOfficer(data)
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
       
        console.log(value)
        if(typeof value === "undefined") return "";
        if(value === null) return "";
        const newHTML = value.replace(/(?:\r\n|\r|\n)/g, "|")
        .replace("</p><p>", '|')
        .replace("</p> <p>", '|')
        .replace("<p>", "")
        .replace("</p>", "")
        .replace( /<br\s*[\/]?>/gi, '|')

        console.log(newHTML)

        let htmlArray = newHTML.split("|")

        htmlArray.forEach((str)=>{
            str = str.replace("|", "")
        })

        console.log(htmlArray)
        return newHTML
    }

    const toggleModel= () =>{
        setModel(!model)
    }

    const modelVisible = () =>{
        return (!model) ? "hidden" : ""
    }
    
    if(officer.length===0) return <></>

    return (
       <>
        <officer-overlay class={modelVisible()} >
            <officer-model>
                <div className="header">
                    <span onClick={toggleModel}>X</span>
                </div>
                <div className="modelContent">
                    <h3>Name</h3>
                    <p>{officer[0].name}</p>
                    <h3>Rank</h3>
                    <p>{officer[0].rank}</p>
                    <h3>Biography</h3>
                    <p>{officer[0].bio}</p>
                </div>
            </officer-model>
        </officer-overlay>
        <p onClick={toggleModel} class="officer">{officer[0].name}</p>
        </>
  
    )
}

export default ForceOfficer;