import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Episode {
  @Column()
  @Field((_) => Number)
  id: number;

  @Column()
  @Field((_) => String)
  title: string;

  @Column()
  @Field((_) => String)
  category: string;
}
