import axios from 'axios';
import React , {useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';

import style from './style.scss';

export const Register = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    function emailTest(email) {
        var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return reg.test(email);
    }
    const toastId = React.useRef();
    const registerHandler = (e) => {
        e.preventDefault();
        if(emailRef.current.value===""){
            toast.warn("Email is required",{theme: 'colored'});
            return;
        }
        if(nameRef.current.value===""){
            toast.warn("Name is required",{theme: 'colored'});
            return;
        }
        if(passwordRef.current.value===""){
            toast.warn("Password is required",{theme: 'colored'});
            return;
        }
        if(!emailTest(emailRef.current.value)){
            toast.warn("Email is not correct",{theme: 'colored'});
            return;
        }
        toastId.current = toast("Register in progress...",{autoClose: false, theme: 'colored', isLoading: true})
        /*
        axios({
            method: 'post',
            url: '/api/register',
            data: {
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value,
            }
        })
        */
        axios.post('/api/register',{
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
        })
        .then((res)=>{
            if(!res.data.isSuccess){
                toast.dismiss(toastId.current);
                toast.warn(res.data.msg, {theme: 'colored'});
            }
        })
        .catch((err)=>{
            toast.dismiss(toastId.current);
            toast.error('Server Error', {theme: 'colored'});
        })
    }
    return (
        <div className="registerwrapper">
            <div className="titlewrapper">회원가입</div>
            <div className="formwrapper">
            <form>
                <input type="text" name="email" placeholder="email" ref={emailRef}/><br/>
                <input type="text" name="name" placeholder="name" ref={nameRef}/><br/>
                <input type="password" name="password" placeholder="password" ref={passwordRef}/><br/>
                <div>
                    <input type="submit" onClick={registerHandler} value="Register"/>
                </div>
            </form>
            </div>
            <ToastContainer/>
        </div>
           ) 
}
