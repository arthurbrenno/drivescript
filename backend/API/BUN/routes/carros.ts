import { Controller, Post, Get, Put, Delete, Ctx, Param, Use } from '@bunjs/core';
import pool from '../database';
import { VerificaToken } from '../middlewares/auth';

@Controller('/api')
export class CarrosController {
  @Get('/:id?')
  @Use(VerificaToken)
  async get(@Ctx() ctx: Context, @Param('id') id: string) {
    if (!ctx.state.auth) {
      ctx.status = 401;
      ctx.body = {
        status: 'Unauthorized',
        message: 'Você não está autenticado.',
      };
      return;
    }

    let query = id ? 'SELECT * FROM carros WHERE id = ?' : 'SELECT * FROM CARROS';
    let queryParams = id ? [id] : [];

    try {
      const [rows] = await pool.query(query, queryParams);
      ctx.body = { carros: rows };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }

  @Post('/criar')
  @Use(VerificaToken)
  async criar(@Ctx() ctx: Context) {
    if (!ctx.state.auth) {
      ctx.status = 401;
      ctx.body = {
        status: 'Unauthorized',
        message: 'Você não está autenticado.',
      };
      return;
    }

    if (ctx.state.nivel_permissao !== 0) {
      ctx.status = 403;
      ctx.body = {
        status: 'Forbidden',
        message: 'Você não tem permissão para criar carros.',
      };
      return;
    }

    const requiredParams = [
      'marca',
      'modelo',
      'ano',
      'placa',
      'capacidade_de_passageiros',
    ];

    const missingParams = requiredParams.filter(
      (param) => !ctx.request.body.hasOwnProperty(param)
    );

    if (missingParams.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: 'Bad Request',
        message: `Missing required parameters: ${missingParams.join(', ')}`,
      };
      return;
    }

    const carro = {
      marca: ctx.request.body.marca,
      modelo: ctx.request.body.modelo,
      ano: ctx.request.body.ano,
      placa: ctx.request.body.placa,
      capacidade_de_passageiros: ctx.request.body.capacidade_de_passageiros,
    };

    const query =
      'INSERT INTO carros(marca, modelo, ano, placa, capacidade_passageiros) VALUES(?, ?, ?, ?, ?)';
    try {
      const [rows] = await pool.execute(query, [
        carro.marca,
        carro.modelo,
        carro.ano,
        carro.placa,
        carro.capacidade_de_passageiros,
      ]);

      const carroInserido = { ...carro, id: rows.insertId };
      ctx.body = { status: 'OK', data: carroInserido };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }

  @Put('/update/:id')
  @Use(VerificaToken)
  async update(@Ctx() ctx: Context, @Param('id') id: string) {
    if (!ctx.state.auth) {
      ctx.status = 401;
      ctx.body = {
        status: 'Unauthorized',
        message: 'Você não está autenticado.',
      };
      return;
    }

    if (ctx.state.nivel_permissao !== 0) {
      ctx.status = 403;
      ctx.body = {
        status: 'Forbidden',
        message: 'Você não tem permissão para atualizar carros.',
      };
      return;
    }

    if (!ctx.request.body || Object.keys(ctx.request.body).length === 0) {
      ctx.status = 400;
      ctx.body = {
        status: 'Bad Request',
        message: 'Nenhum campo fornecido para atualização.',
      };
      return;
    }

    const carro = {};

    for (const field in ctx.request.body) {
      if (ctx.request.body.hasOwnProperty(field)) {
        carro[field] = ctx.request.body[field];
      }
    }

    const query = 'UPDATE carros SET ? WHERE id = ?';
    try {
      const [rows] = await pool.execute(query, [carro, id]);

      if (rows.affectedRows === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum carro encontrado com o ID fornecido.',
        };
        return;
      }

      ctx.body = { status: 'OK', data: carro };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }
}

    @Delete('/delete/:id')
  @Use(VerificaToken)
  async delete(@Ctx() ctx: Context, @Param('id') id: string) {
    if (!ctx.state.auth) {
      ctx.status = 401;
      ctx.body = {
        status: 'Unauthorized',
        message: 'Você não está autenticado.',
      };
      return;
    }

    if (ctx.state.nivel_permissao !== 0) {
      ctx.status = 403;
      ctx.body = {
        status: 'Forbidden',
        message: 'Você não tem permissão para deletar carros.',
      };
      return;
    }

    if (!id) {
      ctx.status = 400;
      ctx.body = {
        status: 'Bad Request',
        message: 'Parâmetro ID faltando.',
      };
      return;
    }

    const query = 'DELETE FROM carros WHERE id = ?';
    try {
      const [rows] = await pool.query(query, [id]);

      if (rows.affectedRows === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum carro encontrado com o ID fornecido.',
        };
        return;
      }

      ctx.body = { status: 'OK', affectedRows: rows.affectedRows };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }
}