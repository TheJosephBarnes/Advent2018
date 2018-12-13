import * as momentType from 'moment';
import moment from 'moment';

class Day12 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day12.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                // this.plants(fileText.split('\n'), 20);
                this.plants(fileText.split('\n'), 50000000000);
            }
        });
    }

    private static changeState(state: string, add: RegExp): string {
        let nextState: string = '';
        state = `....${state}....`

        for (let place = 2; place < state.length - 2; place++) {
            let sub: string = state.substring(place-2, place+3);
            if (sub.match(add)) {
                nextState += '#';
            } else {
                nextState += '.';
            }
        }

        return nextState;
    }

    public static plants(input: string[], cycles: number) {
        let points: number = 0;
        let offset: number = 0;
        let step: number = 0;
        let state: string = input[0].substring(15);
        let plant: string = '(';
        let plantReg: RegExp = /!/;

        for(let cmd = 2; cmd < input.length; cmd++) {
            if (input[cmd].endsWith('#')) {
                plant += `${input[cmd].substring(0,5).replace(/\./g, '\\\.')}|`;
            }
        }

        if (plant.length !== 1) plantReg = new RegExp(plant.substring(0,plant.length-1) + ')', 'g');

        for(let cycle = 0; cycle < cycles; cycle++) {
            let nextState: string = this.changeState(state, plantReg);
            offset -= 2;
            state = nextState;


            let newPoints: number = state.split('').reduce((acc, char, i) => {
                return char === '#' ? acc + i + offset : acc;
            }, 0);

            if (cycle+1 === 20) console.log(`part1 - ${newPoints}`);

            if (newPoints - points === step && cycle > 100) {
                let billions: number = (50000000000 - cycle+1) * step + newPoints;
                console.log(`(50000000000 - ${cycle}+1) * ${step} + ${newPoints};`);
                console.log(`part2 - ${billions}`);
                break;
            } else {
                step = newPoints - points;
                points = newPoints;
            }
            // console.log(state);
            // console.log(`cycle ${cycle+1} - ${newPoints} , length ${state.length}, index ${offset}`);
        }
    }
}

Day12.run();