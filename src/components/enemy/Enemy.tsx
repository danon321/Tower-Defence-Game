import { useState } from 'react';
import classes from './Enemy.module.scss';
import { Enemys } from '../../types/characters';

const Enemy = () => {
    const [enemyInfo, setEnemyInfo] = useState<Enemys>({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    });

    const getElementInfo = (el: HTMLElement | null) => {
        if (!el) return;

        const newElInfo: Enemys = {
            width: el.getBoundingClientRect().width,
            height: el.getBoundingClientRect().height,
            top: el.getBoundingClientRect().height,
            left: el.getBoundingClientRect().height
        }

        if (enemyInfo.width !== newElInfo.width)
            setEnemyInfo(newElInfo)
    }

    return (
        <div className={classes.enemy} style={{left: 10, top: 0}} ref={getElementInfo}></div>
    );
}

export default Enemy;