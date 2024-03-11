import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common'

import { AlbumsService } from 'src/albums/albums.service'
import { ArtistsService } from 'src/artists/artists.service'
import { InMemoryDb } from 'src/db/inMemoryDB'
import { TracksService } from 'src/tracks/tracks.service'

@Injectable()
export class FavoritesService {
  constructor(
    private db: InMemoryDb,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  findAll() {
    const { artists, albums, tracks } = this.db.favorites

    const artistsArray = artists.map((id) => this.artistService.findOne(id))
    const albumsArray = albums.map((id) => this.albumService.findOne(id))
    const tracksArray = tracks.map((id) => this.trackService.findOne(id))

    return {
      artists: artistsArray,
      albums: albumsArray,
      tracks: tracksArray,
    }
  }

  addTrackToFav(id: string) {
    const track = this.trackService.findOne(id)

    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    this.db.favorites.tracks.push(id)

    return { message: `Track ${id} successfully added to favorites` }
  }

  removeTrackFromFav(id: string, skipErrors = false) {
    const trackIndex = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    )

    if (trackIndex === -1 && !skipErrors) {
      throw new HttpException(
        `Track with id: ${id}, not found in favorites`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.db.favorites.tracks.splice(trackIndex, 1)
  }

  addAlbumToFav(id: string) {
    const album = this.albumService.findOne(id, true)

    if (!album) {
      throw new HttpException(
        `Album with id: ${id}, not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    this.db.favorites.albums.push(id)

    return { message: `Album ${id} successfully added to favorites` }
  }

  removeAlbumFromFav(id: string, skipErrors = false) {
    const albumIndex = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    )

    if (albumIndex === -1 && !skipErrors) {
      throw new HttpException(
        `Album with id: ${id}, not found in favorites`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.db.favorites.albums.splice(albumIndex, 1)
  }

  addArtistToFav(id: string) {
    const artist = this.artistService.findOne(id)

    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id}, not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    this.db.favorites.artists.push(id)

    return { message: `Artist ${id} successfully added to favorites` }
  }

  removeArtistFromFav(id: string, skipErrors = false) {
    const artistIndex = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    )

    if (artistIndex === -1 && !skipErrors) {
      throw new HttpException(
        `Artist with id: ${id}, not found in favorites`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.db.favorites.artists.splice(artistIndex, 1)
  }
}
