const ALIVE = true;
const DEAD = false;

class Cell {
    isAlive: boolean;
    color: {
        r: number,
        g: number,
        b: number
    }[];


    constructor(isAlive: boolean, color: { r: number, g: number, b: number }[]) {
        this.isAlive = isAlive;
        this.color = JSON.parse(JSON.stringify(color));
    }

    clone() {
        return JSON.parse(JSON.stringify(this));
    }

    getMaxColor() {
        let r = this.color.length;
        let _color: { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 };

        for (let i = 0; i < r; i++) {
            if (_color.r < this.color[i].r) {
                _color.r = this.color[i].r;
            }
            if (_color.g < this.color[i].g) {
                _color.g = this.color[i].g;
            }
            if (_color.b < this.color[i].b) {
                _color.b = this.color[i].b;
            }
        }

        return _color;
    }

    getRandomColor() {
        function rand(r: number) {
            return Math.floor((Math.random() * r));
        }

        let r = this.color.length;
        let _color: { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 };

        _color.r = this.color[rand(r)].r;
        _color.g = this.color[rand(r)].g;
        _color.b = this.color[rand(r)].b;

        return _color;
    }
}

class Field {
    cells: Cell[][];
    size: { x: number, y: number };

    constructor(x: number, y: number) {
        this.size = { x: x, y: y };
        this.cells = new Array(y + 2);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(x + 2).fill(new Cell(DEAD, new Array()));
        }
    }

    getColors(x: number, y: number) {
        //周りの生存マスを数える
        let colors = new Array();
        for (let l = -1; l < 2; l++) {
            for (let m = -1; m < 2; m++) {
                //自分自身は除く
                if (l != 0 || m != 0) {
                    //もし生存してたらインクリメント
                    if (this.cells[x + l][y + m].isAlive == ALIVE) {
                        colors.push(this.cells[x + l][y + m].getRandomColor());
                    }
                }
            }
        }

        return colors;
    }

    next() {
        let nextField = new Field(this.size.x, this.size.y);

        for (let i = 1; i < this.size.y + 1; i++) {
            for (let j = 1; j < this.size.x + 1; j++) {
                let colors = this.getColors(i, j);

                if (this.cells[i][j].isAlive == ALIVE) {
                    if (colors.length == 2 || colors.length == 3) {
                        nextField.cells[i][j] = this.cells[i][j];
                    }
                    else {
                        nextField.cells[i][j].isAlive = DEAD;
                    }
                } else {
                    if (colors.length == 3) {
                        nextField.cells[i][j] = new Cell(ALIVE, colors);
                    }
                    else {
                        nextField.cells[i][j].isAlive = DEAD;
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