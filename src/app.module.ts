import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
        path: '/post',
        playground: true,
        introspection: true,
      },
      gateway: {
        buildService: ({ name, url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'authorization',
                context.req?.headers?.authorization,
              );
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [{ name: 'post', url: 'http://localhost:3002/post' }],
        }),
      },
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        path: '/user',
        playground: true,
        introspection: true,
      },
      gateway: {
        buildService: ({ name, url }) => {
          return new RemoteGraphQLDataSource({
            url,
            //Auth
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'authorization',
                context.req?.headers?.authorization,
              );
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [{ name: 'user', url: 'http://localhost:3001/user' }],
        }),
      },
    }),
  ],
})
export class AppModule {}
