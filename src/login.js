import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import './css/login.css'
import my_style from './css/Main_style.css'
import './css/bootstrap.css'
import Home from './components/Home.js'
import {BrowserRouter, Route, Routes ,redirect, useNavigate} from 'react-router-dom'
import Cart from './components/cart.js'
import Admin from './Admin.js'
import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo} from "firebase/auth"


class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Aarambha,',
  'Welcome',
  'YOU - US -WE',
  'Dive with full Expectations',
  'We need you',
  'Build memories with us',
  'LOGIN'
]

	



export default function Login() {
  // const navigate =  useNavigate()
     const provider = new GoogleAuthProvider()

     function startScrambling(){
      const el = document.querySelector('.text')
      const fx = new TextScramble(el)
      
      let counter = 0
      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          setTimeout(next, 800)
        })
        counter = (counter + 1) % phrases.length
      }
      
      next()
     }
  

  const app = initializeApp({
    apiKey: "AIzaSyCLtKfYS-DakArniaKoFbCX0tkrWaxp70Q",
  authDomain: "vinays-pizza.firebaseapp.com",
  databaseURL: "https://vinays-pizza-default-rtdb.firebaseio.com",
  projectId: "vinays-pizza",
  storageBucket: "vinays-pizza.appspot.com",
  messagingSenderId: "988813984271",
  appId: "1:988813984271:web:73fd489441cdbbd957597a"
  })
  const auth =  getAuth(app)

  const [user, setUser] = useState(null)

  const [userInfo, setInfo] = useState(null)

  const [currentUserId, setCID] = useState(null)

  function change(){
    signInWithPopup(auth, provider).then(result => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    setUser(result.user)
    setInfo(getAdditionalUserInfo(result))
    document.getElementById("mainFlex").style.display = "none"
    sessionStorage.setItem("currentUserEmail", result.user.email)
    sessionStorage.setItem("currentUserName", result.user.displayName)
    sessionStorage.setItem("currentUserId", result.user.uid)
    // alert(JSON.stringify(result.user))
    sessionStorage.setItem("currentUserPic", result.user.photoURL)
    // navigate("/home", {replace : true})
    // alert(JSON.stringify(result.user))
    }).catch(err=>{
      console.log(err)
    })
    
  }

  function adminLogin(e){
    // e.preventDefault()
    document.getElementById("mainFlex").style.display = "none"
    sessionStorage.setItem("currentAdmin", "Yes")
  }

  useEffect(()=>{startScrambling()}, [])
  

  

    // setCID(sessionStorage.getItem("currentUserId"))
    // sessionStorage.clear()
    // sessionStorage.setItem("currentUserId", "hi")
    return (
        <div className="App"  >
<div class="container-2" id="mainFlex" style={{ "background" : "none", "backdrop-filter" :"blur(50px)"}}>
	<div class="container-2__header" >
		<img src="https://i.ibb.co/bRMZF3F/Whats-App-Image-2023-03-17-at-8-14-58-PM.jpg" alt="Header Image" class="header-image" /> 
	  </div>
    <main class="signup-container">
		<div class="container-3">
			<div class="text"></div>
		  </div>
      
      <div class="login-wrapper" >
        <a href="#" class="btn btn-google" onClick={change}>
          <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" />
          Log In with Google
        </a>
      </div>
    </main>
  </div>

    {sessionStorage.getItem("currentUserId")?<Home/> : null}
    {sessionStorage.getItem("currentAdmin")?<Admin /> : null}

    
    </div>
    )
}
