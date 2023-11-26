import { Bun, Application } from '@bunjs/core';
import { Logger } from '@bunjs/logger';
import { Router } from '@bunjs/router';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new Application();
app.addModule(Logger);
app.addModule(Router);

const bun = new Bun(app);
bun.listen(process.env.PORT, () => {
  console.log(`[online] Servidor Backend na porta ${process.env.PORT}`);
});
