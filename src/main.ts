function main() {
    let field = new Field(443, 443);
    let canvas = new Canvas(document.getElementById("field") as HTMLCanvasElement);

    for (let i = 0; i < 445; i++) {

        field.cells[i][0] = new Cell(ALIVE, [{ r: 255, g: 255, b: 255 }, { r: 191, g: 191, b: 191 }, { r: 127, g: 127, b: 127 }]);
        field.cells[0][i] = new Cell(ALIVE, [{ r: 255, g: 255, b: 255 }, { r: 191, g: 191, b: 191 }, { r: 127, g: 127, b: 127 }]);
    }

    setInterval(() => {
        field = field.next();
        canvas.draw(field);
    }, 1000 / 10);
}

window.onload = function () {
    main();
}