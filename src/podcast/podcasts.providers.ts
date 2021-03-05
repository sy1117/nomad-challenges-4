import { Connection } from 'typeorm';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';

export const podcastProviders = [
  {
    provide: 'PODCAST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Podcast),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const episodeProviders = [
  {
    provide: 'EPISODE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Episode),
    inject: ['DATABASE_CONNECTION'],
  },
];
