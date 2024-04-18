import {Cast} from '../../core/entities/cast.entity';
import {MovieDBCast} from '../interfaces/movie-db.responses';

export class CastMapper {
  static fromMovieDBCastToEntity(cast: MovieDBCast): Cast {
    return {
      id: cast.id,
      name: cast.name,
      character: cast.character || '',
      avatar: cast.profile_path
        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
        : 'https://dummyimage.com/500x500/ffffff/000000r.png&text=No+Avatar',
    };
  }
}
