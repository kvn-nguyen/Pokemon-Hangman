import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
    
    return (
        <div className="header">
            <img src={logo} alt="logo"/>
            <h1>Original 151 Pokemon!</h1>
        </div>
    )
}

export default Header;