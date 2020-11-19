import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar">
            <h3>AlgoPath</h3>
            <ul className="nav-links">
                <li>Speed</li>
                <li>Mazes</li>
                <li>History</li>
            </ul>
            <button>Visualize</button>
            <ul className="nav-links">
                <li>Clear Board</li>
                <li>Clear Walls</li>
                <li>Clear Path</li>
                <Link style={{color:"white"}} to="/login"><li>Logout</li></Link>
            </ul>
        </nav>
    )
}
