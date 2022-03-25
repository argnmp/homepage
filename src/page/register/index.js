import React from 'react';

import style from './style.scss';

export const Register = () => {
    return (
        <div className="registerwrapper">
            <div className={"titlewrapper"}>회원가입</div>
            <div className={"formwrapper"}>
            <form action="/api/login" method="post">
                <input type="text" name="email" placeholder="email"/><br/>
                <input type="text" name="name" placeholder="name"/><br/>
                <input type="password" name="password" placeholder="pw"/><br/>
                <div>
                    <input type="submit" value="Register"/>
                </div>
            </form>
            </div>
        </div>
           ) 
}
