import React from 'react'
import { Card } from './Card'
// const logo = require('./pic1.jpg');
export const Cards = () => {
    // let count=10
    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
        
    // }
    return (
        <div className="cards ">
            <div className="row">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            </div>
        </div>
    )
}
