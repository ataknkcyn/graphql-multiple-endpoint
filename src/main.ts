import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { postBootstrap } from './post/maint';
import { userBootstrap } from './user/main';
async function bootstrap() {
  await userBootstrap();
  await postBootstrap();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
