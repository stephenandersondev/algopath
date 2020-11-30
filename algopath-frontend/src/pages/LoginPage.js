import React, { Component } from 'react'
import './login.scss';
import Login from '../components/Login/Login'
import Signup from '../components/Login/Signup'
import Logo from '../img/algopath-logo.png'

export default class LoginPage extends Component {

    constructor() {
        super()
        this.state = {
            isLogginActive: false
        }
    }

    componentDidMount() {
        this.changeState()
    }

    changeState() {
        const { isLogginActive } = this.state
        if (isLogginActive) {
            this.rightSide.classList.remove("right")
            this.rightSide.classList.add("left")
        } else {
            this.rightSide.classList.remove("left")
            this.rightSide.classList.add("right")
        }
        this.setState({ isLogginActive: !this.state.isLogginActive })
    }

    render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Sign Up" : "Login";
        return (
            <div>
            <h2 className="login-logo">AlgoPath</h2>
            <div className="login">
                <div className="container" ref={ref => (this.container = ref)}>
                    {isLogginActive && (
                        <Login 
                        containerRef={ref => (this.current = ref)}
                        handleChange={this.props.handleChange}
                        handleSubmit={this.props.handleSubmitLogin}
                        username={this.props.username}
                        password={this.props.password}
                        error={this.props.error}
                        displayLoginError={this.props.displayLoginError}
                         />
                    )}
                    {!isLogginActive && (
                        <Signup
                         containerRef={ref => (this.current = ref)}
                         handleChange={this.props.handleChange}
                         handleSubmit={this.props.handleSubmitSignup}
                         username={this.props.username}
                         password={this.props.password}
                         error={this.props.error}
                         displaySignupError={this.props.displaySignupError}
                          />
                    )}
                </div>
                <RightSide
                    current={current}
                    containerRef={ref => (this.rightSide = ref)}
                    onClick={this.changeState.bind(this)}
                />
            </div>
            </div>
        );
    }
}


const RightSide = props => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};