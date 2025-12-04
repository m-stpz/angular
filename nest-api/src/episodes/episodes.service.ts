import { Injectable } from '@nestjs/common';
import { Episode } from './types/episode.type';
import { CreateEpisodeDTO } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Sort } from './types/sort.type';
import { sortEpisodes } from './utils/sort-episodes.util';

@Injectable()
export class EpisodesService {
  // for now, only an array
  private episodes: Episode[] = [];
  counter = 1;

  //   we should be able to create and grab the created episodes
  findAll(sort: Sort) {
    return sortEpisodes(sort, this.episodes);
  }

  findOne(id: Episode['id']) {
    return this.episodes.find((ep) => ep.id === Number(id));
  }

  create(dto: CreateEpisodeDTO) {
    const episode = { id: this.counter, ...dto };
    this.episodes.push(episode);
    this.counter++;
    return episode;
  }

  update(id: Episode['id'], dto: UpdateEpisodeDto) {
    const episode = this.episodes.find((episode) => episode.id === id);

    if (!episode) {
      return null;
    }

    Object.assign(episode, dto);
    return episode;
  }

  delete(id: Episode['id']) {
    this.episodes = this.episodes.filter((episode) => episode.id !== id);
    return true;
  }
}
