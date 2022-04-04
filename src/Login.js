import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from './firebase';
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => { dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        })} )
        .catch((error) => { alert(error.message)} );
    };

  return (
    <div className='login'>
        <div className='login__container'>
            <div className='login__text'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmMwuffh_HuEjRa5-piUqW9T_CoFaEcOWOlw&usqp=CAU" alt="login"/>
                <h1> Sign in to Target Chat</h1>
                <Button variant="contained" color="success" onClick={signIn}>
                    Sign in with Google.
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Login