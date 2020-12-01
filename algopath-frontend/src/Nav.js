import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavDropdown, Button } from 'react-bootstrap'

export default function NavBar(props) {

    const {
        visualize,
        visSpeed,
        visAlgo,
        changeAlgo,
        changeSpeed,
        clearBoard,
        clearWalls,
        clearPath,
        isRunning,
        handleLogout,
        lastTenVis,
        visInstance
    } = props;

    const speedTerm =
        visSpeed === 30 ? "Slow"
            : visSpeed === 20 ? "Medium"
                : visSpeed === 10 ? "Fast"
                    : 10;

    return (
        <Nav navbar fill className="navbar">
            <h2 className="nav-logo" >AlgoPath</h2>
            <NavDropdown disabled={isRunning} title={`Speed: ${speedTerm}`} id="nav-dropdown">
                <NavDropdown.Item onClick={() => changeSpeed(30)}>Slow</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeSpeed(20)}>Medium</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeSpeed(10)}>Fast</NavDropdown.Item>
            </NavDropdown>
             <NavDropdown disabled={isRunning} title={`Algo: ${visAlgo}`} id="nav-dropdown">
                <NavDropdown.Item onClick={() => changeAlgo("Dijkstra")}>Dijkstra</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeAlgo("AStar")}>AStar</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeAlgo("BFS")}>BFS</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeAlgo("DFS")}>DFS</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown disabled={isRunning || lastTenVis.length === 0} title="History" id="nav-dropdown">
                {lastTenVis.map(vis => 
                <NavDropdown.Item onClick={() => visInstance(vis)} >{vis.instance.created_at}</NavDropdown.Item>
                    )}
            </NavDropdown>
            <Button disabled={isRunning} onClick={() => visualize(visAlgo)}>Visualize</Button>
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
                <Nav.Link disabled={isRunning} onClick={() => handleLogout()}>
                    Logout
          </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
