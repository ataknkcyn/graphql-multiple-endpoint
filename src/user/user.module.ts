import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: async () => {
        return {
          debug: true,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/user/user.graphql'),
          introspection: true,
          path: '/user',
        };
      },
    }),
  ],
  providers: [UserResolver],
})
export class UserModule {}
