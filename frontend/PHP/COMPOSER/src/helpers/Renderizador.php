<?php

/* Copyright (C) 2023 Arthur Brenno - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the MIT license with
 * this file. If not, please write to: , or visit : uniube.com.br
 */
namespace Aw\Drivescript\helpers;

use Exception;

/**
 * Classe responsável por realizar as operações
 * que envolvem a renderização de componentes
 * isolados de uma aplicação
 * @author Arthur Brenno <arthurbreno009@icloud.com>
 * @access public
 * @copyright 2023 Arthur Brenno
 * @version 1.0
 * @since 19/11/2023
 * @see https://www.example.com
 */
class Renderizador 
{
    private readonly array $_caminhoViews;
    private readonly string $_padraoAbertura;
    private readonly string $_padraoFechamento;


    /**
     * Construtor
     * @access private
     */
    private function __construct(array $config)
    {
        self::verificarConfig($config);

        $this->_caminhoViews     = $config["CAMINHO_VIEWS"];
        $this->_padraoAbertura   = $config["PADRAO_ABERTURA"];
        $this->_padraoFechamento = $config["PADRAO_FECHAMENTO"];
    }



    /*
    .########..##.....##.########..##.......####..######.
    .##.....##.##.....##.##.....##.##........##..##....##
    .##.....##.##.....##.##.....##.##........##..##......
    .########..##.....##.########..##........##..##......
    .##........##.....##.##.....##.##........##..##......
    .##........##.....##.##.....##.##........##..##....##
    .##.........#######..########..########.####..######.
    */




    /**
     * FACTORY METHOD.
     * Cria uma instância dessa classe
     * a partir de um array de config
     * @param array $config array de configuração
     * @return Renderizador instância dessa classe
     */
    public static function criarComConfiguracao(array $config): static
    {
        return new static($config);
    }

    /**
     * FACTORY METHOD.
     * Cria uma instância dessa classe
     * a partir de parâmetros predefinidos
     * @param array|string $caminhoDasViews caminho(s) das pastas das views para serem procuradas
     * @param string $padraoAbertura padrão de abertura para ser substituído nas views.
     * @param string $padraoFechamento padrão de fechamento para ser substituído nas views.
     */
    public static function criarComParametros(array|string $caminhoDasViews, string $padraoAbertura, string $padraoFechamento): static
    {

        if(is_string($caminhoDasViews))
        {
            $caminhoDasViews = [$caminhoDasViews];
        }

        $config = [
            "CAMINHO_VIEWS"     => $caminhoDasViews,
            "PADRAO_ABERTURA"   => $padraoAbertura,
            "PADRAO_FECHAMENTO" => $padraoFechamento
        ];

        return new static($config);
    }

    /**
     * Renderiza uma view de acordo com suas necessidades.
     * @param string $view nome da view para ser renderizada
     * @param array $params parametros para substituir.
     * @return string view renderizada.
     */
    public function renderizarView(string $view = 'index', array $params = []): string
    {
        $possiveisCaminhos = [];
        $sep = DIRECTORY_SEPARATOR;

        foreach ($this->_caminhoViews as $caminho)
        {
            $possiveisCaminhos[] = $caminho . "$sep$view.php";
            $possiveisCaminhos[] = $caminho . "$sep$view";
            $possiveisCaminhos[] = $caminho . "$view.php";
            $possiveisCaminhos[] = $caminho . "$view";
        }
        
        
        $content = null;
        foreach($possiveisCaminhos as $caminhoFinal)
        {
            if (is_readable($caminhoFinal))
            {
                $content = file_get_contents($caminhoFinal);
            }
        }

        $viewNaoExiste = $content === null;
        if ($viewNaoExiste)
        {
            throw new Exception("View não encontrada.");
        } 

        foreach($params as $key => $value)
        {
            $padrao = $this->_padraoAbertura . $key . $this->_padraoFechamento;
            
            $contentPossuiOPadrao = str_contains($content, $padrao);
            if ($contentPossuiOPadrao)
            {
                $content = str_replace($padrao, $value, $content);
            }
        }

        return $content;
    }




    /*
    .########..########..####.##.....##....###....########.########
    .##.....##.##.....##..##..##.....##...##.##......##....##......
    .##.....##.##.....##..##..##.....##..##...##.....##....##......
    .########..########...##..##.....##.##.....##....##....######..
    .##........##...##....##...##...##..#########....##....##......
    .##........##....##...##....##.##...##.....##....##....##......
    .##........##.....##.####....###....##.....##....##....########
    */




    /**
     * Verifica se o array de configurações
     * foi passado corretamente seguindo
     * os padrões dessa classe.
     * @param array $config configurações para serem checadas
     * @throws Exception padrão de configuração inválido
     * @return void
     */
    private function verificarConfig(array $config): void
    {
        $caminhoNaoEspecificado  = !isset($config["CAMINHO_VIEWS"]);        
        if($caminhoNaoEspecificado)
        {
            http_response_code(500);
            throw new Exception("O caminho da pasta das views não foi especificado.");
        }


        foreach($config["CAMINHO_VIEWS"] as $caminho)
        {
            $caminhoNaoExiste = !is_dir($caminho);      
            if($caminhoNaoExiste)
            {
                http_response_code(500);
                throw new Exception("O caminho da pasta das views não existe.");
            }

        }
        

        $padroesNaoEspecificados = !isset($config["PADRAO_ABERTURA"]) || !isset($config["PADRAO_FECHAMENTO"]);
        if($padroesNaoEspecificados)
        {
            http_response_code(500);
            throw new Exception("Os padrões de abertura e fechamento --para substituição na view-- não foram especificados.");
        }
    }


}