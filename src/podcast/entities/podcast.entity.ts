import 'reflect-metadata';
import { Episode } from './episode.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@InputType('PodcastInputType', { isAbstract: true })
@ObjectType({ isAbstract: true })
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

  @OneToMany((type) => Episode, (episode: Episode) => episode.podcast)
  @Field((_) => [Episode], { nullable: true })
  episodes: Episode[];
}
