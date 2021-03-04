import { Episode } from './episode.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Podcast {
  @PrimaryGeneratedColumn()
  @Field((_) => Number)
  @IsNumber()
  id: number;

  @Column()
  @Field((_) => String)
  @IsString()
  title: string;

  @Column()
  @Field((_) => String)
  @IsString()
  category: string;

  @Column()
  @Field((_) => Number)
  @IsNumber()
  rating: number;

  @Column()
  @Field((_) => [Episode])
  episodes: Episode[];
}
