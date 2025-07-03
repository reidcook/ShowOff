import Paper from '@mui/material/Paper';
import React from 'react';

type TileProps = {
    cols?: number; // 1-12, like Bootstrap columns
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

export default function Tile({ cols = 12, children, className = "", style = {} }: TileProps) {
    const colCount = Math.max(1, Math.min(cols, 12));

    return (
        <div className={"col-" + colCount}>
            <Paper
                elevation={3}
                className={className}
                sx={{
                    justifyItems: "center",
                    padding: "10px",
                    alignContent: "center",
                    height: "100%",
                    ...style,
                }}
            >
                {children}
            </Paper>
        </div>
    );
}
