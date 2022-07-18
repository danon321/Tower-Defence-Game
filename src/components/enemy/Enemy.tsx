import { useState, useEffect } from 'react';
import classes from './Enemy.module.scss';

import { Enemys } from '../../types/characters';
import { Coordinates } from '../../types/path';

import { useSelector } from 'react-redux';
import { IRootState } from '../../store';

const Enemy = () => {
	const [enemyPosition, setEnemyPosition] = useState<Coordinates>({
		posX: 0,
		posY: 0
	});
	const [enemyInfo, setEnemyInfo] = useState<Enemys>({
		width: 0,
		height: 0
	});
	const isGameStarted = useSelector((state: IRootState) => state.game.isGameStarted);
	const pathPoints = useSelector((state: IRootState) => state.path.pathPoints);

	const defaultMoveTime = 1000;
	const enemySpeed = (distance?: number | undefined) => {
		if (distance === undefined) return defaultMoveTime;

		let speed = 600;
		return distance / speed * 1000;
	};

	const style = {
		left: enemyPosition.posX - enemyInfo.width / 2,
		top: enemyPosition.posY - enemyInfo.height / 2,
		transitionDuration: enemySpeed() + 'ms'
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

	const calcDistance = (firstPoint: Coordinates, secPoint: Coordinates): number => {
		const firstVal: number = Math.pow(firstPoint.posX - secPoint.posX, 2);
		const secVal: number = Math.pow(firstPoint.posY - secPoint.posY, 2);

		return Math.pow(firstVal + secVal, 1 / 2);
	}

	// const characterMove = (positionInPath: number): void => {
	//     const newPos: Coordinates = pathPoints[positionInPath];
	//     const oldPos: Coordinates = (positionInPath === 0) ? enemyPosition : pathPoints[positionInPath - 1];
	//     const distance: number = calcDistance(oldPos, newPos);

	//     setEnemyPosition(newPos);
	// }

	const characterMove = (startPosition: Coordinates, endPosition: Coordinates): void | boolean => {
		const startPosX = startPosition.posX;
		const startPosY = startPosition.posY;
		const endPosX = endPosition.posX;
		const endPosY = endPosition.posY;
		let directX = (startPosX > endPosX) ? -1 : 1;
		let directY = (startPosY > endPosY) ? -1 : 1;

		if (startPosX === endPosX)
			directX = 0;

		if (startPosY === endPosY)
			directY = 0;

		const newPosition = {
			posX: startPosX + directX,
			posY: startPosY + directY
		}
		if (startPosX !== endPosX) {
			setEnemyPosition(newPosition);
			characterMove(newPosition, endPosition);
		} else if (startPosY !== endPosY) {
			setEnemyPosition(newPosition);
			characterMove(newPosition, endPosition);
		} else {
			return false;
		}
	}

	const enemyMoveQueue = (): void => {
		let points:number = pathPoints.length;
		let step = 0;

		const move = () => {
			if (step <= points) {
				console.log(enemyPosition,pathPoints[step])
				setTimeout(() => {
					characterMove(enemyPosition, pathPoints[step]);
					console.log(calcDistance(enemyPosition,pathPoints[step]))
					move();
					step++;
				}, defaultMoveTime)
				
			}
		}
		move()
	}


	useEffect(() => {
		if (isGameStarted)
			enemyMoveQueue();
	}, [isGameStarted])

	return (
		<div className={classes.enemy} style={style} ref={getElementInfo}></div>
	);
}

export default Enemy;