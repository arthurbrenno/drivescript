import { Controller, Post, Get, Put, Ctx, Param, Use } from '@bunjs/core';
import * as moment from 'moment';
import pool from '../database';
import { VerificaToken } from '../middlewares/auth';

@Controller('/api')
export class AgendamentosController {
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

    const requiredFields = ['aluno_id', 'carro_id', 'data_aula', 'horario_aula'];

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

    const agendamento = {
      aluno_id: ctx.request.body.aluno_id,
      carro_id: ctx.request.body.carro_id,
      data_aula: moment(ctx.request.body.data_aula).format('YYYY-MM-DD'),
      horario_aula: ctx.request.body.horario_aula,
    };

    const query =
      'INSERT INTO agendamentos(aluno_id, carro_id, data_aula, horario_aula) VALUES(?, ?, ?, ?)';
    try {
      const [rows] = await pool.execute(query, [
        agendamento.aluno_id,
        agendamento.carro_id,
        agendamento.data_aula,
        agendamento.horario_aula,
      ]);

      const agendamentoInserido = { ...agendamento, id: rows.insertId };
      ctx.body = { status: 'OK', data: agendamentoInserido };
    } catch (error) {
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

    let query = id
      ? 'SELECT * FROM agendamentos WHERE id = ?'
      : 'SELECT * FROM agendamentos';
    let queryParams = id ? [id] : [];

    try {
      const [rows] = await pool.query(query, queryParams);
      ctx.body = { agendamentos: rows };
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

    if (!ctx.request.body || Object.keys(ctx.request.body).length === 0) {
      ctx.status = 400;
      ctx.body = {
        status: 'Bad Request',
        message: 'Nenhum campo fornecido para atualização.',
      };
      return;
    }

    const agendamento = {};

    for (const field in ctx.request.body) {
      if (ctx.request.body.hasOwnProperty(field)) {
        agendamento[field] =
          field === 'data_aula'
            ? moment(ctx.request.body[field]).format('YYYY-MM-DD')
            : ctx.request.body[field];
      }
    }

    const query = 'UPDATE agendamentos SET ? WHERE id = ?';
    try {
      const [rows] = await pool.execute(query, [agendamento, id]);

      if (rows.affectedRows === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum agendamento encontrado com o ID fornecido.',
        };
        return;
      }

      ctx.body = { status: 'OK', data: agendamento };
    } catch (error) {
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

    if (!id) {
      ctx.status = 400;
      ctx.body = {
        status: 'Bad Request',
        message: 'Parâmetro ID faltando.',
      };
      return;
    }

    const query = 'DELETE FROM agendamentos WHERE id = ?';
    try {
      const [rows] = await pool.query(query, [id]);

      if (rows && rows.affectedRows === 0) {
        ctx.status = 404;
        ctx.body = {
          status: 'Not Found',
          message: 'Nenhum agendamento com o ID mencionado.',
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
