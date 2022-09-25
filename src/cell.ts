const ALIVE = true;
const DEAD = false;

class Field {
    cells: boolean[][];
    size: { x: number, y: number };

    constructor(x: number, y: number) {
        this.size = { x: x, y: y };
        this.cells = new Array(y + 2);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(x + 2).fill(DEAD);
        }
    }

    count(x: number, y: number){
        //周りの生存マスを数える
        let r = 0;
        for (let l = -1; l < 2; l++) {
            for (let m = -1; m < 2; m++) {
                //自分自身は除く
                if (l != 0 || m != 0) {
                    //もし生存してたらインクリメント
                    if (this.cells[x + l][y + m] == ALIVE) {
                        r++;
                    }
                }
            }
        }

        return r;
    }

    next() {
        let nextField = new Field(this.size.x, this.size.y);

        for (let i = 1; i < this.size.y + 1; i++) {
            for (let j = 1; j < this.size.x + 1; j++) {
                let count = this.count(i, j);

                if(this.cells[i][j] == ALIVE){
                    if (count == 2 || count == 3) {
                        nextField.cells[i][j] = ALIVE;
                    }
                    else{
                        nextField.cells[i][j] = DEAD;
                    }
                }else{
                    if (count == 3) {
                        nextField.cells[i][j] = ALIVE;
                    }
                    else{
                        nextField.cells[i][j] = DEAD;
                    }
                }
            }
        }

        //以下、番兵の設定
        for (let i = 1; i < this.size.y + 1; i++) {
            nextField.cells[i][0] = nextField.cells[i][this.size.x];
            nextField.cells[i][this.size.x + 1] = nextField.cells[i][1];
        }

        for (let i = 1; i < this.size.x + 1; i++) {
            nextField.cells[0][i] = nextField.cells[this.size.y][i];
            nextField.cells[this.size.y + 1][i] = nextField.cells[1][i];
        }

        nextField.cells[0][0] = nextField.cells[this.size.y][this.size.x];
        nextField.cells[this.size.y + 1][this.size.x + 1] = nextField.cells[1][1];
        nextField.cells[this.size.y + 1][0] = nextField.cells[1][this.size.x];
        nextField.cells[0][this.size.x + 1] = nextField.cells[this.size.y][1];

        return nextField;
    }
}