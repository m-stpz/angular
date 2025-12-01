import { Injectable } from '@nestjs/common';

type Episode = {
  id: string;
  name: string;
};

type CreateEpisodeDTO = {
  name: Episode['name'];
};

@Injectable()
export class EpisodesService {
  // for now, only an array
  private episodes: Episode[] = [];

  //   we should be able to create and grab the created episodes
  findAll(sort: 'asc' | 'desc') {
    if (sort === 'asc') {
      return [...this.episodes].sort((a, b) => a.name.localeCompare(b.name));
    }

    return [...this.episodes].sort((a, b) => b.name.localeCompare(a.name));
  }

  findOne(id: string) {
    return this.episodes.find((ep) => ep.id === id);
  }

  create(body: CreateEpisodeDTO) {
    const episode = { id: Date.now().toString(), ...body };
    this.episodes.push(episode);
    return episode;
  }
}
