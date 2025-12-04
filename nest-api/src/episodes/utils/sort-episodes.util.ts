import { Episode } from '../types/episode.type';
import { Sort } from '../types/sort.type';

export function sortEpisodes(sort: Sort, episodes: Episode[]): Episode[] {
  return [...episodes].sort((a, b) => {
    return sort === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
}
