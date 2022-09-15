import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@Resolver('Post')
export class PostResolver {
  @Query(() => String)
  async post() {
    return 'post';
  }
}
