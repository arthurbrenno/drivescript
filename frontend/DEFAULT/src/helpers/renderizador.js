const fs = require('fs').promises;

/**
 * A função `renderizarView` lê o conteúdo de um arquivo de forma assíncrona, substitui os parâmetros
 * especificados e retorna o conteúdo modificado como uma string.
 * @param caminhoArquivo - O parâmetro "caminhoArquivo" representa o caminho do arquivo da view
 * que precisa ser renderizado.
 * @param parametros - O parâmetro "parametros" é um objeto contendo os pares de chave-valor
 * a serem substituídos no conteúdo do arquivo.
 * @returns A função `renderizarView` retorna o conteúdo do arquivo especificado por `caminhoArquivo`
 * com os parâmetros substituídos como uma string.
 */
const renderizarView = async (caminhoArquivo, parametros = {}) => {
    try {
        let conteudoView = await fs.readFile(caminhoArquivo, 'utf8');

        Object.keys(parametros).forEach(chave => {
            const regex = new RegExp(`{{\\s*${chave}\\s*}}`, 'g');
            conteudoView = conteudoView.replace(regex, parametros[chave]);
        });

        return conteudoView;
    } catch (err) {
        console.error(err);
        throw new Error('Erro ao renderizar o arquivo.');
    }
};

module.exports = { renderizarView };
