interface Point {
    id: string,
    location: number[],
    area: number
    finite: boolean
}

class Day6 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day6.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                let instructions: string[] = fileText.split('\n');
                this.doPuzzles(instructions);
            }
        });
    }

    public static doPuzzles(input: string[]) {
        console.log(`dangerous output - ${this.dangerZone(input)}`);
        console.log(`safe zone output - ${this.safeZone(input).length}`);
    }

    private static initGrid(input: string[], points: Point[]) {
        let max: number = input.join(', ')
                            .split(/\n|, /g)
                            .map(val => parseInt(val))
                            .sort((a,b) => b - a)[0];
        let grid: string[][] = Array(max + 1).fill('.').map(()=>Array(max + 1).fill('.'));
        
        for(let pt of points) {
            let [x, y] = pt.location;
            grid[x][y] = pt.id;
        }

        return grid;
    }

    private static getManhattan(point: number[], target: number[]) {
        let dX: number = Math.abs(point[0] - target[0]);
        let dY: number = Math.abs(point[1] - target[1]);
        return dX + dY;
    }

    private static printGrid(grid: string[][]) {
        let printer: string = '';
        for(let column of grid) {
            for(let row of column) {
                printer += row.length === 1 ? '  ' : ' ';
            }
            printer += '\n';
        }

        console.log(printer);
    }

    public static dangerZone(input: string[]) {
        let ids: number = 0;
        let points: Point[] = input.map((inst) => {
            return {
                id: `${ids++}`,
                location: inst.split(', ').map(a => parseInt(a)).reverse(),
                area: 0,
                finite: true
            };
        });
        let grid: string[][] = this.initGrid(input, points);
        let size: number = grid.length;

        grid.forEach((row, x) => {
            row.forEach((col, y) => {
                let closest: Point | null = null;
                let shortDist: number = size * size;
                let text: string = ' ';

                for(let pt of points) {
                    let dist: number = this.getManhattan([x, y], pt.location);
                    
                    if (dist < shortDist) {
                        shortDist = dist;
                        closest = pt;
                        text = pt.id;
                    } else if (dist === shortDist) {
                        text = '.';
                        closest = null;
                    }
                }
                grid[x][y] = text;

                if (closest) {
                    closest.area++;
                    if(x === 0 || x=== size || y === 0 || y === size) {
                        closest.finite = false;
                    }
                }
            });
        });
        // this.printGrid(grid);

        let sortedPoints: Point[] = points.filter((pt) => {
            return pt.finite;
        }).sort((a, b) => {
            return b.area - a.area;
        });
        let largest: Point = sortedPoints[0];
        
        return largest.area;
    }

    public static safeZone(input: string[]) {
        let ids: number = 0;
        let safeDistance: number = 10000;
        let points: Point[] = input.map((inst) => {
            return {
                id: `${ids++}`,
                location: inst.split(', ').map(a => parseInt(a)).reverse(),
                area: 0,
                finite: true
            };
        });
        let grid: string[][] = this.initGrid(input, points);
        let size: number = grid.length;

        grid.forEach((row, x) => {
            row.forEach((col, y) => {
                let dist: number = 0;

                for(let pt of points) {
                    dist += this.getManhattan([x, y], pt.location);
                }

                grid[x][y] = `${dist}`;
            });
        });

        let safe: number[] = [];
        grid.forEach(col => {
            safe = safe.concat(col.map(val => parseInt(val)));
        });
        // console.log(JSON.stringify(safe));
        safe = safe.filter(dist => dist <= safeDistance) as number[];

        return safe;
    }
}

Day6.run();