import { Injectable } from '@nestjs/common'

import { Album } from 'src/albums/entities/album.entity'
import { Artist } from 'src/artists/entities/artist.entity'
import { Favorites } from 'src/favorites/entities/favorite.entity'
import { Track } from 'src/tracks/entities/track.entity'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class InMemoryDb {
  users: User[] = []
  artists: Artist[] = []
  tracks: Track[] = []
  albums: Album[] = []
  favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  }
}
