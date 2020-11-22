import './App.css';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VisualizerPage from './pages/VisualizerPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={VisualizerPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignupPage} />
      </div>
    </Router>
  );
}

export default App;