import * as momentType from 'moment';
import moment from 'moment';

interface Action {
    time: moment.Moment,
    action: string
}

interface GuardLog {
    id: string,
    date: momentType.Moment
    log: string[]
}

interface Guard {
    id: string,
    log: number[],
    totalMinutes: number
}

class Day4 {
    private static SleepCodes = {
        ASLEEP: 'falls asleep',
        AWAKE: 'wakes up'
    }

    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day4.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: string[] = fileText.split('\n');
                this.doPuzzles(instructions);
            }
        })
    }

    public static doPuzzles(input: string[]) {
        console.log(`first output - ${this.firstStrategy(input)}`);
        console.log(`second output - ${this.secondStrategy(input)}`);
    }

    public static printField(field: number[][] | string[][]) {
        let printer: string = '';
        for(let column of field) {
            for(let row of column) {
                row === undefined ? printer += 'X' : printer += row;
            }
            printer += '\n';
        }

        console.log(printer);
        return printer;
    }

    public static printTimes(actions: Action[]) {
        for(let act of actions) {
            console.log(`[${act.time.format('llll')}] - ${act.action}`);
        }
    }

    public static printGuards(guards: Guard[]) {
        for(let guard of guards) {
            console.log(`#${guard.id} ${guard.totalMinutes} ${guard.log.join(' ')}`);
        }
    }

    public static buildTime(input: string[]) {
        let regex = /\[(.+)\] (.+)/;

        let smartList: Action[] = input.map((obs) => {
            let info: RegExpExecArray = regex.exec(obs) as RegExpExecArray;
            let time: momentType.Moment = moment(info[1]);
            let action: string = info[2];

            return {
                time,
                action
            }
        });

        smartList.sort((a, b) => {
            return a.time.diff(b.time);
        });

        // this.printTimes(smartList);

        return smartList;
    }

    public static getGuardLog(input: string[]) {
        let idReg: RegExp = /.+#(\d{1,4}).+/;
        let times: Action[] = this.buildTime(input);
        // let logbook: GuardLog[] = [];
        let guards: Guard[] = [];
        let currentGuard: Guard;

        for(let place in times) {
            let currentAct = times[place].action;
            let currentTime = times[place].time;
            let date: momentType.Moment = moment(currentTime.add(1, 'hour').toISOString());

            if(currentAct === this.SleepCodes.ASLEEP) {
                let minute: number = parseInt(currentTime.format('mm'));
                while(minute < 60) {
                    //@ts-ignore
                    currentGuard.log[minute++]++;
                    //@ts-ignore
                    currentGuard.totalMinutes++;
                }

            } else if (currentAct === this.SleepCodes.AWAKE) {
                let minute: number = parseInt(currentTime.format('mm'));
                while(minute < 60) {
                    //@ts-ignore
                    currentGuard.log[minute++]--;
                    //@ts-ignore
                    currentGuard.totalMinutes--;
                }

            } else {
                let reg = idReg.exec(currentAct) as RegExpExecArray;
                let id: string = reg[1];

                let guardExists = guards.find((g) => {return g.id === id});

                if(guardExists) {
                    currentGuard = guardExists;
                } else {
                    let newGuard: Guard = {
                        id,
                        log: Array(60).fill(0),
                        totalMinutes: 0
                    }
                    guards.push(newGuard);
                    currentGuard = newGuard;
                }
            }
        }
        return guards;
    }

    public static firstStrategy(input: string[]) {
        let guards: Guard[] = this.getGuardLog(input);
        let sleepy: Guard = guards.sort((a, b) => {
            return b.totalMinutes - a.totalMinutes;
        })[0];
        let min: number = sleepy.log.indexOf(Math.max(...sleepy.log))
        
        // this.printGuards(guards);

        console.log(`Guard #${sleepy.id} slept most at ${min}`);

        return min * parseInt(sleepy.id);
    }

    public static secondStrategy(input: string[]) {
        let guards: Guard[] = this.getGuardLog(input);
        let maxGuard: Guard;
        let maxIndex: number;
        let max: number = 0;

        for(let guard of guards) {
            let localMax: number = Math.max(...guard.log);
            let localDex: number = guard.log.indexOf(localMax);
            if (localMax > max) {
                // console.log(`${guard.id} slept ${localMax} times at minute ${localDex}`);
                maxGuard = guard;
                maxIndex = localDex;
                max = localMax;
            }
        }
        //@ts-ignore
        return maxIndex * parseInt(maxGuard.id);
    }
}

Day4.run();