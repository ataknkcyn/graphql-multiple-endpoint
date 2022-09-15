import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: async () => {
        return {
          debug: true,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/post/post.graphql'),
          introspection: true,
          path: '/post',
        };
      },
    }),
  ],
  providers: [PostResolver],
})
export class PostModule {}
