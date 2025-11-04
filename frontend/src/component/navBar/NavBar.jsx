import React, { useState } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { GrHomeRounded } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { BiGridAlt, BiBell } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

export default function NavBar() {
    const navigate = useNavigate();
    const [browseOpen, setBrowseOpen] = useState(false);

    return (
        <div className='nav-grid'>
            <nav>
                <div className="nav-left">
                    <h2 className='title' style={{color: localStorage.getItem("Title-Colors")}}>Cut+</h2>

                    <Link to="/ProjetWebH25/" title='Home'>
                        <li><GrHomeRounded style={{fontSize:"20px", marginRight:"10px"}}/>Home</li>
                    </Link>

                    <li className="browse-toggle" onClick={() => setBrowseOpen(!browseOpen)}>
                        <BiGridAlt style={{fontSize:"20px", marginRight:"10px"}}/>
                        Browse {browseOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                    </li>

                    {browseOpen && (
                        <div className="browse-dropdown">
                            <Link to="/ProjetWebH25/movie" className="dropdown-item">Movies</Link>
                            <Link to="/ProjetWebH25/serie" className="dropdown-item">TV Series</Link>
                        </div>
                    )}

                </div>

                <div className="nav-right">
                    <Link to="/ProjetWebH25/search">
                        <input type="text" placeholder='Search movie, TV shows' readOnly style={{cursor:"pointer"}}/>
                    </Link>
                    <Link to="/ProjetWebH25/setting">
                        <li><IoMdSettings style={{fontSize:"30px", marginRight:"10px"}}/></li>
                    </Link>

                    <button className="button" onClick={() => navigate("/ProjetWebH25/login")}><CiLogin/> Login</button>
                </div>
            </nav>
        </div>
    );
}
