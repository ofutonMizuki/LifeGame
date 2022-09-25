class Canvas {
    canvas: HTMLCanvasElement;
    offset: { x: number, y: number };
    size: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.offset = {x: 0, y: 0};
        this.size = 0;
    }

    draw(field: Field) {
        this.resize(field);

        let ctx = this.canvas.getContext("2d");

        if(ctx){
            //Canvas領域を塗りつぶす
            ctx.fillStyle = `rgb(31, 31, 31)`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        this.drawField(field);
    }

    drawField(field: Field){
        let ctx = this.canvas.getContext("2d");

        if(ctx){
            for(let i = 0; i < field.size.y; i++){
                for(let j = 0; j < field.size.x; j++){
                    let x = j * this.size + this.offset.x;
                    let y = i * this.size + this.offset.y;
    
                    if(field.cells[i + 1][j + 1]){
                        ctx.fillStyle = `rgb(255, 255, 255)`;
                        ctx.fillRect(x + this.size * 0.02, y + this.size * 0.02, this.size * 0.98, this.size * 0.98);
                    }
                }
            }
        }
    }

    resize(field: Field) {
        let board = document.getElementById('board');

        if(!board){
            return;
        }
        //サイズを取得
        let width = board.clientWidth;
        let height = board.clientHeight;

        //描画領域のサイズを設定
        this.canvas.setAttribute("width", width.toString());
        this.canvas.setAttribute("height", height.toString());

        //縦横狭いほうのサイズに合わせて盤面のサイズとオフセットを変更
        if (width > height) {
            this.size = width / field.size.x;
            this.offset.x = (width - width) / 2;
            this.offset.y = (height - width) / 2;
        }
        else {
            this.size = height / field.size.y;
            this.offset.x = (width - height) / 2;
            this.offset.y = (height - height) / 2;
        }
    }
}