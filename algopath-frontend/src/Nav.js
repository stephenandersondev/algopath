import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Button } from 'react-bootstrap'

export default function NavBar(props) {

    const {
        visualize,
        visSpeed,
        changeSpeed,
        clearBoard,
        clearWalls,
        clearPath,
        isRunning
    } = props;

    const speedTerm =
        visSpeed === 30 ? "Slow"
            : visSpeed === 20 ? "Medium"
                : visSpeed === 10 ? "Fast"
                    : 10;

    return (
        <Nav navbar fill className="navbar">
            <h3>AlgoPath</h3>
            <NavDropdown disabled={isRunning} title={`Speed: ${speedTerm}`} id="nav-dropdown">
                <NavDropdown.Item onClick={() => changeSpeed(30)}>Slow</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeSpeed(20)}>Medium</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeSpeed(10)}>Fast</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link disabled={isRunning}>
                    Algorithm
          </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled={isRunning}>
                    Mazes
          </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled={isRunning}>
                    History
          </Nav.Link>
            </Nav.Item>
            <Button disabled={isRunning} onClick={() => visualize()}>Visualize</Button>
            <Nav.Item>
                <Nav.Link disabled={isRunning} onClick={() => clearBoard()}>
                    Clear Board
          </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled={isRunning} onClick={() => clearWalls()}>
                    Clear Walls
          </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled={isRunning} onClick={() => clearPath()}>
                    Clear Path
          </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Link to="/login"><li>Logout</li></Link>
            </Nav.Item>
        </Nav>
    )
}
