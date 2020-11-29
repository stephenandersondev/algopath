import React, { Component } from 'react'
import loginImg from '../../img/login.svg'

export default function Login(props) {
    const { handleChange, handleSubmit, username, password, error, displayLoginError } = props
    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => handleChange(e)} type="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => handleChange(e)} type="password" name="password" placeholder="password" />
                    </div>
                </div>
                <div className="error">
                    {displayLoginError ? <p className="error-text">{error}</p> : null}
                </div>
            </div>
            <div className="footer">
                <button onClick={handleSubmit} type="button" className="btn">Login</button>
            </div>
        </div>
    )
}