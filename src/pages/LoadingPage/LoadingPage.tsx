import React from 'react'
import './LoadingPage.scss'
import { SiHeroku } from 'react-icons/si'

export const LoadingPage = () => {
    return (
        <div className="page loading-page">
            <div className="loading-page__loader">
                <div className="loading-page__spinner">
                    <SiHeroku />
                </div>
                <span>Loading Heroku</span>
            </div>
        </div>
    )
}
