import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './css/login.css'
import './App.css';
import my_style from './css/Main_style.css'
import './css/bootstrap.css'
import Home from './components/Home.js'
import {BrowserRouter, Route, Routes ,redirect, useNavigate, Navigate} from 'react-router-dom'
import Cart from './components/cart.js'
import Login from './login.js'
import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo} from "firebase/auth"

function App() {
  return (
    <div>
      <Login />
     
    </div>
  );
}

export default App;
