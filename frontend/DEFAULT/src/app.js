/*
.####.##.....##.########...#######..########..########..######.
..##..###...###.##.....##.##.....##.##.....##....##....##....##
..##..####.####.##.....##.##.....##.##.....##....##....##......
..##..##.###.##.########..##.....##.########.....##.....######.
..##..##.....##.##........##.....##.##...##......##..........##
..##..##.....##.##........##.....##.##....##.....##....##....##
.####.##.....##.##.........#######..##.....##....##.....######.
*/
const express = require("express");
const app = express();
const path = require('path');
const morgan = require('morgan'); // Import morgan

/*
.########...#######..########....###.....######.
.##.....##.##.....##....##......##.##...##....##
.##.....##.##.....##....##.....##...##..##......
.########..##.....##....##....##.....##..######.
.##...##...##.....##....##....#########.......##
.##....##..##.....##....##....##.....##.##....##
.##.....##..#######.....##....##.....##..######.
*/
app.use('/home', require('./routes/home'));

/*
..######...#######..##....##.########.####..######..
.##....##.##.....##.###...##.##........##..##....##.
.##.......##.....##.####..##.##........##..##.......
.##.......##.....##.##.##.##.######....##..##...####
.##.......##.....##.##..####.##........##..##....##.
.##....##.##.....##.##...###.##........##..##....##.
..######...#######..##....##.##.......####..######..
*/
app.set('views', path.join(__dirname, 'views'));

const obterTempoAtual = () => {
    const now = new Date();
    const horas = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    const segundos = now.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
};

app.use(morgan('dev'));

app.listen(8000, () => {
    console.clear();
    console.log(`[online] Servidor FrontEnd na porta 8000`);
    console.log(`Última atualização: ${obterTempoAtual()}`);
});
