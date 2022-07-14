import PathPoint from '../path/PathPoint';
import { PathCoordinates } from '../../types/path';
import React, { forwardRef, useImperativeHandle } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { pathActions } from '../../store/path';

const Path = forwardRef((props, ref: any) => {
    const dispatch = useDispatch();
    const pathPointsCoordinates = useSelector((state: { path: { pathPoints: [] } }) => state.path.pathPoints)

    function getPosition(el: HTMLElement) {
        let xPos = 0;
        let yPos = 0;

        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);

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

            dispatch(pathActions.setPathPoint(newPathCords))
        }
    }));
    return (
        <>
            {pathPointsCoordinates.map((point: PathCoordinates, index: number) =>
                <PathPoint key={index} posX={point.posX} posY={point.posY}>
                    {index + 1}
                </PathPoint>
            )}
        </>
    );
})

export default Path;