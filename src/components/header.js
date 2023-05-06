import React, {useEffect} from 'react'
import {redirect} from 'react-router-dom'
import { browserHistory } from 'react-router';
import Home from './Home.js'
import mainImg from '../img/mainImg.png'

import '../css/Main_style.css'
export default function Header() {

    const signOut = e =>{
        e.preventDefault();
        sessionStorage.clear()
        window.location.reload(true)
        
    }

    function readAll(){
        var flag=0;
var bool = true;
var no_rows = 0
var frame_data;
var current_row;
var img= document.getElementById('sun_image');
var page = document.getElementById('page')
img.style.transtion = "all 0.5s";
// img.addEventListener('mouseover', () => {img.style.content = "url('https://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif')"})
// img.addEventListener('mouseleave', ()=> {img.style.content = "url('https://i.ibb.co/Ws3ydGW/mainImg.png')"})
var items = document.getElementsByClassName("img_ref")
var decors = items[0]
var frames = items[1]
var polaroids = items[2]
var memories = items[3]
decors.addEventListener('mouseover', ()=>{img.style.height = "0px"; window.setTimeout(()=>{img.style.height = "7vw"; img.style.content = "url('https://i.ibb.co/RcwvzfP/flower.png')"}, 250); flag=1})
frames.addEventListener('mouseover', ()=>{img.style.height = "0px"; window.setTimeout(()=>{img.style.height = "7vw"; img.style.content = "url('https://i.ibb.co/2nVm3Qd/Vector-Vintage-frame-Gold.png')"}, 250); flag=1})
polaroids.addEventListener('mouseover', ()=>{img.style.height = "0px"; window.setTimeout(()=>{img.style.height = "7vw"; img.style.content = "url('https://i.ibb.co/tLfr1wB/memories.png')"}, 250); flag=1})
memories.addEventListener('mouseover', ()=>{img.style.height = "0px"; window.setTimeout(()=>{img.style.height = "7vw"; img.style.content = "url('https://i.ibb.co/FYYKgv7/polaroid.png')"}, 250); flag=1})
for(let i=0; i<items.length; i++)
{
    document.getElementById("navi").addEventListener('mouseleave', ()=>{if(flag==1){img.style.height = "0px"; window.setTimeout(()=>{img.style.height = "7vw"; img.style.content = "url('https://i.ibb.co/bRMZF3F/Whats-App-Image-2023-03-17-at-8-14-58-PM.jpg')"}, 250);flag=0;}})
    items[i].addEventListener('click', ()=>{alert('coming soon....')})
}

    }

    useEffect(()=>{readAll()}, [])

    
    return (
        <div>
            <div className="Header">
                <span><img src className="sun_image" id="sun_image"  /></span>
            {/* <div className="title">fASHion</div> */}
                <h6 id="userName">Hey there, {sessionStorage.getItem("currentUserName")}</h6>
                {/* <a href="/favs" id="fav_btn">Favs</a> */}
                {/* <a href="/cart" id="cart_btn">Cart</a> */}
                <div id="imgCont"><img id="userImg" src={sessionStorage.getItem("currentUserPic")}  />
                    <ul id="imgMenu">
                        <li onClick={signOut}>Signout</li>
                    </ul>
                </div>
               
            </div>
            <nav className="navigation" id="navi">
    <a href="#" className="img_ref" id="Decors_ref">Decors</a>
    <a href="/frames" className="img_ref" id="Frames_ref">Frames</a>
    <a href="#" className="img_ref" id="Polaroids_ref">Polaroids</a>
    <a href="#" className="img_ref" id="Memories_ref">Memories</a>
        </nav>
        </div>
    )
}
