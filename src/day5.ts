class Day5 {
    private static AlphaReg: RegExp = /(aA|Aa|bB|Bb|cC|Cc|dD|Dd|eE|Ee|fF|Ff|gG|Gg|hH|Hh|iI|Ii|jJ|Jj|kK|Kk|lL|Ll|mM|Mm|nN|Nn|oO|Oo|pP|Pp|qQ|Qq|rR|Rr|sS|Ss|tT|Tt|uU|Uu|vV|Vv|wW|Ww|xX|Xx|yY|Yy|zZ|Zz)/g

    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day5.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                this.doPuzzles(fileText);
            }
        })
    }

    public static doPuzzles(input: string) {
        console.log(`all folds output - ${this.polymerFold(input).length}`);
        console.log(`best fold output - ${this.smartFold(input).length}`);
    }

    public static polymerFold(input: string): string {
        let rep: string = input.replace(this.AlphaReg, '');
        if (rep === input) {
            // console.log(`expected output - dabCBAcaDA, 10`);
            return input;
        } else {
            return this.polymerFold(rep);
        }
    }

    private static smartFold(input: string): string {
        let bestChar: string = '';
        let bestFold: string = input;

        for(let n = 1; n <= 26; n++) {
            let char: string = String.fromCharCode(97 + n);
            let reg: RegExp = new RegExp(`${char}`, 'gi');
            let removed: string = input.replace(reg, '');
            let output: string = this.polymerFold(removed);

            if(output.length < bestFold.length) {
                bestFold = output;
                bestChar = char;
            }
        }

        return bestFold;
    }
}

Day5.run();