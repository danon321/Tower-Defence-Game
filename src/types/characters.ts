import { PathCoordinates } from './path';

interface Character {
    width: number;
    height: number;
}

export interface Enemys extends Character {}

class Character2 {
    width: number;
    height: number;
    position: PathCoordinates;

    constructor(setWidth: number, setHeight: number, newPosition: PathCoordinates) {
        this.width = setWidth;
        this.height = setHeight;
        this.position = newPosition;
    }
}