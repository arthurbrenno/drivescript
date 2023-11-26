const express = require("express");
const app = express();

app.use('/', require('./routes/home'));

const getCurrentTime = () => {
    const now     = new Date();
    const hours   = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

app.listen(8000, () => {
    console.clear();
    console.log(`[online] Servidor FrontEnd`);
    console.log(`Última atualização: ${getCurrentTime()}`)
});
