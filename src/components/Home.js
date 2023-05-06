import React, {useEffect} from 'react'
import Header from './header.js'
import Data from '../dataStore/frames.json'
import Content from './content.js'
import Fav from './fav.js'
import Cart from './cart.js'
import Dumplings from './Dumplings.js'
import Order from './order.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export default function Home(app) {

    function removeUnused(){
        document.getElementById("mainFlex").style.display = "none"
        var body = document.getElementsByTagName("body")[0]
        body.style.background = "none"

    }

    useEffect(()=>{removeUnused()},[])
    
    return (
        <div>
            

    <Header />
    <br/><br/><br/>
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Content data={app} />} />
            <Route path="/frames" exact element={<Content />} />
            <Route path="/favs" exact element={<Fav />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/dumps/:id" exact element={<Dumplings />} />
            <Route path="/order/:id" exact element={<Order />} />
        </Routes>
        </BrowserRouter>
        </div>

       
    )
}
