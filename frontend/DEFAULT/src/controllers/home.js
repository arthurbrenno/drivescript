// controllers/homeController.js
const fs = require('fs');
const path = require('path');
const { renderizarView } = require('../helpers/renderizador');

const getHome = async (req, res) => {
    try {
        const caminhoHeader   = path.join(__dirname, '../views/components/header.html');
        const caminhoFooter   = path.join(__dirname, '../views/components/footer.html');
        const caminhoTemplate = path.join(__dirname, '../views/components/main.ejs');
        const caminhoConteudo = path.join(__dirname, '../views/pages/home.html');

        const header  = await renderizarView(caminhoHeader);
        const footer  = await renderizarView(caminhoFooter);
        const content = await renderizarView(caminhoConteudo);

        res.render(caminhoTemplate, {
            titulo: 'Home',
            header: header,
            conteudo: content,
            footer: footer,
        });
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { getHome };