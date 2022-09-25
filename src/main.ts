function main(){
    let field = new Field(32, 32);
    let canvas = new Canvas(document.getElementById("field") as HTMLCanvasElement);

    field.cells[2][2] = ALIVE;
    field.cells[2][3] = ALIVE;
    field.cells[2][4] = ALIVE;
    field.cells[3][4] = ALIVE;
    field.cells[4][3] = ALIVE;

    field.cells[16][15] = ALIVE;
    field.cells[16][16] = ALIVE;
    field.cells[16][17] = ALIVE;
    field.cells[17][15] = ALIVE;
    field.cells[18][16] = ALIVE;

    setInterval(() => {
        field = field.next();
        canvas.draw(field);
    }, 1000 / 10);
}

window.onload = function () {
    main();
}