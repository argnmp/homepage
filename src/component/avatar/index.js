import React from 'react';
import './style.scss';

export const Avatar = () => {
    return (
        <div className="avatar-wrapper">
            <div className="image-wrapper">
                <div className="common-image"></div>
            </div>
            <div>
                <span className='avatar-name'>TaeHyeon Kim</span>
            </div>
            <div>
                <span className='avatar-greeting'>안녕하세요. 프로그래밍 기록을 남기는 김태현의 블로그입니다.</span>
            </div>
            <div>
                <span className='avatar-greeting'><a href="https://github.com/kimtahen">github</a></span>
            </div>
        </div>
           ) 
}
