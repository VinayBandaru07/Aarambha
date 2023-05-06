import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { getDatabase, set, ref } from "firebase/database";
import Header from './header.js'
import Data from '../dataStore/frames.json'
import { initializeApp } from "firebase/app";
export default function Content() {
    const userId = sessionStorage.getItem("currentUserId")
    const userName = sessionStorage.getItem("currentUserName")
    const email = sessionStorage.getItem("currentUserEmail")
    const app = initializeApp({
        apiKey: "AIzaSyCLtKfYS-DakArniaKoFbCX0tkrWaxp70Q",
  authDomain: "vinays-pizza.firebaseapp.com",
  databaseURL: "https://vinays-pizza-default-rtdb.firebaseio.com",
  projectId: "vinays-pizza",
  storageBucket: "vinays-pizza.appspot.com",
  messagingSenderId: "988813984271",
  appId: "1:988813984271:web:73fd489441cdbbd957597a"
      })

    const database = getDatabase(app)

    const navigate = new useNavigate()
    
    function setUserData(items_fav, items_ordered){
        set(ref(database, 'users/' + userId), {
            username : userName,
            email : email,
            items_fav : items_fav,
            items_ordered : items_ordered
        })
    }

    function breakIt(id){
        if(id%4==0){
            return <br /> 
        }
    }
    function makeStyle(id){
        if(id == 1 || id%5==0){ 
            return {display: 'flex', flexDirection: 'row'}
        }
        else{
            return {}
        }
    }

    

    function makePageForPc(){
        var page = document.getElementById('page')
        let frame_data = Data
        let items_length = Data.length -1
        // alert(items_length)
        let current_row
        page.innerHTML = ""
        for(let i=1; i<=Math.ceil(items_length/3); i++)
        {
            page.innerHTML += `<div class="row" id = "row${i}"></div><br/><br/>`
        }
    
        var i=0;
        for(let j=1; j<= Math.ceil(items_length/3); j++){
            current_row = document.getElementById(`row${j}`)
            do
            {
                i++;
                // alert(JSON.stringify(frame_data[i]))
                current_row.innerHTML += `<div class='col-md-3 card' id=${frame_data[i].id}> <img class="images card-img-top" src = ${frame_data[i].images[0]}>` + `<div class='card-body'><h5 class='card-title'>${frame_data[eval(i)].name}</h5><p class='card-text'>${frame_data[eval(i)].desc}<br/ ><span style='color:grey; margin-left:35%';>₹: ${frame_data[eval(i)].price}</span></p></div></div><div class ='col-md-1'>` + "</div>";
                if(i==items_length){
                    break
                }
            }while(i%3!=0);
        }

        for(let i=1; i<=items_length; i++){
            document.getElementById(i).addEventListener("click", ()=>{navigate(`/order/${i}`, {replace : true})})
        }
        

       
        
    }

    function makePageForMobile(){
        // alert("hi")
        var page = document.getElementById('page')
        let frame_data = Data
        let items_length = Data.length -1
        // alert(items_length)
        let current_row
        page.innerHTML = ""
        for(let i=1; i<items_length; i++){
            page.innerHTML += `<div class='ro'><div class='cards' id=${frame_data[i].id}> <div class="img_cont"><img class="images" height = "" src = ${frame_data[i].images[0]}></div>` + `<div class='card_body'><h5 class='card_title'>${frame_data[eval(i)].name}</h5><p class='card_text'>${frame_data[eval(i)].desc}<br/ ><span>₹: ${frame_data[eval(i)].price}</span></p></div></div>` + "</div>";
        }
    }


   

    useEffect(()=>{makePageForPc()}, [])
    

    return (
        <div>
                
    <br /><br /><br /><br />
    {/* <div style={{display: 'flex', flexDirection: 'row'}}> 
    {Data.map(value => <><br /><div className='col-md-3 card'> <img className="images card-img-top" src = {value.images[0]} /><div className='card-body'><h4 className='card-title'>Price:{value.price}</h4><p className='card-text'> {value.desc}</p></div></div></>)}
        </div> */}
        <div id="page" className="container"></div>
        <img id="sneak" style={{display : "none"}} src="https://media.tenor.com/89cXFtjyzeUAAAAi/classy-raptor-timmy-welman.gif"/>{setUserData(["Frame", "Clock"], ["Hello"])}</div>
    )
}
