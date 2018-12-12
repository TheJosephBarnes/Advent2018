import * as momentType from 'moment';
import moment from 'moment';

interface DLList {
    value: number,
    previous: DLList,
    next: DLList
}

class Day9 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day9.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                this.doPuzzles(fileText);
            }
        });
    }

    public static doPuzzles(input: string) {
        let start: momentType.Moment = moment();
        let infoReg: RegExp = /(\d+) players; last marble is worth (\d+) points/,
            info: RegExpExecArray = infoReg.exec(input) as RegExpExecArray,
            players: number = parseInt(info[1]),
            size: number = parseInt(info[2]);
        console.log(`marbles output - ${this.marbles(players, size)}`);
        let middle: momentType.Moment = moment();
        console.log(`done in ${middle.diff(start)}ms`);
        console.log(`big output - ${this.marbles(players, size*100)}`);
        let end: momentType.Moment = moment();
        console.log(`done in ${end.diff(start)}ms`);
    }

    public static marbles(numPlayers: number, lastMarble: number) {
        let scores: number[] = Array(numPlayers).fill(0);
        let circle: number[] = [0, 1];
        let index: number = 1;
        let timer: momentType.Moment = moment();

        for(let turn = 2; turn <= lastMarble; turn++) {
            let currentPlayer: number = turn%numPlayers;

            if (turn%23 === 0) {
                scores[currentPlayer] += turn;
                index -= 9;
                if (index < 0) index += circle.length;
                // console.log(circle[index]);
                scores[currentPlayer] += circle[index];
                circle.splice(index,1);
                index += 2;
                if (index > circle.length) index -= circle.length;
            } else {
                circle.splice(index, 0, turn);
                index += 2;

                if (index > circle.length) index -= circle.length;
            }

            if(turn % 100000 === 0) console.log(moment().diff(timer));
            // console.log(`[${currentPlayer}] [${turn}] ${circle}`);
        }

        return scores.sort((a,b) => b-a)[0];
    }

    public static linkedMarbles(numPlayers: number, lastMarble: number) {

    }
}

Day9.run();