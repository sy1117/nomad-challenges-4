import { Connection } from 'typeorm';
import { Podcast } from './entities/podcast.entity';

export const podcastProviders = [
  {
    provide: 'PODCAST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Podcast),
    inject: ['DATABASE_CONNECTION'],
  },
];
