interface Node {

}

class Day8 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/test8.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: number[] = fileText.split(' ').map(a => parseInt(a));
                this.doPuzzles(instructions);
            }
        });
    }

    public static doPuzzles(input: number[]) {
        let dup: number[] = input.slice();
        console.log(`metadata output - ${this.metadata(input)}`);
        console.log(`root val output - ${this.rootVal(dup)}`);
    }

    public static metadata(input: number[]): number {
        // call recursively, pass metadata sums back up the chain, return a number
        let sum: number = 0;
        
        let numChildren: number = input.shift() as number;
        let numMeta: number = input.shift() as number;

        for (let n = 0; n < numChildren; n++) sum += this.metadata(input);

        for (let n = 0; n < numMeta; n++) sum += input.shift() as number;

        return sum;
    }
    
    metaVals: number[] = []

    public static rootVal(input: number[]): number {
        let val: number = 0;
        let state: number[] = input.slice();
        let numChildren: number = input.shift() as number;
        let numMeta: number = input.shift() as number;
        let meta: number[] = input.slice(input.length - numMeta, numMeta); // can't do this!

        if (numChildren === 0) {
            val += meta.reduce((acc,num) => acc + num, 0);
        } else {
            meta.filter((n) => n <= numChildren);
            for (let met of meta) {
                for (let n = 0; n < numChildren; n++) {
                    if(n === met) {
                        let update: number = this.rootVal(input);
                        val += update;
                    }
                }
            }
        }
        console.log(`${state} - ${val}`);

        return val;
    }
}

Day8.run();