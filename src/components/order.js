import React, {useEffect} from 'react'
import Data from '../dataStore/frames.json'
import {useNavigate, useParams} from 'react-router-dom'
// import {useParams} from 'react-router-dom'
import { initializeApp } from "firebase/app";
export default function Order() {
     
    
  
    var navigate = new useNavigate()
    let { id } = useParams();
    // alert(id)
    // alert(JSON.stringify(Data))
    let currentObject = Data.filter(val => { 
        return val.id == id
    })[0]
    // alert(currentObject)
    function onReceive(){
        navigate(`/dumps/${id}`, {replace : true})
    }
   

    useEffect(()=>{document.getElementById("mainFlex").style.display = "none"})

   
    return (
        <div>
            <br /> <br /><br/>
            <div className="Dumps container">
                <div className="row">
                    <div className="col-md-3"><img id="" class="orderImg" style={{width:"15vw"}} src={currentObject.images[0]} /></div>
                    <div className="col-md-3" style={{float:"left"}}><br /><h3 class="itemName">{currentObject.name}</h3><h5 class="itemDesc">{currentObject.desc}</h5>
                    <h6 className="itemPrice">Price: {currentObject.price} rs</h6><br /></div>
                </div>
                <p id="itemMatter">{currentObject.matter}</p>
                <br/>
                <button id="orderButton" style={{backgroundColor : "#5F8D37"}} onClick={()=>{onReceive()}}>Order Now..!</button> 
            </div>
            <br /> <br /><br/><br /> <br /><br/><br /> <br /><br/>
            
        </div>
    )
}
