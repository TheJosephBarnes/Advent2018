class Day1 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day1.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                this.doPuzzles(fileText);
            }
        })
    }

    public static doPuzzles(input: string) {
        console.log(`modulator output - ${this.modulator(input)}`);
        console.log(`smartModulator output - ${this.smartModulator(input)}`);
    }

    public static modulator(text: string): number {
        let instructions: string[] = text.split('\n');
        let frequency: number = 0;
        let place: number = 0;
    
        if (instructions[instructions.length - 1] === "") instructions.pop();

        while (place < instructions.length) {
            frequency += parseInt(instructions[place++]);
        }
        
        return frequency;
    }

    public static smartModulator(text: string): number {
        let instructions: string[] = text.split('\n');
        let frequency: number = 0;
        let freqs: number[] = [0];
        let place: number = 0;

        if (instructions[instructions.length - 1] === "") instructions.pop();
    
        while (true) {
            frequency += parseInt(instructions[place++]);

            if (place === instructions.length) {
                place = 0;
            }

            if (freqs.indexOf(frequency) >= 0) {
                break;
            } else {
                freqs.push(frequency);
            }
        }
        
        return frequency;
    }
}

Day1.run();