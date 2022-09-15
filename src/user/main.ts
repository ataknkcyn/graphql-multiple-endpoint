import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

export async function userBootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(3001);
}
