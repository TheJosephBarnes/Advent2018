import { chmod } from "fs";

interface Cmd {
    name: string,
    before: string[],
    after: string[],
    done: number
}

class Day7 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day7.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: string[] = fileText.split('\n');
                this.doPuzzles(instructions);
            }
        });
    }

    public static doPuzzles(input: string[]) {
        console.log(`runtime output - ${this.orderRuntime(input)}`);
        console.log(`threaded output - ${this.multiThread(input)}`);
    }

    public static orderRuntime(input: string[]) {
        let runtime: string = '';
        let commands: Cmd[] = [];
        let instReg: RegExp = /Step (\w) .+ step (\w) .+./;
        let instructions: {first: string, second: string}[] = input.map(inst => {
            let reg: RegExpExecArray = instReg.exec(inst) as RegExpExecArray,
                [,first,second] = reg;
            return {first, second};
        });
        
        for(let inst of instructions) {
            let fst: Cmd = commands.find(c => c.name === inst.first) as Cmd;
            let snd: Cmd = commands.find(c => c.name === inst.second) as Cmd;

            if(fst) {
                commands[commands.indexOf(fst)].after.push(inst.second);
            } else {
                commands.push({
                    name: inst.first,
                    before: [],
                    after: [inst.second],
                    done: 0
                });
            }

            if(snd) {
                commands[commands.indexOf(snd)].before.push(inst.first);
            } else {
                commands.push({
                    name: inst.second,
                    before: [inst.first],
                    after: [],
                    done: 0
                });
            }
        }

        let starters: Cmd[] = commands.filter(cmd => cmd.before.length === 0);
        let queue: Cmd[] = [];
        // console.log(JSON.stringify(commands).replace(/},/g, '\n'));

        queue = starters.sort((a,b) => {
            return a.name < b.name ? -1 : 1;
        });
        // console.log(start);
        while(queue.length !== 0) {
            let current: Cmd = queue[0]
            let noPredecessors: boolean = eval(current.before.map(c => {
                return runtime.indexOf(c) >= 0;
            }).join(' && ')) || current.before.length === 0;
            // console.log(`${current.name} has no preds - ${noPredecessors}`);

            if (noPredecessors) { // if current has no remaining befores

                // add all after to queue
                if (current.after.length !== 0) {
                    current.after.sort((a,b) => {
                        return a < b ? -1 : 1;
                    });
                    for(let add of current.after) {
                        let next: Cmd = commands.find(cmd => cmd.name === add) as Cmd;
                        // console.warn(`${add} returns ${JSON.stringify(next)}`);
                        if(queue.indexOf(next) === -1) queue.push(next);
                    }
                }

                // add current to runtime
                runtime += current.name;
                console.log(JSON.stringify(current));

                //remove current from queue
                queue.splice(0,1);

                //alphabetize
                queue.sort((a,b) => {
                    return a.name < b.name ? -1 : 1;
                });
            } else {
                // console.log(`${current.name} waiting on ${}`)
                queue.splice(0,1);
                queue.push(current);
                if (queue[0] === queue[1]) break;
                // console.log(`moved first one spot - ${JSON.stringify(queue.map(c => c.name))}`);
            }

        }

        return runtime;
    }

    public static multiThread(input: string[]) {
        let runtime: string = '';
        let commands: Cmd[] = [];
        let instReg: RegExp = /Step (\w) .+ step (\w) .+./;
        let instructions: {first: string, second: string}[] = input.map(inst => {
            let reg: RegExpExecArray = instReg.exec(inst) as RegExpExecArray,
                [,first,second] = reg;
            return {first, second};
        });
        
        for(let inst of instructions) {
            let fst: Cmd = commands.find(c => c.name === inst.first) as Cmd;
            let snd: Cmd = commands.find(c => c.name === inst.second) as Cmd;

            if(fst) {
                commands[commands.indexOf(fst)].after.push(inst.second);
            } else {
                commands.push({
                    name: inst.first,
                    before: [],
                    after: [inst.second],
                    done: inst.first.charCodeAt(0) - 4
                });
            }

            if(snd) {
                commands[commands.indexOf(snd)].before.push(inst.first);
            } else {
                commands.push({
                    name: inst.second,
                    before: [inst.first],
                    after: [],
                    done: inst.second.charCodeAt(0) - 4
                });
            }
        }

        let starters: Cmd[] = commands.filter(cmd => cmd.before.length === 0);
        let queue: Cmd[] = [];
        queue = starters.sort((a,b) => {
            return a.name < b.name ? -1 : 1;
        });
        // console.log(start);
        let workers: Cmd[] = [];
        let time: number = 0;


        while(queue.length !== 0) {
            let temp: Cmd[] = [];
            for(let work of workers) { // pop out if timer is up
                if(work.done >= time || work.name === 'fake') {
                    runtime += work.name;
                } else {
                    temp.push(work);
                }
            }
            workers = temp;

            while(workers.length < 5) { // pull up to 5 commands off the queue
                let current: Cmd = queue[0]
                let noPredecessors: boolean = eval(current.before.map(c => {
                    return runtime.indexOf(c) >= 0;
                }).join(' && ')) || current.before.length === 0;

                if (noPredecessors) { // if current has no remaining befores
                    if (current.after.length !== 0) {
                        current.after.sort((a,b) => {
                            return a < b ? -1 : 1;
                        });
                        for(let add of current.after) {
                            let next: Cmd = commands.find(cmd => cmd.name === add) as Cmd;
                            if(queue.indexOf(next) === -1) queue.push(next);
                        }
                    }
                    //remove current from queue, add to workers
                    queue.splice(0,1);
                    current.done = current.name.charCodeAt(0) - 4 + time;

                    //alphabetize
                    queue.sort((a,b) => {
                        return a.name < b.name ? -1 : 1;
                    });
                } else {
                    queue.splice(0,1);
                    queue.push(current);
                    if (queue[0] === queue[1]) break;
                }
            }
        }
    }
}

Day7.run();