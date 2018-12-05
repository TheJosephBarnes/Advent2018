class Day2 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day2.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: string[] = fileText.split('\n');
                this.doPuzzles(instructions);
            }
        })
    }

    public static doPuzzles(input: string[]) {
        console.log(`checksum output - ${this.checksum(input)}`);
        console.log(`almost output - ${this.almost(input)}`);
    }

    public static checksum(input: string[]) {
        let twice: number = 0;
        let thrice: number = 0;
        let place: number = 0;

        while(place < input.length) {
            let two: boolean = false,
                three: boolean = false;
            
            input[place].split('').sort().join('').replace(/(.)\1*/g, (chars: string) => {
                if (chars.length === 2) two = true;
                if (chars.length === 3) three = true;
                return chars;
            });

            if (two) twice++;
            if (three) thrice++;

            place++;
        }
        return twice * thrice;
    }

    public static almost(input: string[]) {
        let output: string = '';
        for(let first of input) {
            for(let second of input) {
                let index: number = 0;
                let diff: number = 0;
                let likes: string = '';

                while(index < first.length) {
                    if(first[index] !== second[index]) {
                        diff++;
                    } else {
                        likes = likes.concat(first[index]);
                    }

                    index++;
                }

                if(diff === 1) {
                    output = likes;
                    break;
                }
            }
        }
        return output;
    }

}

Day2.run();