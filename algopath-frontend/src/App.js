import './App.css';
import { Component } from 'react';
import LoginPage from './pages/LoginPage'
import VisualizerPage from './pages/VisualizerPage'

class App extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: '',
      displayLoginError: false,
      displaySignupError: false,
      currentUserId: '',
      isLoggedIn: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitLogin = () => {
    this.setState({ displayLoginError: false})
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("token", data.jwt)
          this.handleSuccessfulAuth(data.user.id)
        } else {
          this.setState({ 
            error: data.error,
            displayLoginError: true
          })
        }
      })
  }

  handleSubmitSignup = () => {
    this.setState({ displaySignupError: false})
    fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("token", data.jwt)
          this.handleSuccessfulAuth(data.user.id)
        } else {
          this.setState({ 
            error: data.error,
            displaySignupError: true
          })
        }
      })
  }

  handleSuccessfulAuth = (id) => {
    this.setState({ 
      currentUserId: id,
      isLoggedIn: true
     })
  }

  handleLogout = () => {
    this.setState({isLoggedIn: false})
  }

  render() {
    const { error, displayLoginError, displaySignupError, currentUserId, isLoggedIn } = this.state
    return (
        <div>
            {isLoggedIn ? <VisualizerPage
            currentUserId={currentUserId}
            handleLogout={this.handleLogout}
          /> : <LoginPage
            handleChange={this.handleChange}
            handleSubmitLogin={this.handleSubmitLogin}
            handleSubmitSignup={this.handleSubmitSignup}
            error={error}
            displayLoginError={displayLoginError}
            displaySignupError={displaySignupError}
             />}
        </div>
    );
  }
}

export default App;