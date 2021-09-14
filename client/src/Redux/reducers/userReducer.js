import { SIGNUP_USER } from "../action/userType";
const initialState={
    isLoggedIn:false,
    id:'',
    userData:{username:'',user_id:''},
    msg:''
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case SIGNUP_USER:return{
            ...state,
            msg:'Account Created successfully'
        }
        default:return state;
    }
}

export default userReducer;