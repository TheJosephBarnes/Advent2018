import * as momentType from 'moment';
import moment from 'moment';

class Day11 {
    public static run() {
        let serial: number = 5791;
        this.findFuel(serial);
        this.findAnyFuel(serial);
    }

    private static getPower(x: number, y: number, serial: number): number {
        let power: number = 0;
        let rackId: number = x + 10;
        power = (rackId * y + serial) * rackId;
        power = Math.floor(power/100 % 10) - 5;

        return power;
    }

    private static printGrid(grid: number[][]) {
        let output: string = '';
        for(let x = 1; x <= grid.length; x++) {
            for(let y = 1; y <= grid.length; y++) {
                output += `${grid[x-1][y-1]} `;
            }
            output += '\n';
        }
        console.log(output);
    }

    public static findFuel(serial: number) {
        let size: number = 100;
        let grid: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
        let max: number = 0;
        let maxCoords: [number, number] = [0,0];

        // this.printGrid(grid);

        // build grid
        for(let x = 1; x <= size; x++) {
            for(let y = 1; y <= size; y++) {
                // grid[x-1][y-1] = this.getPower(x,y,serial);
                grid[x-1][y-1] = Math.floor((((x+10) * y + serial) * (x+10))/100 % 10) - 5;

                let triplePower: number = 0;
                if(x>2 && y>2) {
                    for (let testX = x-2; testX <= x; testX++) {
                        for (let testY = y-2; testY <= y; testY++) {
                            triplePower += grid[testX-1][testY-1];
                        }
                    }
                }

                if(triplePower > max) {
                    maxCoords = [x-2,y-2];
                    max = triplePower;
                }
            }
        }

        // this.printGrid(grid);
        
        console.log(`serial ${serial} - max of ${max} at ${maxCoords[0]},${maxCoords[1]}`);
    }



    public static findAnyFuel(serial: number) {
        let size: number = 300;
        let grid: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
        let max: number = 0;
        let maxSize: number = 0;
        let maxCoords: [number, number] = [0,0];

        // this.printGrid(grid);

        // build grid
        for(let x = 1; x <= size; x++) {
            for(let y = 1; y <= size; y++) {
                // grid[x-1][y-1] = this.getPower(x,y,serial);
                grid[x-1][y-1] = Math.floor((((x+10) * y + serial) * (x+10))/100 % 10) - 5;
            }
        }

        for(let testSize = 1; testSize <= size; testSize++) {
            for(let x = 1; x <= size; x++) {
                for(let y = 1; y <= size; y++) {
                    let currentPower: number = 0;
                    if(x>=testSize && y>=testSize) {
                        for (let testX = x-testSize; testX < x; testX++) {
                            for (let testY = y-testSize; testY < y; testY++) {
                                currentPower += grid[testX][testY];
                            }
                        }
                    }

                    if(currentPower > max) {
                        maxCoords = [x-testSize+1,y-testSize+1];
                        maxSize = testSize;
                        max = currentPower;
                    }
                }
            }
        }        
        
        console.log(`serial ${serial} - max of ${max} at ${maxCoords[0]},${maxCoords[1]} with size ${maxSize}`);
    }
}

Day11.run();