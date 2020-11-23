import React, { Component } from 'react'
import NavBar from '../../Nav.js'
import Legend from '../Legend/Legend'
import Node from '../Node/Node'
import './PathfindingVisualizer.css'
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra'

export default class PathfindingVisualizer extends Component {

    constructor() {
        super()
        this.state = {
            grid: [],
            mouseIsPressed: false,
            visSpeed: 10,
            isRunning: false,
            isStartNode: false,
            isFinishNode: false,
            isWallNode: false,
            currRow: 0,
            currCol: 0,
            START_NODE_ROW: 10,
            START_NODE_COL: 15,
            FINISH_NODE_ROW: 10,
            FINISH_NODE_COL: 35,
            ROW_COUNT: 30,
            COLUMN_COUNT: 67
        }
    }


    componentDidMount() {
        const grid = this.getInitialGrid()
        this.setState({ grid })
    }

    getInitialGrid = (
        rowCount = this.state.ROW_COUNT,
        colCount = this.state.COLUMN_COUNT,
      ) => {
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
            previousNode: null
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
            console.log(this.state.START_NODE_ROW, this.state.START_NODE_COL)
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
           this.getInitialGrid();
        }
        console.log(this.state.START_NODE_ROW, this.state.START_NODE_COL)
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
            this.getInitialGrid();
        }
    }

    visualizeDijkstra = () => {
        this.setState({ isRunning: true })
        const { grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL } = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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
        this.setState({ isRunning: false })
    }

    clearBoard = () => {
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
                }
                if (nodeClassName === 'node node-finish') {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.isFinish = true;
                }
                if (nodeClassName === 'node node-start') {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.isStart = true;
                    node.isWall = false;
                }
                if (nodeClassName === 'node node-wall') {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.isWall = false;
                }
            }
        }
        this.setState({
            grid: newGrid
        })
    }

    clearWalls = () => {
        const newGrid = this.state.grid.slice();
        for (const row of newGrid) {
            for (const node of row) {
                let nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (nodeClassName === 'node node-wall') {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
                    node.isWall = false;
                }
            }
        }
        this.setState({
            grid: newGrid
        })
    }


    clearPath = () => {
        Array.from(document.getElementsByClassName("node node-shortest-path")).forEach(node => node.className = 'node node-visited')
    }

    render() {

        const { grid, mouseIsPressed } = this.state

        return (
            <div>
                <NavBar
                    visualize={this.visualizeDijkstra}
                    visSpeed={this.state.visSpeed}
                    changeSpeed={this.changeSpeed}
                    clearBoard={this.clearBoard}
                    clearWalls={this.clearWalls}
                    clearPath={this.clearPath}
                    isRunning={this.state.isRunning}
                />
                <>
                    <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
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
                <Legend />
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