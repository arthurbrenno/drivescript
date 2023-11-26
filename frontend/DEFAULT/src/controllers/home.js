/********************************************
 * Para realizar requisições para o BACKEND *
 ********************************************/
const http = require('../assets/http');

/***********
 * Imports *
 ***********/
const fs                 = require('fs');
const path               = require('path');
const { renderizarView } = require('../helpers/renderizador');
//require('dotenv').config();

/**
 * Renderiza a página HOME.
 * @param {*} req 
 * @param {*} res 
 * @returns response com o conteúdo Renderizado.
 */
const getHome = async (req, res) => {
    try {

        /*********************************************************
         * Constantes padrões. O que vai ser alterado            *
         * é o "caminhoConteudo", que será o conteúdo da página. *
         *********************************************************/
        const rotaBackend     = "http://localhost:3000/api";
        const caminhoHeader   = path.join(__dirname, '../views/components/header.html');
        const caminhoFooter   = path.join(__dirname, '../views/components/footer.html');
        const caminhoTemplate = path.join(__dirname, '../views/components/main.ejs');
        const caminhoConteudo = path.join(__dirname, '../views/pages/home.html');

        /*****************************
         * O que será substituído em *
         * "main.ejs"                *
         *****************************/
        const header  = await renderizarView(caminhoHeader);
        const footer  = await renderizarView(caminhoFooter);
        const content = await renderizarView(caminhoConteudo);

        /********************************
         * Caso precisássemos fazer uma *
         * requisição para o backend,   *
         * usariamos o axios.           *
         ********************************/
        const res = await http.post(`${rotaBackend}/login`, {
            user: "admin",
            password:"admin",
        });
        
        /****************************************
         * Renderizando e mandando uma resposta *
         ****************************************/
        res.render(caminhoTemplate, {
            titulo: 'Home',
            header: header,
            conteudo: content,
            footer: footer,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { getHome };