import { useState, useEffect } from 'react';
import classes from './Enemy.module.scss';

import { Enemys } from '../../types/characters';
import { PathCoordinates } from '../../types/path';

import { useSelector } from 'react-redux';

const Enemy = () => {
    const [currentPosition, setCurrentPosition] = useState<PathCoordinates>({
        posX: 0,
        posY: 0
    });
    const [enemyInfo, setEnemyInfo] = useState<Enemys>({
        width: 0,
        height: 0
    });
    const isGameStarted = useSelector((state: { game: { isGameStarted: boolean } }) => state.game.isGameStarted);
    const pathPoints = useSelector((state: { path: { pathPoints: PathCoordinates[] } }) => state.path.pathPoints);

    const style = {
        left: currentPosition.posX - enemyInfo.width / 2,
        top: currentPosition.posY - enemyInfo.height / 2
    }

    const getElementInfo = (el: HTMLElement | null) => {
        if (!el) return;

        const newElInfo: Enemys = {
            width: el.getBoundingClientRect().width,
            height: el.getBoundingClientRect().height
        }

        if (enemyInfo.width !== newElInfo.width)
            setEnemyInfo(newElInfo)
    }

    const enemyMoveQueue = (point: PathCoordinates, delay: number, time: number): void => {
        setTimeout(() => {
            setCurrentPosition({
                posX: point.posX,
                posY: point.posY
            })
            
        },delay * time)
    }

    useEffect(() => {
        if (isGameStarted) {
            pathPoints.forEach((point, index) => {
                enemyMoveQueue(point, index, 500);
            })
        }
    }, [isGameStarted])

    return (
        <div className={classes.enemy} style={style} ref={getElementInfo}></div>
    );
}

export default Enemy;