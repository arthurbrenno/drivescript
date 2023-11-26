import { Controller, Post, Ctx } from '@bunjs/core';
import * as jwt from 'jsonwebtoken';
import pool from '../database';

@Controller('/api')
export class LoginController {
  @Post('/login')
  async login(@Ctx() ctx: Context) {
    const { user, password } = ctx.request.body;

    try {
      const [rows] = await pool.execute('SELECT * FROM usuarios WHERE username = ? AND password = ?', [user, password]);

      if (rows.length === 0) {
        ctx.status = 401;
        ctx.body = {
          status: 'Unauthorized',
          message: 'Credenciais inválidas.',
        };
        return;
      }

      const usuario = rows[0];
      const nivel_permissao = usuario.nivel_perm;
      const token = jwt.sign(
        { userid: usuario.id, nivel_permissao: nivel_permissao },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      ctx.body = { auth: true, token, usuario };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Internal Server Error',
        message: 'Ocorreu um erro em tempo de execução.',
      };
    }
  }
}
