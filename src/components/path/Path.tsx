import PathPoint from '../path/PathPoint';
import { Coordinates } from '../../types/path';
import React, { forwardRef, useImperativeHandle } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { pathActions } from '../../store/path';
import { IRootState } from '../../store';

const Path = forwardRef((props, ref: any) => {
    const dispatch = useDispatch();
    const pathPointsCoordinates = useSelector((state: IRootState) => state.path.pathPoints)

    function getPosition(el: HTMLElement): Coordinates { //TODO add return type
        let posX = 0;
        let posY = 0;

        posX += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        posY += (el.offsetTop - el.scrollTop + el.clientTop);

        return {
            posX,
            posY
        };
    }
    useImperativeHandle(ref, () => ({
        setPathPointsHandler(event: React.MouseEvent<HTMLElement>) {

            const boardPosition = getPosition(event.currentTarget);
            const newPathCords: Coordinates = {
                posX: event.clientX - boardPosition.posX,
                posY: event.clientY - boardPosition.posY
            }

            dispatch(pathActions.setPathPoint(newPathCords))
        }
    }));
    return (
        <>
            {pathPointsCoordinates.map((point: Coordinates, index: number) =>
                <PathPoint key={index} posX={point.posX} posY={point.posY}>
                    {index + 1}
                </PathPoint>
            )}
        </>
    );
})

export default Path;