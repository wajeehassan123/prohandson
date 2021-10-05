import React from 'react'
import { Header } from './Header'
import { FooterAll } from './FooterAll';
import { HeaderSearchless } from './HeaderSeachless';
export const LoginContainer = () => {
    return (
        <>
        <HeaderSearchless/>
        <div className="loginContainer">
            <button className="loginBox leftBox">
                <a href="/loginStudent">
                    Login as Student
                </a>
            </button>
            <button className="loginBox rightBox">
                <a href="/loginTutor">
                    Login as Mentor
                </a>
            </button>
            <FooterAll/>
        </div>
        
        </>
    )
}