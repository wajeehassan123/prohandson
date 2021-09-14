import {SIGNUP_USER} from "./userType";

export const signupUser=(user_id)=>{
    return{
        type:SIGNUP_USER,
        payload:user_id
    }
}