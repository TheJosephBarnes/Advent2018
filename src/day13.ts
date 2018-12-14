import * as momentType from 'moment';
import moment from 'moment';

interface Cart {
    coords: [number, number],  //[ x - up/down, y - left/right]
    direction: '^'|'v'|'<'|'>',
    turn: number        // 0-left, 1-straight, 2-right
}

class Day12 {
    public static run() {
        const fs = require('fs');
        fs.readFile('inputs/day13.txt', 'utf8', (err: Error, fileText: string) => {
            if (fileText) {
                this.collisionDetection(fileText.split('\n'));
                this.cartRoyale(fileText.split('\n'));
            }
        });
    }

    private static printGrid(grid: string[][], carts?: Cart[]) {
        let output: string = '';

        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
                let next: string = '';
                next = `${grid[x][y]} `;
                if (carts) {
                    carts.forEach((cart) => {
                        if (cart.coords.toString() === `${x},${y}`) {
                            // console.log('here');
                            next = `${cart.direction.charAt(0)} `;
                        }
                    });
                }
                output += next;
            }
            output += '\n';
        }
        console.log(output);
    }

    private static moveCart(cart: Cart, grid: string[][]): Cart {
        if (cart.direction === '^') cart.coords[0]--;
        else if (cart.direction === 'v') cart.coords[0]++;
        else if (cart.direction === '<') cart.coords[1]--;
        else if (cart.direction === '>') cart.coords[1]++;

        let x: number = cart.coords[0],
            y: number = cart.coords[1];

        if (grid[x][y] === '+') {
            if (cart.turn === 1) {
                cart.turn = 2;
            } else {
                if (cart.direction === '^') cart.turn === 0 ? cart.direction = '<' : cart.direction = '>';
                else if (cart.direction === 'v') cart.turn === 0 ? cart.direction = '>' : cart.direction = '<';
                else if (cart.direction === '<') cart.turn === 0 ? cart.direction = 'v' : cart.direction = '^';
                else if (cart.direction === '>') cart.turn === 0 ? cart.direction = '^' : cart.direction = 'v';
                cart.turn = (cart.turn+1) % 3;
            }
        } else if (grid[x][y] === '/') {
            if (cart.direction === '<') cart.direction = 'v';
            else if (cart.direction === '^') cart.direction = '>';
            else if (cart.direction === '>') cart.direction = '^';
            else if (cart.direction === 'v') cart.direction = '<';
        } else if (grid[x][y] === '\\') {
            if (cart.direction === '<') cart.direction = '^';
            else if (cart.direction === '^') cart.direction = '<';
            else if (cart.direction === '>') cart.direction = 'v';
            else if (cart.direction === 'v') cart.direction = '>';
        }

        return cart;
    }

    public static collisionDetection(input: string[]) {
        let grid: string[][] = input.map(row => row.split(''));
        let carts: Cart[] = [];
        let crash: boolean = false;

        // find and mark intersections and carts
        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
                let char: string = grid[x][y];
                if (char === '^' || char === 'v' || char === '<' || char === '>') {
                    carts.push({
                        coords: [x,y],
                        direction: char,
                        turn: 0
                    });

                    if (char === '^' || char === 'v') {
                        grid[x][y] = '|'
                    } else {
                        grid[x][y] = '-';
                    }
                }
            }
        }

        // console.log(JSON.stringify(carts));
        // this.printGrid(grid, carts);

        // let testRuns: number = 0;
        while(!crash) {
            let cart: Cart = carts.shift() as Cart;
            carts.push(this.moveCart(cart, grid));

            // check for collisions
            let crashCoords: [number,number] = [-1,-1];
            let check: string[] = [];
            carts.map(cart => cart.coords.toString())
            .forEach((cart) => {
                if (check.indexOf(cart) < 0) {
                    check.push(cart);
                } else {
                    crash = true;
                    console.log(`part 1 - crash at ${cart.split(',').reverse()}`);
                }
            });
            // this.printGrid(grid, carts);
            // testRuns++;
        }
    }

    public static cartRoyale(input: string[]) {
        let grid: string[][] = input.map(row => row.split(''));
        let carts: Cart[] = [];

        // find and mark intersections and carts
        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
                let char: string = grid[x][y];
                if (char === '^' || char === 'v' || char === '<' || char === '>') {
                    carts.push({
                        coords: [x,y],
                        direction: char,
                        turn: 0
                    });

                    if (char === '^' || char === 'v') {
                        grid[x][y] = '|'
                    } else {
                        grid[x][y] = '-';
                    }
                }
            }
        }

        // console.log(JSON.stringify(carts));
        // this.printGrid(grid, carts);

        // let testRuns: number = 0;
        while(carts.length > 1) {
            let cart: Cart = carts.shift() as Cart;
            carts.push(this.moveCart(cart, grid));

            // check for collisions
            let crashCoords: string = '';
            let check: string[] = [];
            carts.map(cart => cart.coords.toString())
            .forEach((cart) => {
                if (check.indexOf(cart) < 0) {
                    check.push(cart);
                } else {
                    crashCoords = cart;
                }
            });

            carts = carts.filter((cart) => cart.coords.toString() !== crashCoords);
            // this.printGrid(grid, carts);
            // testRuns++;
        }
        // this.printGrid(grid,carts);
        console.log(carts);
        console.log(`part 2 - final cart at ${carts[0].coords.reverse()}, ${carts[0].direction}`);
    }
}

Day12.run();