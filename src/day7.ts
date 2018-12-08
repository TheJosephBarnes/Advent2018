import { chmod } from "fs";

interface Cmd {
    name: string,
    before: string[],
    after: string[]
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
                    after: [inst.second]
                });
            }

            if(snd) {
                commands[commands.indexOf(snd)].before.push(inst.first);
            } else {
                commands.push({
                    name: inst.second,
                    before: [inst.first],
                    after: []
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
            let index: number = 1;
            let noPredecessors: boolean = eval(current.before.map(c => {
                return runtime.indexOf(c) >= 0;
            }).join(' && ')) || current.before.length === 0;
            // console.log(`${current.name} has no preds - ${noPredecessors}`);
            let before: string[] = queue.map(c => c.name);

            if (noPredecessors) { // if current has no remaining befores

                // add all after to queue
                if (current.after.length !== 0) {
                    current.after.sort((a,b) => {
                        return a < b ? -1 : 1;
                    });
                    for(let add of current.after) {
                        let next: Cmd = commands.find(cmd => cmd.name === add) as Cmd;
                        // console.warn(`${add} returns ${JSON.stringify(next)}`);

                        if(queue.indexOf(next) === -1) queue.splice(index++,0,next);
                    }
                }

                // add current to runtime
                runtime += current.name;
                console.log(JSON.stringify(current));

                //remove current from queue
                queue.splice(0,1);
            } else {
                // console.log(`${current.name} waiting on ${}`)
                queue.splice(0,1);
                queue.push(current);
                if (queue[0] === queue[1]) break;
                // console.log(`moved first one spot - ${JSON.stringify(queue.map(c => c.name))}`);
            }

            let after: string[] = queue.map(c => c.name)
            // console.log(`${JSON.stringify(before)} -> ${JSON.stringify(after)} = ${runtime}`);
        }

        return runtime;
    }
}

Day7.run();