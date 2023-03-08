import React from 'react';
// import { Link} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import "./Header.css";
import { UserAuth } from '../../context/AuthContext';

export const Header = () => {
    const {currentUser,googleSignOut} = UserAuth();

    const handleLogOut = async () => {
        try {
            await googleSignOut()
        } catch (error){
            console.log(error);
        }
    };
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary sticky-top Header">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">ChitChat</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav justify-content-center">
                    {(!currentUser || !currentUser.accessToken) && (
                        <li className="nav-item">
                            <NavLink aria-current="page" to="/login" className={({isActive})=> isActive? 'active':'inactive'}>Login</NavLink>
                        </li>
                    )}
                    {currentUser && currentUser.accessToken && (
                        <>
                        <li className="nav-item">
                            <NavLink to="/home" end className={({isActive})=> isActive? 'active':'inactive'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/groups" className={({isActive})=> isActive? 'active':'inactive'}>Chats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/folders" className={({isActive})=> isActive? 'active':'inactive'}>Folders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/account" className={({isActive})=> isActive? 'active':'inactive'}>Account</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/users" className={({isActive})=> isActive? 'active':'inactive'}>Users</NavLink>
                        </li>
                        <li className="nav-item" onClick={handleLogOut}>
                            <div>Logout</div>
                        </li>
                        </>
                    )}
                </ul>
            </div>
            </div>
        </nav>
    )
}