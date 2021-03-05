import 'reflect-metadata';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Podcast } from './podcast.entity';
@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity('episode')
export class Episode {
  @PrimaryGeneratedColumn()
  @Field((_) => Number)
  id: number;

  @Column()
  @Field((_) => String)
  title: string;

  @Column()
  @Field((_) => String)
  category: string;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes)
  @Field((_) => Podcast, { nullable: true })
  podcast: Podcast;
}
