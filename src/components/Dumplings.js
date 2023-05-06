import React, {useState, useEffect} from 'react'
import Data from '../dataStore/frames.json'
import {useParams, useNavigate} from "react-router-dom"
import { getDatabase, set, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import emailjs from '@emailjs/browser';

export default function Dumplings() {
    const app = initializeApp({
        apiKey: "AIzaSyCLtKfYS-DakArniaKoFbCX0tkrWaxp70Q",
  authDomain: "vinays-pizza.firebaseapp.com",
  databaseURL: "https://vinays-pizza-default-rtdb.firebaseio.com",
  projectId: "vinays-pizza",
  storageBucket: "vinays-pizza.appspot.com",
  messagingSenderId: "988813984271",
  appId: "1:988813984271:web:73fd489441cdbbd957597a"
      })

    const db = getDatabase(app)

    let { id } = useParams();
    const currentItem = id;
    const currentObject = Data.filter(value =>{return value.id == currentItem})[0]
    sessionStorage.setItem("currentObject", JSON.stringify(currentObject))
    const navigate = new useNavigate()
    var [price, setPrice] = useState(currentObject.price)
    var [itemCount, setItemCount] = useState(1)
    var fakedumps;
    var [dumps, setDumps] = useState({
        ItemName : currentObject.name,
        Itemid: id,
        pic : currentObject.images[0],
        Items : itemCount,
        price : price,
        name : "",
        email : "",
        address : "",
        city : "",
        phone : "",
        pincode : 0
    

    })
    emailjs.init("AFVk2KN7D055B5Fyu")

    

    function incrementPrice(){
        fakedumps = dumps
        fakedumps["Items"] = itemCount+1
        fakedumps["price"] = price + currentObject.price
        setDumps(fakedumps)
        setPrice(price + currentObject.price)
        setItemCount(itemCount + 1)
        
        // alert(price)
    }
    function decrementPrice(){
        fakedumps = dumps
        if(itemCount > 1){
            fakedumps["Items"] = itemCount-1
            fakedumps["price"] = price-currentObject.price
            setDumps(fakedumps)
            setPrice(price - currentObject.price)
            setItemCount(itemCount - 1)
            
        }
        
    }



    function addressHandler(e){
        e.preventDefault()
        fakedumps = dumps
        fakedumps[e.target.name] = e.target.value
        setDumps(fakedumps)
    }

    function submitHandler(e){
        e.preventDefault()
        emailjs.send("service_c5lovp7","template_3zliuie",{
            to_name: "Yaswanth Mamidi",
            from_name: "Aarambha",
            message: JSON.stringify(dumps) ,
            }).then(()=>{
                set(ref(db, 'orders/' + sessionStorage.getItem("currentUserId")), dumps);
                alert("Order Received...!!")
                navigate(`/frames`, {replace : true})
            }, (err)=>{
                alert("Error ordering the Item pls try again" + JSON.stringify(err))
            })
        
        
    }

    // useEffect(()=>{initializeRadio()},[])

    return (
        <div>
            <br /> <br /><br/>
            <div className="Dumps container">
                <div className="row">
                    <div className="col-md-3"><img id="" class="orderImg" style={{width:"15vw"}} src={currentObject.images[0]} /></div>
                    <div className="col-md-3" style={{float:"left"}}><br /><h3 class="itemName">{currentObject.name}</h3><h5 class="itemDesc">{currentObject.desc}</h5>
                    <h6 className="itemPrice">Price: {price} rs</h6><br /><div id="changePrice" style={{width:"100%",display:"flex"}}>Items: &nbsp;<button onClick={()=>{decrementPrice()}}>-</button><div id="countNum" style={{textAlign : "center", border : "solid 0.5px black", width:"2vw"}}>{itemCount}</div><button onClick={()=>{incrementPrice()}}>+</button></div></div>
                </div>
                <br/>
                
                <br/>
                <h5 id="enterDetails">Enter Your Details</h5>
                <div className="row address">
                    <form className="col-md-3" onChange={addressHandler} >
                        <input type="text" placeholder="Enter Your Name" name="name" /><br/>
                        <input type="email" placeholder="Enter Your Mail" name="email" /><br/>
                        <input type="text" placeholder="Mobile Number" name="phone" /><br/>
                        <input type="text" placeholder="Address" name="address" /><br/>
                        <input type="text" placeholder="City" name="city" /><br/>
                        <input type="number" placeholder="Pincode" name="pincode" /><br/>
                        <br/>
            <button id="pay_btn" onClick={submitHandler}>Pay on Delivery </button>
                    </form>
                </div>
                
                <br/><br/>
            </div>
        </div>
    )
}
