import header from "./Header.css";
import React from 'react';

import logo from "../../assets/logo.png";

/**
 * Represents a header component
 * @returns {JSX.Element} The header component.
 */
function Header () {
    return (
        <header className="app_header">
            <img src={logo} className="App-logo" alt="logo"/>
        </header>
    );
};

export default Header;