const fs = require('fs').promises;

/**
 * A função `renderizarView` lê o conteúdo de um arquivo de forma assíncrona e retorna o conteúdo como
 * uma string.
 * @param caminhoArquivo - O parâmetro "caminhoArquivo" representa o caminho do arquivo da view
 * que precisa ser renderizado.
 * @returns A função `renderizarView` retorna o conteúdo do arquivo especificado por `caminhoArquivo`
 * como uma string.
 */

const renderizarView = async (caminhoArquivo) => {
    try {
        const conteudoView = await fs.readFile(caminhoArquivo, 'utf8');
        return conteudoView;
    } catch (err) {
        console.error(err);
        throw new Error('Erro ao renderizar O Arquivo.');
    }
};

module.exports = { renderizarView };
