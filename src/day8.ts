interface Node {

}

class Day8 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day8.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: string[] = fileText.split(' ');
                this.doPuzzles(instructions);
            }
        });
    }

    public static doPuzzles(input: string[]) {
        console.log(`metadata output - ${this.metadata(input)}`);
    }

    public static metadata(input: string[]): number {
        // call recursively, pass metadata sums back up the chain, return a number
        let sum: number = 0;

        

        return sum
    }
}

Day8.run();