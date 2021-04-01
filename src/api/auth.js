import { API_HOST, TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode"

export function signUpApi(user){
    const url = `${API_HOST}/registro`;
    const userTemp ={
        ...user,
        email: user.email.toLowerCase(),
        birtDate:new Date()
    };
    delete userTemp.repeatPassword

    const params = {
        method: "POST",
        Headers:{
             "Content-Type":"application/json"
        },
        body: JSON.stringify(userTemp)
    }

    return fetch(url, params)
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }
        return { code: 404, message: "Fallo al registrar"};
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })
}

export function signInApi(user){
    const url = `${API_HOST}/login`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase()
    }

    const params = {
        method: "POST",
        Headers:{
             "Content-Type":"application/json"
        },
        body: JSON.stringify(userTemp)
    }

    return fetch(url, params)
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }
        return { code: 404, message: "Usuario o contraseña incorrectos"};
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })
}


export function setTokenApi(token){
    localStorage.setItem(TOKEN, token)
}

export function getTokenApi(){
    return localStorage.getItem(TOKEN)
}

export function logoutApi(){
    localStorage.removeItem(TOKEN)
}

export function isUserLoggedApi(){
    const token = getTokenApi();
    if(!token){
        return null
    }
    if(isExpiredToken(token)){

    }
    return jwtDecode(token)
}

export function isExpiredToken(token){
    const { exp } = jwtDecode(token)
    const expire = exp *1000
    const timeout = expire - Date.now()

    if(timeout < 0) {
        return true
    }
    return false
}