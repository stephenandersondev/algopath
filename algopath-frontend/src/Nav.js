import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'

export default function Nav(props) {

    const {
        visualize,
        visSpeed,
        changeSpeed,
        clearBoard,
        clearWalls,
        clearPath
    } = props;

    const speedTerm =
      visSpeed === 30 ? "Slow"
      : visSpeed === 20 ? "Medium"
      : visSpeed === 10 ? "Fast"
        : 10;

    return (
        <nav className="navbar">
            <h3>AlgoPath</h3>
            <ul className="nav-links">
                <li><a className="dropdown" href="#">Speed: {speedTerm}</a>
                    <ul className="dropdown-menu">
                        <li onClick={() => changeSpeed(10)}>Fast</li>
                        <li onClick={() => changeSpeed(20)}>Medium</li>
                        <li onClick={() => changeSpeed(30)}>Slow</li>
                    </ul>
                </li>
                <li>Mazes</li>
                <li>History</li>
            </ul>
            <button onClick={() => visualize()}>Visualize</button>
            <ul className="nav-links">
                <li onClick={() => clearBoard()}>Clear Board</li>
                <li onClick={() => clearWalls()}>Clear Walls</li>
                <li onClick={() => clearPath()}>Clear Path</li>
                <Link style={{color:"white"}} to="/login"><li>Logout</li></Link>
            </ul>
        </nav>
    )
}
