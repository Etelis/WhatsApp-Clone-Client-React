import React from 'react';
import "./Login.css";
import { Button, IconButton } from "@material-ui/core";
import { auth, provider } from './firebase';
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import QR from "./qr.png";
import GoogleIcon from '@mui/icons-material/Google';

import { useTransition, animate } from 'react-spring'
function Login() {
    const [state, dispatch] = useStateValue();

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => { dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        })} )
        .catch((error) => { alert(error.message)} );
    };

   // const transition = useTransition(, {});

  return (
      
    <div className='login'>
        <div className='login__container'>
            <div className='login__form'>
                <div className='login__formHeader'>
                    <h3>Welcome back!</h3>
                    <h4>We're so excited to see you again!</h4>
                </div>
                <div className='login__formBody'>
                    <div className='login__formBodyEmail'>
                        <label htmlFor="ephone">USERNAME OR EMAIL ADDRESS</label>
                        <input type="text" name="ephone" id="ephone"></input>
                    </div>
                    <div className='login__formBodyPassword'>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" name="password" id="password"></input>
                    </div>
                </div>
                <div className='login__formFooter'>
                    <Button variant="contained" className='button' color='primary'>
                        Login
                    </Button>
                    <h4>Need an account?    <span className="boldLink" href=""> Register </span></h4>
                </div>
            </div>
            <div className='login__QR'>
                    <img src={QR} alt="" />
                <h3>Log in with QR Code</h3>
                <h4>
                Scan this with the{" "}
                <span className="boldDescription"> Mobile app </span> to log
                in instantly.
                </h4>

                <h5 className='boldDescription'> <span className="boldDescription"> Or Signing With: </span> </h5>
                <IconButton id="googleIcon"><GoogleIcon onClick={signInGoogle} /> </IconButton>
            </div>
        </div>
    </div>
  );
}

export default Login;