import { Injectable } from '@nestjs/common';
import { Episode } from './types/episode.type';
import { CreateEpisodeDTO } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  // for now, only an array
  private episodes: Episode[] = [];
  counter = 1;

  //   we should be able to create and grab the created episodes
  findAll(sort: 'asc' | 'desc') {
    if (sort === 'asc') {
      return [...this.episodes].sort((a, b) => a.name.localeCompare(b.name));
    }

    return [...this.episodes].sort((a, b) => b.name.localeCompare(a.name));
  }

  findOne(id: Episode['id']) {
    return this.episodes.find((ep) => ep.id === id);
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
