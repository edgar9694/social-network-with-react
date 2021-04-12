import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../api/auth"
import useAuth from "../../hooks/useAuth"
import logoWhite from "../../assets/png/logo-white.png";
import TweetModal from "../Modal/TweetModal";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
    const { setRefreshCheckLogin } = props
    const [showModal, setShowModal] = useState(false)
    const user = useAuth();
    const logout = () =>{
        logoutApi();
        setRefreshCheckLogin(true)
    }
    return (
        <div className="left-menu">
            <img className="logo" src={logoWhite} alt="Twitter"/>

            <Link to="/">
               <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Usuarios
            </Link>
            <Link to={`user/${user?._id}`} >
                <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
            </Link>

            <Button onClick={()=> setShowModal(true)}>
                Twittear 
            </Button>

            <TweetModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
