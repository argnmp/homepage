import React from 'react';

import './style.scss';

export const Login = () => {
    return (
        <div className="login-wrapper">
            <div className="title-wrapper">로그인</div>
            <div className="form-wrapper">
            <form action="/api/login" method="post">
                <input type="text" name="email" placeholder="email"/><br/>
                <input type="password" name="password" placeholder="password"/><br/>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
            </div>
        </div>
           ) 
}
