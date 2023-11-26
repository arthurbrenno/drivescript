import { Controller, Post, Get, Ctx, Param, Use } from '@bunjs/core';
import * as moment from 'moment';
import pool from '../database';
import { VerificaToken } from '../middlewares/auth';

@Controller('/api')
export class AlunosController {
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
        message: 'Você não tem permissão para criar alunos.',
      };
      return;
    }

    const requiredFields = [
      'nome',
      'cpf',
      'data_nascimento',
      'endereco',
      'telefone',
    ];

    const missingFields = requiredFields.filter(
      (field) => !ctx.request.body.hasOwnProperty(field)
    );

    if (missingFields.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: 'Bad Request',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      };
      return;
    }

    const aluno = {
      nome: ctx.request.body.nome,
      cpf: ctx.request.body.cpf,
      data_nascimento: moment(ctx.request.body.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      endereco: ctx.request.body.endereco,
      telefone: ctx.request.body.telefone,
    };

    const query =
      'INSERT INTO alunos(nome, cpf, data_nascimento, endereco, telefone) VALUES(?, ?, ?, ?, ?)';
    try {
      const [rows] = await pool.execute(query, [
        aluno.nome,
        aluno.cpf,
        aluno.data_nascimento,
        aluno.endereco,
        aluno.telefone,
      ]);

      const alunoInserido = { ...aluno, id: rows.insertId };

      ctx.body = { status: 'OK', data: alunoInserido };
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }

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

    if (ctx.state.nivel_permissao !== 0) {
      ctx.status = 403;
      ctx.body = {
        status: 'Forbidden',
        message: 'Você não tem permissão para listar alunos.',
      };
      return;
    }

    let query = id ? 'SELECT * FROM alunos WHERE id = ?' : 'SELECT * FROM ALUNOS';
    let queryParams = id ? [id] : [];

    try {
      const [rows] = await pool.query(query, queryParams);

      if (id && rows.length === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum aluno encontrado com o ID fornecido.',
        };
      } else {
        const response = { alunos: rows };
        ctx.body = response;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }
}

import { Controller, Post, Get, Put, Delete, Ctx, Param, Use } from '@bunjs/core';
import * as moment from 'moment';
import pool from '../database';
import { VerificaToken } from '../middlewares/auth';

@Controller('/api')
export class AlunosController {
  // ...seus outros métodos aqui...

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
        message: 'Você não tem permissão para alterar alunos.',
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

    const aluno = {};

    for (const field in ctx.request.body) {
      if (ctx.request.body.hasOwnProperty(field)) {
        aluno[field] =
          field === 'data_nascimento'
            ? moment(ctx.request.body[field], 'DD/MM/YYYY').format('YYYY-MM-DD')
            : ctx.request.body[field];
      }
    }

    const query = 'UPDATE alunos SET ? WHERE id = ?';
    try {
      const [rows] = await pool.execute(query, [aluno, id]);

      if (rows.affectedRows === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum aluno encontrado com o ID fornecido.',
        };
        return;
      }

      ctx.body = { status: 'OK', data: aluno };
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
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
        message: 'Você não tem permissão para deletar alunos.',
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

    const query = 'DELETE FROM alunos WHERE id = ?';
    try {
      const [rows] = await pool.query(query, [id]);

      if (rows && rows.affectedRows === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum aluno com o ID mencionado.',
        };
        return;
      }

      ctx.body = { status: 'OK' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }
}
