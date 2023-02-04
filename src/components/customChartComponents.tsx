import React from "react";

export const CustomXAxisTick = (props: any) => {
    const { x, y, stroke, payload, fontSize } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={11} y={0} dy={18} textAnchor="end" fill="lightgray" transform="rotate(0)" style={{ fontSize }}>{payload.value}</text>
        </g>
    );
};