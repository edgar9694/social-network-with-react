import { API_HOST } from "../utils/constants"

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