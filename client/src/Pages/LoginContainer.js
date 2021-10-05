import React from 'react'
import { Header } from './Header'
export const LoginContainer = () => {
    return (
        <>
        <Header></Header>
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
        </div>
        </>
    )
}