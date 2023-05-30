import React from "react"
import "./not-found.css"
import { useNavigate } from "react-router"

export const NotFoundPage = () =>{

const navigate = useNavigate()
    return(
        <div className="not-found-container">
          <img src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" alt="not-found" />
          <div className="not-found-typo">Unfortunately the page you are looking for has been moved or deleted</div>
          <button className="checkout_btn btn" onClick={()=>navigate("/")}>GO TO HOMEPAGE</button>
        </div>
    )
}