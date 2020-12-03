import React, { Component } from 'react'
import NavBar from '../../Nav.js'
import Legend from '../Legend/Legend'
import Node from '../Node/Node'
import './PathfindingVisualizer.css'
import { dijkstra } from '../../algorithms/dijkstra'
import { aStar } from '../../algorithms/aStar'
import { bfs } from '../../algorithms/bfs'
import { dfs } from '../../algorithms/dfs'

export default class PathfindingVisualizer extends Component {

    constructor() {
        super()
        this.state = {
            grid: [],
            mouseIsPressed: false,
            visSpeed: 10,
            visAlgo: "Dijkstra",
            isRunning: false,
            isStartNode: false,
            isFinishNode: false,
            isWallNode: false,
            currRow: 0,
            currCol: 0,
            START_NODE_ROW: 19,
            START_NODE_COL: 22,
            FINISH_NODE_ROW: 19,
            FINISH_NODE_COL: 44,
            ROW_COUNT: 40,
            COLUMN_COUNT: 67,
            currentUserId: '',
            lastTenVis: []
        }
    }


    componentDidMount() {
        const grid = this.getInitialGrid()
        this.setState({
            grid: grid,
            currentUserId: this.props.currentUserId
        })
        this.getUserHistory()
    }

    getUserHistory = () => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.currentUserId}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ lastTenVis: data })
            })
    }

    getInitialGrid = () => {
        const rowCount = this.state.ROW_COUNT
        const colCount = this.state.COLUMN_COUNT
        const initialGrid = [];
        for (let row = 0; row < rowCount; row++) {
            const currentRow = [];
            for (let col = 0; col < colCount; col++) {
                currentRow.push(this.createNode(row, col));
            }
            initialGrid.push(currentRow);
        }
        return initialGrid;
    };

    createNode = (row, col) => {
        return {
            col,
            row,
            isStart: row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
            isFinish: row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
            distanceToFinishNode:
                Math.abs(this.state.FINISH_NODE_ROW - row) +
                Math.abs(this.state.FINISH_NODE_COL - col)
        }
    }


    handleMouseDown(row, col) {
        if (!this.state.isRunning) {
            if (this.isGridClear()) {
                if (
                    document.getElementById(`node-${row}-${col}`).className ===
                    'node node-start'
                ) {
                    this.setState({
                        mouseIsPressed: true,
                        isStartNode: true,
                        currRow: row,
                        currCol: col,
                    });
                } else if (
                    document.getElementById(`node-${row}-${col}`).className ===
                    'node node-finish'
                ) {
                    this.setState({
                        mouseIsPressed: true,
                        isFinishNode: true,
                        currRow: row,
                        currCol: col,
                    });
                } else {
                    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
                    this.setState({
                        grid: newGrid,
                        mouseIsPressed: true,
                        isWallNode: true,
                        currRow: row,
                        currCol: col,
                    });
                }
            } else {
                this.clearBoard();
            }
        }
    }

    isGridClear() {
        for (const row of this.state.grid) {
            for (const node of row) {
                const nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (
                    nodeClassName === 'node node-visited' ||
                    nodeClassName === 'node node-shortest-path'
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    handleMouseEnter(row, col) {
        if (!this.state.isRunning) {
            if (this.state.mouseIsPressed) {
                const nodeClassName = document.getElementById(`node-${row}-${col}`)
                    .className;
                if (this.state.isStartNode) {
                    if (nodeClassName !== 'node node-wall') {
                        const prevStartNode = this.state.grid[this.state.currRow][
                            this.state.currCol
                        ];
                        prevStartNode.isStart = false;
                        document.getElementById(
                            `node-${this.state.currRow}-${this.state.currCol}`,
                        ).className = 'node';

                        this.setState({ currRow: row, currCol: col });
                        const currStartNode = this.state.grid[row][col];
                        currStartNode.isStart = true;
                        document.getElementById(`node-${row}-${col}`).className =
                            'node node-start';
                    }
                    this.setState({ START_NODE_ROW: row, START_NODE_COL: col });
                } else if (this.state.isFinishNode) {
                    if (nodeClassName !== 'node node-wall') {
                        const prevFinishNode = this.state.grid[this.state.currRow][
                            this.state.currCol
                        ];
                        prevFinishNode.isFinish = false;
                        document.getElementById(
                            `node-${this.state.currRow}-${this.state.currCol}`,
                        ).className = 'node';

                        this.setState({ currRow: row, currCol: col });
                        const currFinishNode = this.state.grid[row][col];
                        currFinishNode.isFinish = true;
                        document.getElementById(`node-${row}-${col}`).className =
                            'node node-finish';
                    }
                    this.setState({ FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
                } else if (this.state.isWallNode) {
                    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
                    this.setState({ grid: newGrid });
                }
            }
        }
    }

    handleMouseUp(row, col) {
        if (!this.state.isRunning) {
            this.setState({ mouseIsPressed: false });
            if (this.state.isStartNode) {
                const isStartNode = !this.state.isStartNode;
                this.setState({ isStartNode, START_NODE_ROW: row, START_NODE_COL: col });
            } else if (this.state.isFinishNode) {
                const isFinishNode = !this.state.isFinishNode;
                this.setState({
                    isFinishNode,
                    FINISH_NODE_ROW: row,
                    FINISH_NODE_COL: col,
                });
            }
        }
    }

    handleMouseLeave() {
        if (this.state.isStartNode) {
            const isStartNode = !this.state.isStartNode;
            this.setState({ isStartNode, mouseIsPressed: false });
        } else if (this.state.isFinishNode) {
            const isFinishNode = !this.state.isFinishNode;
            this.setState({ isFinishNode, mouseIsPressed: false });
        } else if (this.state.isWallNode) {
            const isWallNode = !this.state.isWallNode;
            this.setState({ isWallNode, mouseIsPressed: false });
        }
    }

    saveVisInstance = () => {
        fetch('http://localhost:3000/api/v1/instances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                start_node_col: this.state.START_NODE_COL,
                start_node_row: this.state.START_NODE_ROW,
                finish_node_col: this.state.FINISH_NODE_COL,
                finish_node_row: this.state.FINISH_NODE_ROW,
                user_id: this.state.currentUserId
            })
        })
            .then(res => res.json())
            .then(data => {
                this.saveWalls(data.id)
            })
    }

    saveWalls = (id) => {
        const walls = getCurrentWalls(this.state.grid)
        const mappedWalls = walls.map(wall => { return [wall.col, wall.row, id] })
        fetch('http://localhost:3000/api/v1/walls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                walls: mappedWalls
            })
        })
    }

    visHistoryInstance = ({ instance, walls }) => {
        this.clearBoard()
        const newGrid = this.state.grid.slice();
        for (const row of newGrid) {
            for (const node of row) {
                if (node.row === this.state.START_NODE_ROW && node.col === this.state.START_NODE_COL) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node'
                    node.isStart = false
                }
                if (node.row === this.state.FINISH_NODE_ROW && node.col === this.state.FINISH_NODE_COL) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node'
                    node.isFinish = false
                }
            }
        }
        for (const row of newGrid) {
            for (const node of row) {
                if (node.row === instance.start_node_row && node.col === instance.start_node_col) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start'
                    node.isStart = true;
                }
                if (node.row === instance.end_node_row && node.col === instance.end_node_col) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish'
                    node.isFinish = true;
                }

            }
        }
        for (const row of newGrid) {
            for (const node of row) {
                for (const wall of walls) {
                    if (node.row === wall.row && node.col === wall.col) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall'
                        node.isWall = true;
                    }
                }
            }
        }
        this.setState({
            grid: newGrid,
            START_NODE_COL: instance.start_node_col,
            START_NODE_ROW: instance.start_node_row,
            FINISH_NODE_COL: instance.end_node_col,
            FINISH_NODE_ROW: instance.end_node_row
        })
    }


    changeAlgo = (input) => {
        this.setState({ visAlgo: input })
    }

    visualize = (algo) => {
        if (!this.state.isRunning) {
            this.saveVisInstance()
            this.setState({ isRunning: true })
            const { grid } = this.state;
            const startNode =
                grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
            const finishNode =
                grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
            let visitedNodesInOrder;
            switch (algo) {
                case 'Dijkstra':
                    visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                    break;
                case 'AStar':
                    visitedNodesInOrder = aStar(grid, startNode, finishNode);
                    break;
                case 'BFS':
                    visitedNodesInOrder = bfs(grid, startNode, finishNode);
                    break;
                case 'DFS':
                    visitedNodesInOrder = dfs(grid, startNode, finishNode);
                    break;
                default:
                    break;
            }
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }

    animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        const { visSpeed } = this.state
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder)
                }, visSpeed * i)
                return
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                const element = document.getElementById(`node-${node.row}-${node.col}`)
                if (element.className !== 'node node-finish' && element.className !== 'node node-start') {
                    element.className = 'node node-visited'
                }
            }, visSpeed * i)
        }
    }

    changeSpeed = (input) => {
        this.setState({ visSpeed: input })
    }

    animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i]
                const element = document.getElementById(`node-${node.row}-${node.col}`)
                if (element.className !== 'node node-finish' && element.className !== 'node node-start') {
                    element.className = 'node node-shortest-path'
                }
            }, 50 * i)
        }
        this.getUserHistory()
        this.setState({ isRunning: false })
    }

    clearBoard = () => {
        const ORIG_START_NODE_ROW = 19
        const ORIG_START_NODE_COL = 22
        const ORIG_FINISH_NODE_ROW = 19
        const ORIG_FINISH_NODE_COL = 44
        const newGrid = this.state.grid.slice();
        for (const row of newGrid) {
            for (const node of row) {
                let nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (
                    nodeClassName !== 'node node-start' &&
                    nodeClassName !== 'node node-finish'
                ) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.distanceToFinishNode =
                        Math.abs(this.state.FINISH_NODE_ROW - node.row) +
                        Math.abs(this.state.FINISH_NODE_COL - node.col);
                }
                if (nodeClassName === 'node node-finish') {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.isFinish = true;
                    node.distanceToFinishNode = 0;
                }
                if (nodeClassName === 'node node-start') {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.isStart = true;
                    node.isWall = false;
                    node.distanceToFinishNode =
                        Math.abs(this.state.FINISH_NODE_ROW - node.row) +
                        Math.abs(this.state.FINISH_NODE_COL - node.col);
                }
                if (nodeClassName === 'node node-wall') {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.isWall = false;
                }
            }
        }
        document.getElementById(`node-${this.state.START_NODE_ROW}-${this.state.START_NODE_COL}`).className = 'node';
        document.getElementById(`node-${this.state.FINISH_NODE_ROW}-${this.state.FINISH_NODE_COL}`).className = 'node';
        document.getElementById(`node-${ORIG_START_NODE_ROW}-${ORIG_START_NODE_COL}`).className = 'node node-start';
        document.getElementById(`node-${ORIG_FINISH_NODE_ROW}-${ORIG_FINISH_NODE_COL}`).className = 'node node-finish';
        this.setState({
            grid: newGrid,
            START_NODE_ROW: ORIG_START_NODE_ROW,
            START_NODE_COL: ORIG_START_NODE_COL,
            FINISH_NODE_ROW: ORIG_FINISH_NODE_ROW,
            FINISH_NODE_COL: ORIG_FINISH_NODE_COL
        })
    }

    clearWalls = () => {
        const newGrid = this.state.grid.slice();
        for (const row of newGrid) {
            for (const node of row) {
                let nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (nodeClassName === 'node node-wall' || nodeClassName === 'node node-shortest-path' || nodeClassName === 'node node-visited') {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
                    node.isWall = false
                    node.isVisited = false
                    node.distance = Infinity
                }
            }
        }
        this.setState({
            grid: newGrid
        })
    }


    clearPath = () => {
        const newGrid = this.state.grid.slice();
        for (const row of newGrid) {
            for (const node of row) {
                let nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (nodeClassName === 'node node-shortest-path' || nodeClassName === 'node node-visited') {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
                    node.isVisited = false
                    node.distance = Infinity
                }
            }
        }
        this.setState({
            grid: newGrid
        })
    }

    render() {

        const { grid } = this.state

        return (
            <div>
                <NavBar
                    visualize={this.visualize}
                    visSpeed={this.state.visSpeed}
                    visAlgo={this.state.visAlgo}
                    changeSpeed={this.changeSpeed}
                    changeAlgo={this.changeAlgo}
                    clearBoard={this.clearBoard}
                    clearWalls={this.clearWalls}
                    clearPath={this.clearPath}
                    isRunning={this.state.isRunning}
                    handleLogout={this.props.handleLogout}
                    lastTenVis={this.state.lastTenVis}
                    visInstance={this.visHistoryInstance}
                />
                <>
                    <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div className="row" key={rowIdx}>
                                    {row.map((node, nodeIdx) => {
                                        const { row, col, isFinish, isStart, isWall } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                row={row}
                                                col={col}
                                                isWall={isWall}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) =>
                                                    this.handleMouseEnter(row, col)
                                                }
                                                onMouseUp={() => this.handleMouseUp(row, col)}>
                                            </Node>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </>
                <div className="legend-container">
                    <Legend legendClass="legend-start" context="Start Node" />
                    <Legend legendClass="legend-finish" context="Stop Node" />
                    <Legend legendClass="legend-item" context="Unvisited Node" />
                    <Legend legendClass="legend-visited" context="Visited Node" />
                    <Legend
                        legendClass="legend-shortestpath"
                        context="Shortest-path Node"
                    />
                    <Legend legendClass="legend-wall" context="Wall" />
                </div>
            </div>
        );
    }
}

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish) {
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
    }
    return newGrid;
};

const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

const getCurrentWalls = (grid) => {
    const wallsArray = []
    for (const row of grid) {
        for (const node of row) {
            if (node.isWall === true) {
                wallsArray.push(node)
            }
        }
    }
    return wallsArray
}