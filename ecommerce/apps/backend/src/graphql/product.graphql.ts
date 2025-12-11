import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  image!: string;

  @Field()
  stripePriceId!: string;

  @Field()
  isFeatured!: boolean;

  @Field()
  createdAt!: number;

  @Field()
  updatedAt!: number;
}
