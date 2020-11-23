import React from 'react'
import './Legend.css'

export default function Legend(props) {
    const { legendClass, context } = props;
    return (
        <li className="legend-li">
        <div className={legendClass + " legend"}></div>
        {context}
      </li>
    )
}
