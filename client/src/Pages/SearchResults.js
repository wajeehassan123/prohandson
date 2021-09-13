import React, { Component } from 'react'
import { Card } from './../components/Card'
import { Header } from './Header'

export class SearchResults extends React.Component {
    render() {
        return (
            <>
                <Header/>
                    <h2 className="my-4 fw-bolder ">Search Results</h2>
                    <h3 className="searchHeading">Searched Value</h3>
                <div className="searchresults_cards">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </>
        )
    }
}