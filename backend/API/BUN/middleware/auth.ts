import { Middleware, Context } from '@bunjs/core';
import * as jwt from 'jsonwebtoken';

@Middleware()
export class VerificaToken {
  async use(ctx: Context, next: Function) {
    const token = ctx.get('x-access-token');

    if (!token) {
      ctx.status = 403;
      ctx.body = {
        status: 'Forbidden',
        message: 'Token não fornecido.',
      };
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      ctx.state.userid = decoded.userid;
      ctx.state.nivel_permissao = decoded.nivel_permissao;
      ctx.state.auth = true;
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        status: 'Unauthorized',
        message: 'Token inválido.',
      };
      return;
    }

    await next();
  }
}
