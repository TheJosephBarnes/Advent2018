class Day3 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day3.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: string[] = fileText.split('\n');
                this.doPuzzles(instructions);
            }
        })
    }

    public static doPuzzles(input: string[]) {
        console.log(`overlap output - ${this.overlap(input)}`);
        console.log(`find claim output - ${this.findClaim(input)}`);
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

    public static overlap(input: string[]) {
        let field: number[][] = Array(1000).fill(0).map(()=>Array(1000).fill(0));
        let cmdRegEx: RegExp = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
        let area: number = 0;

        // this.printField(field);
        // console.warn(`input - ${input}`);

        for(let claim of input) {
            // console.warn(`claim - ${claim}`);
            let claimInfo: RegExpExecArray = cmdRegEx.exec(claim) as RegExpExecArray;
            // console.warn(`claimInfo - ${claimInfo}`);
            let posY: number = parseInt(claimInfo[2]);
            let posX: number = parseInt(claimInfo[3]);
            let height: number = parseInt(claimInfo[4]);
            let width: number = parseInt(claimInfo[5]);

            let maxX: number = posX + width;
            let maxY: number = posY + height;

            for(let x: number = posX; x < maxX; x++) {
                for(let y: number = posY; y < maxY; y++) {
                    if (!field[x][y]) {
                        field[x][y] = 0;
                    }
                    field[x][y]++;
                }
            }

            // this.printField(field);
        }
        
        for(let column of field) {
            for(let row of column) {
                if (row > 1) {
                    area++;
                }
            }
        }
        return area;
    }

    public static findClaim(input: string[]) {
        let field: string[][] = Array(1000).fill('0').map(()=>Array(1000).fill('0'));
        let cmdRegEx: RegExp = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

        for(let claim of input) { // build field
            let claimInfo: RegExpExecArray = cmdRegEx.exec(claim) as RegExpExecArray;
            let id: string = claimInfo[1];
            let posY: number = parseInt(claimInfo[2]);
            let posX: number = parseInt(claimInfo[3]);
            let height: number = parseInt(claimInfo[4]);
            let width: number = parseInt(claimInfo[5]);

            let maxX: number = posX + width;
            let maxY: number = posY + height;

            for(let x: number = posX; x < maxX; x++) {
                for(let y: number = posY; y < maxY; y++) {
                    if (field[x][y] !== '0') {
                        field[x][y] = 'X';
                    } else {
                        field[x][y] = id;
                    }
                }
            }
        }
        // this.printField(field);

        for(let claim of input) {  // check for clean claim
            let clean: boolean = true;
            let claimInfo: RegExpExecArray = cmdRegEx.exec(claim) as RegExpExecArray;
            let id: string = claimInfo[1];
            let posY: number = parseInt(claimInfo[2]);
            let posX: number = parseInt(claimInfo[3]);
            let height: number = parseInt(claimInfo[4]);
            let width: number = parseInt(claimInfo[5]);

            let maxX: number = posX + width;
            let maxY: number = posY + height;

            for(let x: number = posX; x < maxX; x++) {
                for(let y: number = posY; y < maxY; y++) {
                    if (field[x][y] === 'X') clean = false;
                }
            }

            if (clean) return id;
        }

        return 'no claim found';
    }
}

Day3.run();