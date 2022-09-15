import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @Query(() => String)
  async user() {
    return 'user';
  }
}
