import React, { useRef } from "react";
import { useState, useEffect } from "react";

import * as FaIcons from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import { IconContext } from "react-icons/lib";

const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const onClick = e => {
            if (el.current !== null && !el.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };

        if (isActive) {
            window.addEventListener("click", onClick);
        }

        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [isActive, el]);

    return [isActive, setIsActive];
};

export default function Navbar(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <IconContext.Provider value={{ color: 'white' }}>
            <div className="menu-container">
                <Link className="navbar-logo" to="/">
                    <img src="images/Logo_White.png" alt="" height="57px" width="281.8px" />
                </Link>
                <div className="navbar-walletaddr">
                    <h5 className="m"><IoWalletOutline /></h5>
                    <h5> {props.WalletAddress}</h5>
                    <button onClick={onClick} className="menu-trigger">
                        <FaIcons.FaBars size="32px" />
                    </button>
                </div>
                <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                >
                    <ul>
                        <li>
                            <Link to="/portfolio" onClick={onClick}>Portfolio</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={onClick}>Stake</Link>
                        </li>
                        <li className="last_menu">
                            <Link to="/about" onClick={onClick}>About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </IconContext.Provider>
    );

}