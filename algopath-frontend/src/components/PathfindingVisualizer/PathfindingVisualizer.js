import React, { Component } from 'react'
import Nav from '../../Nav.js'
import Legend from '../Legend/Legend'
import Node from '../Node/Node'
import './PathfindingVisualizer.css'
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {

    constructor() {
        super()
        this.state = {
            grid: [],
            mouseIsPressed: false,
            visSpeed: 10
        }
    }

    componentDidMount() {
        const grid = getInitialGrid()
        this.setState({ grid })
    }

    handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({
            grid: newGrid,
            mouseIsPressed: true
        })
    }

    handleMouseEnter = (row, col) => {
        if (!this.state.mouseIsPressed) return
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({ grid: newGrid })
    }

    handleMouseUp = () => {
        this.setState({ mouseIsPressed: false })
    }

    visualizeDijkstra = () => {
        const { grid } = this.state
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
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
            }, visSpeed * i)
        }
    }

    changeSpeed = (input) => {
        this.setState({visSpeed: input})
    }

    animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
            }, 50 * i)
        }
    }

    clearBoard = () => {
        const grid = getInitialGrid()
        this.setState({ grid })
    }

    clearWalls = () => {
        console.log("clear walls")
    }

    clearPath = () => {
        console.log("clear path")
    }

    render() {

        const { grid, mouseIsPressed } = this.state

        return (
            <div>
                <Nav 
                visualize={this.visualizeDijkstra}
                visSpeed={this.state.visSpeed}
                changeSpeed={this.changeSpeed}
                clearBoard={this.clearBoard}
                clearWalls={this.clearWalls}
                clearPath={this.clearPath}
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
                                                mouseIsPressed={mouseIsPressed}
                                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) =>
                                                    this.handleMouseEnter(row, col)
                                                }
                                                onMouseUp={() => this.handleMouseUp()}>
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

const getInitialGrid = () => {
    const grid = []
    for (let row = 0; row < 30; row++) {
        const currentRow = []
        for (let col = 0; col < 67; col++) {
            currentRow.push(createNode(col, row))
        }
        grid.push(currentRow)
    }
    return grid
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    newGrid[row][col] = newNode
    return newGrid
}