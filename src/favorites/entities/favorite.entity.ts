import { Album } from 'src/albums/entities/album.entity'
import { Artist } from 'src/artists/entities/artist.entity'
import { Track } from 'src/tracks/entities/track.entity'

export interface Favorites {
  artists: string[]
  albums: string[]
  tracks: string[]
}

export interface FavoritesResponse {
  artists: Artist[]
  albums: Album[]
  tracks: Track[]
}
