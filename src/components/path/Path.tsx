import PathPoint from '../path/PathPoint';
import { PathCoordinates } from '../../types/path';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Path = forwardRef((props, ref: any) => {
    const [pathCords, setPathCords] = useState<PathCoordinates[]>([])
    function getPosition(el: any) {
        let xPos = 0;
        let yPos = 0;

        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);

        el = el.offsetParent;

        return {
            x: xPos,
            y: yPos
        };
    }
    useImperativeHandle(ref, () => ({
        setPathPointsHandler(event: React.MouseEvent<HTMLElement>) {

            const boardPosition = getPosition(event.currentTarget);
            const newPathCords: PathCoordinates = {
                posX: event.clientX - boardPosition.x,
                posY: event.clientY - boardPosition.y
            }

            setPathCords(pathCords.concat(newPathCords));
        }
    }));
    return (
        <>
            {pathCords.map((point: PathCoordinates, index: number) =>
                <PathPoint key={index} posX={point.posX} posY={point.posY}>
                    {index + 1}
                </PathPoint>
            )}
        </>
    );
})

export default Path;