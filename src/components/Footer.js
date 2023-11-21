import React from 'react';
import "../App.css";

import { NavLink } from "react-router-dom";

import { IoMdHome } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Footer = () => {
    return (
        <footer>
            <nav id='nav-a'>
            <ul>
                <li>
                <NavLink to="/" className="iconWrapper">
                    <IoMdHome className="icon" />
                </NavLink>
                </li>

                <li>
                <NavLink to="/explore" className="iconWrapper">
                    <MdOutlineExplore className="icon" />
                </NavLink>
                </li>

                <li>
                <NavLink to="/favorites" className="iconWrapper">
                    <MdFavoriteBorder className="icon" />
                </NavLink>
                </li>

                <li>
                <NavLink to="/about" className="iconWrapper">
                    <CgProfile className="icon" />
                </NavLink>
                </li>
            </ul>
            </nav>
        </footer>
    );
}

export default Footer;