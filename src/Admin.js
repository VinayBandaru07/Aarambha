import React, {useEffect} from 'react'
import { getDatabase, set, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import {  child, get } from "firebase/database";
export default function Admin() {

    const app = initializeApp({
        apiKey: "AIzaSyCLtKfYS-DakArniaKoFbCX0tkrWaxp70Q",
  authDomain: "vinays-pizza.firebaseapp.com",
  databaseURL: "https://vinays-pizza-default-rtdb.firebaseio.com",
  projectId: "vinays-pizza",
  storageBucket: "vinays-pizza.appspot.com",
  messagingSenderId: "988813984271",
  appId: "1:988813984271:web:73fd489441cdbbd957597a"
      })
    var orders = new Object();

    const db = getDatabase(app)
    const dbref = ref(db)

    

     function getIt(){
         document.getElementById("mainFlex").style.display = "none"
         get(child(dbref, `orders`)).then((snapshot)=>{
            if(snapshot.exists()){
                // alert(JSON.stringify(snapshot.val()))
                orders = snapshot.val()
                
                makeOrders()
            }
            else{
                alert("no data")
            }
        })
        
    }

    function makeOrders(){
        var orderDiv = document.getElementById("order")
        // alert(JSON.stringify(orders))
        var innerTxt = ""
        for(let i=1; i<=(Object.keys(orders)).length; i++){
            let Objnow = orders[Object.keys(orders)[i-1]]
            innerTxt = innerTxt + `<br/><h4>Order ${i}</h4>` + `Person Name : ${Objnow.name}`+
            `<br/>ItemId : ${Objnow.Itemid}<br />` + `Cheese Type : ${Objnow.cheese}<br />` + `Base : ${Objnow.base}<br/>`+
            `sauce : ${Objnow.sauce}<br/> Phone : ${Objnow.phone} <br/> Email : ${Objnow.email} <br/> City : ${Objnow.city}<br/>Pincode : ${Objnow.pincode}<br/> ItemsOrdered : ${Objnow.Items}<br/> TotalCost : ${Objnow.price}` 
        }
        orderDiv.innerHTML = innerTxt
        // alert(orderDiv.id)
    }

    const signOut = e =>{
        e.preventDefault();
        sessionStorage.clear()
        window.location.reload(true)
        
    }


    useEffect(()=>{getIt()},[])

    return (
        <div  style={{background:"none"}}  >
            <div className="Header" >
                <span><img className="sun_image" id="sun_image" src='https://snazzy-maps-cdn.azureedge.net/assets/marker-4dcd83c2-edfc-49db-a308-4cf4798f4c78.gif'  /></span>Vinay's
            <div className="title">Pizza</div>
                <h6 id="userName">Hey there, Admin</h6>
                
                <div id="imgCont">
                    <ul id="imgMenu">
                        <li onClick={signOut}>Signout</li>
                    </ul>
                </div>
               
            </div>
            <br/><br/><br/>
            <div id="order" class="container"></div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}
