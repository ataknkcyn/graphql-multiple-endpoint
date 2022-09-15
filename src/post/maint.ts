import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';

export async function postBootstrap() {
  const app = await NestFactory.create(PostModule);
  await app.listen(3002);
}
