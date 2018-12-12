import * as momentType from 'moment';
import moment from 'moment';

class Day11 {
    public static run() {
        let serial: number = 18;
        this.findFuel(serial);
    }

    private static getPower(x: number, y: number, serial: number): number {
        let power: number = 0;
        let rackId: number = x + 10;
        power = (rackId * y + serial) * rackId;
        power = Math.floor(power/100 % 10) - 5;

        return power;
    }

    public static findFuel(serial: number) {
        let size: number = 300;
        let grid: number[][] = Array(size).fill(Array(size).fill(0));
        let max: number = 0;
        let maxCoords: [number, number] = [0,0];

        // build grid
        for(let x = 1; x <= size; x++) {
            for(let y = 1; y <= size; y++) {
                try {
                    grid[x-1][y-1] = this.getPower(x,y,serial);
                } catch (e) {
                    console.log(`error at ${x},${y}`);
                }

                // let triplePower: number = 0;
                // if(x>2 && y>2) {
                //     for (let testX = x-2; testX <= x; testX++) {
                //         for (let testY = y-2; testY <= y; testY++) {
                //             triplePower += grid[testX-1][testY-1];
                //         }
                //     }
                // }

                // if(triplePower > max) {
                //     maxCoords = [x,y];
                //     max = triplePower;
                // }

                if (y > 300) console.log(`ERROR - y out of bounds`);
            }
        }

        for(let x = 3; x <= size; x++) {
            for(let y = 3; y <= size; y++) {
                let triplePower: number = 0;
                for (let testX = x-2; testX <= x; testX++) {
                    for (let testY = y-2; testY <= y; testY++) {
                        triplePower += grid[testX-1][testY-1];
                    }
                }

                if(triplePower > max) {
                    maxCoords = [x,y];
                    max = triplePower;
                }
            }
        }
        
        console.log(`serial ${serial} - max of ${max} at ${maxCoords[0]-2},${maxCoords[1]-2}`);
    }
}

Day11.run();