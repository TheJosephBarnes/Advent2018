import * as momentType from 'moment';
import moment from 'moment';

class Day13 {
    public static run() {
        let start: momentType.Moment = moment();
        // this.cook(864801);
        this.cheat(864801);
        this.tooManyCooks(864801);
        console.log(moment().diff(start));
    }
    
    public static tooManyCooks(rounds: number) {
        let start: momentType.Moment = moment();
        let elf1: number = 0;
        let elf2: number = 1;
        let recipes: string = '37';

        while(recipes.length < rounds+10) {
            recipes += (parseInt(recipes.charAt(elf1)) + parseInt(recipes.charAt(elf2))).toString();
            // recipes = recipes.concat((recipes[elf1] + recipes[elf2]).toString().split('').map(c => parseInt(c)));
            elf1 = (elf1 + parseInt(recipes.charAt(elf1)) + 1) % recipes.length;
            elf2 = (elf2 + parseInt(recipes.charAt(elf2)) + 1) % recipes.length;

            // console.log(recipes);
        }

        console.log(recipes);
        console.log(`part 1 - score of ${recipes.substring(rounds,rounds+10)} at ${moment().diff(start)}`);
        let pt2: number = recipes.indexOf(rounds.toString());

        while(pt2 === -1) {
            let n: number = 10000000
            while(recipes.length < n) {
                recipes += (parseInt(recipes.charAt(elf1)) + parseInt(recipes.charAt(elf2))).toString();
                // recipes = recipes.concat((recipes[elf1] + recipes[elf2]).toString().split('').map(c => parseInt(c)));
                elf1 = (elf1 + parseInt(recipes.charAt(elf1)) + 1) % recipes.length;
                elf2 = (elf2 + parseInt(recipes.charAt(elf2)) + 1) % recipes.length;
            }
            console.log(`${n} recipes at ${moment().diff(start)}`);
            n += 10000000;
            pt2 = recipes.indexOf(rounds.toString());
        }
        console.log(`part 2 - ${recipes.substring(0,pt2).length}`);
    }

    public static cheat(rounds: number) {
        let n: string = rounds.toString();
        let [r, [a, b], i] = [[3, 7], [0, 1], -1];
        while (i < 0) {
            for (let c of (r[a] + r[b]).toString()) r.push(+c);
            [a, b] = [(a + r[a] + 1) % r.length, (b + r[b] + 1) % r.length];
            if (r.length === +n + 10) console.log(r.slice(+n, +n + 10).join(''));
            let tail = r.slice(-10).join('');
            i = tail.indexOf(n) < 0 ? -1 : tail.indexOf(n) + r.length - 10;
        }
        console.log(i);
    }
}

Day13.run();