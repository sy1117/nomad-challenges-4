import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver, EpisodeResolver } from './podcasts.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { podcastProviders, episodeProviders } from './podcasts.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...episodeProviders,
    ...podcastProviders,
    PodcastsService,
    PodcastsResolver,
    EpisodeResolver,
  ],
})
export class PodcastsModule {}
