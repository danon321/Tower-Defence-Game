import classes from './PathPoint.module.scss';

const PathPoint:React.FC<{posX: number; posY:number; children: number}> = (props) => { 
    const pointSize = 25;

    return (
        <div className={classes['path-point']} style={{top: props.posY - pointSize/2, left: props.posX - pointSize/2}}>
            {props.children}
        </div>
    );
}

export default PathPoint;