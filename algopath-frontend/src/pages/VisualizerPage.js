import React from 'react'
import PathfindingVisualizer from '../components/PathfindingVisualizer/PathfindingVisualizer.js'

export default function VisualizerPage(props) {
    return (
        <div>
            <PathfindingVisualizer
            handleLogout={props.handleLogout}
            currentUserId={props.currentUserId}
             />
        </div>
    )
}