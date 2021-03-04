import { Injectable, Inject } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastOutput,
  PodcastSearchInput,
  EpisodesOutput,
  EpisodesSearchInput,
} from './dtos/podcast.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PodcastsService {
  constructor(
    @Inject('PODCAST_REPOSITORY')
    private podcastRepository: Repository<Podcast>,
  ) {}

  async getAllPodcasts(): Promise<Podcast[]> {
    return await this.podcastRepository.find();
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastDto): Promise<CoreOutput> {
    const newPodcast = new Podcast();
    newPodcast.title = title;
    newPodcast.category = category;
    newPodcast.rating = 0;
    newPodcast.episodes = [];
    await this.podcastRepository.save(newPodcast);
    return { ok: true, error: null };
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    const podcast = await this.podcastRepository.findOne({ id });
    if (!podcast) {
      return {
        ok: false,
        error: `${id} id podcast doesn't exist!`,
      };
    }
    return {
      ok: true,
      podcast,
    };
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    try {
      const deletedPodcast = await this.podcastRepository.delete({ id });
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async updatePodcast({ id, ...rest }: UpdatePodcastDto): Promise<CoreOutput> {
    const { ok, podcast, error } = await this.getPodcast(id);
    if (!ok) {
      return { ok, error };
    } else {
      const updatePodcast = { ...podcast, ...rest };
      await this.podcastRepository.save(updatePodcast);
      return { ok };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    const { ok, podcast, error } = await this.getPodcast(podcastId);
    if (!ok) {
      return { ok, error };
    }
    return { ok: true, episodes: podcast.episodes };
  }

  async createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): Promise<CoreOutput> {
    const { ok, podcast, error } = await this.getPodcast(podcastId);
    if (!ok) {
      return { ok, error };
    }
    const newEpisode: Episode = {
      id: podcast.episodes.length + 1,
      title,
      category,
    };
    await this.updatePodcast({
      id: podcastId,
      episodes: [...podcast.episodes, newEpisode],
    });

    return { ok: true };
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<CoreOutput> {
    const { podcast, error, ok } = await this.getPodcast(podcastId);
    if (!ok) {
      return { ok, error };
    }
    this.updatePodcast({
      id: podcastId,
      episodes: podcast.episodes.filter((episode) => episode.id !== episodeId),
    });

    return { ok: true };
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...rest
  }: UpdateEpisodeDto): Promise<CoreOutput> {
    const { podcast, error, ok } = await this.getPodcast(podcastId);
    if (!ok) {
      return { ok, error };
    }
    const episodeIdx = podcast.episodes.findIndex(({ id }) => id === episodeId);
    const newEpisode = { ...podcast.episodes[episodeIdx], ...rest };
    await this.deleteEpisode({ podcastId, episodeId });
    const { podcast: changedPodcast } = await this.getPodcast(podcastId);
    await this.updatePodcast({
      id: podcastId,
      episodes: [...changedPodcast.episodes, newEpisode],
    });
    return { ok: true };
  }
}
