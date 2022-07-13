import classes from './Board.module.scss';
import Enemy from './enemy/Enemy';
import Path from './path/Path';
import { useRef } from 'react';

const Board = () => {
    const pathRef = useRef({setPathPointsHandler(event: any): void{}});

    return (
        <div className={classes.board} onClick={(event) => pathRef.current.setPathPointsHandler(event)}>
            <Enemy />
            <Path ref={pathRef}/>
        </div>
    );
}

export default Board;